/**
 * Syngenta Türkiye Ürün Scraper
 * 
 * syngenta.com.tr/products/search/crop-protection sayfalarını crawl eder
 * ve ürün bilgilerini JSON formatında kaydeder.
 * 
 * Kullanım: node scripts/scraper.mjs
 * 
 * GitHub Actions ile günde 1 kez çalışır.
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, '../src/data/products.json');

const BASE_URL = 'https://www.syngenta.com.tr';
const PRODUCT_LIST_URL = `${BASE_URL}/products/search/crop-protection`;
const MAX_PAGES = 12; // syngenta.com.tr has ~12 pages of products
const DELAY_MS = 2000; // Polite crawling: 2 second delay between requests

/**
 * Fetch a page with retry logic
 */
async function fetchPage(url, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'SyngentaTR-App/1.0 (Product Catalog Sync)',
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'tr-TR,tr;q=0.9',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      console.warn(`  Attempt ${attempt + 1} failed for ${url}: ${error.message}`);
      if (attempt < retries - 1) {
        await sleep(DELAY_MS * 2);
      }
    }
  }
  return null;
}

/**
 * Parse product links from list page HTML
 */
function parseProductLinks(html) {
  const links = [];
  // Match product detail page links
  const regex = /href="(\/product\/crop-protection\/[^"]+)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    // Avoid duplicates
    if (!links.includes(href)) {
      links.push(href);
    }
  }
  return links;
}

/**
 * Parse product detail from individual product page HTML
 */
function parseProductDetail(html, url) {
  const product = {
    id: '',
    name: '',
    category: '',
    activeIngredient: '',
    formulation: '',
    crops: [],
    targets: [],
    dose: '',
    phi: '',
    description: '',
    features: [],
    sourceUrl: url,
    lastUpdated: new Date().toISOString(),
  };

  // Extract product name from <h1> or title
  const nameMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
  if (nameMatch) {
    product.name = cleanText(nameMatch[1]);
  }

  // Extract category from breadcrumb or category label
  const catPatterns = [
    /FUNGİSİT/i,
    /HERBİSİT/i,
    /İNSEKTİSİT/i,
    /AKARİSİT/i,
    /TOHUM İLACI/i,
    /BİYOSTİMULANT/i,
    /BİYOİNSEKTİSİT/i,
  ];

  const catNames = ['Fungisit', 'Herbisit', 'İnsektisit', 'İnsektisit', 'Tohum İlacı', 'Biyostimulant', 'Biyoinsektisit'];

  for (let i = 0; i < catPatterns.length; i++) {
    if (catPatterns[i].test(html)) {
      product.category = catNames[i];
      break;
    }
  }

  // Extract active ingredient - look for patterns like "125 g/L Azoxystrobin"
  const aiMatch = html.match(/(\d+[\s.,]*\d*\s*(?:g\/[Ll]|g\/kg|%|g)\s+[A-Za-z][A-Za-z\s\-+()]*)/g);
  if (aiMatch && aiMatch.length > 0) {
    product.activeIngredient = aiMatch.slice(0, 3).map(s => cleanText(s)).join(' + ');
  }

  // Extract formulation
  const formMatch = html.match(/(SC|EC|WG|WP|SL|CS|SE|FS|ES|ZC|OD|EW)\s*\([^)]+\)/i);
  if (formMatch) {
    product.formulation = cleanText(formMatch[0]);
  }

  // Generate ID from name
  product.id = 'p-' + product.name.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 30);

  // Extract description from meta or first paragraph
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (descMatch) {
    product.description = cleanText(descMatch[1]);
  }

  return product;
}

/**
 * Clean HTML text
 */
function cleanText(text) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Sleep helper
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Load existing products for comparison
 */
function loadExistingProducts() {
  if (existsSync(OUTPUT_PATH)) {
    try {
      const data = readFileSync(OUTPUT_PATH, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Main scraper function
 */
async function scrape() {
  console.log('🌱 Syngenta TR Product Scraper');
  console.log('================================');
  console.log(`Target: ${PRODUCT_LIST_URL}`);
  console.log(`Time: ${new Date().toISOString()}\n`);

  // Step 1: Collect all product links from paginated list
  const allLinks = [];

  for (let page = 0; page < MAX_PAGES; page++) {
    const url = page === 0 ? PRODUCT_LIST_URL : `${PRODUCT_LIST_URL}?page=${page}`;
    console.log(`📄 Fetching page ${page + 1}/${MAX_PAGES}: ${url}`);

    const html = await fetchPage(url);
    if (!html) {
      console.log(`  ⚠️ Failed to fetch page ${page + 1}, stopping pagination.`);
      break;
    }

    const links = parseProductLinks(html);
    if (links.length === 0) {
      console.log(`  ℹ️ No more products found, stopping.`);
      break;
    }

    console.log(`  ✓ Found ${links.length} product links`);
    allLinks.push(...links);

    await sleep(DELAY_MS);
  }

  // Deduplicate
  const uniqueLinks = [...new Set(allLinks)];
  console.log(`\n📦 Total unique product links: ${uniqueLinks.length}\n`);

  // Step 2: Fetch each product detail page
  const products = [];

  for (let i = 0; i < uniqueLinks.length; i++) {
    const productUrl = `${BASE_URL}${uniqueLinks[i]}`;
    console.log(`  [${i + 1}/${uniqueLinks.length}] ${uniqueLinks[i]}`);

    const html = await fetchPage(productUrl);
    if (html) {
      const product = parseProductDetail(html, productUrl);
      if (product.name) {
        products.push(product);
        console.log(`    ✓ ${product.name} (${product.category || 'unknown'})`);
      } else {
        console.log(`    ⚠️ Could not parse product name`);
      }
    }

    await sleep(DELAY_MS);
  }

  // Step 3: Compare with existing data
  const existing = loadExistingProducts();
  const existingNames = new Set(existing.map(p => p.name));
  const newProducts = products.filter(p => !existingNames.has(p.name));

  console.log(`\n================================`);
  console.log(`📊 Results:`);
  console.log(`  Total scraped: ${products.length}`);
  console.log(`  Previously known: ${existing.length}`);
  console.log(`  New products: ${newProducts.length}`);

  // Step 4: Merge and save
  // Keep manually enriched data (crops, targets, features) from existing
  const merged = mergeProducts(existing, products);

  writeFileSync(OUTPUT_PATH, JSON.stringify(merged, null, 2), 'utf-8');
  console.log(`\n✅ Saved ${merged.length} products to ${OUTPUT_PATH}`);

  // Return summary for GitHub Actions
  return {
    total: merged.length,
    new: newProducts.length,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Merge scraped products with existing (preserving manual enrichments)
 */
function mergeProducts(existing, scraped) {
  const existingMap = new Map(existing.map(p => [p.name, p]));

  for (const product of scraped) {
    const existing = existingMap.get(product.name);
    if (existing) {
      // Update scraped fields but keep manually enriched fields
      existingMap.set(product.name, {
        ...existing,
        // Update these from scraper
        sourceUrl: product.sourceUrl,
        lastUpdated: product.lastUpdated,
        // Only update if scraper found better data
        ...(product.activeIngredient && { activeIngredient: product.activeIngredient }),
        ...(product.formulation && { formulation: product.formulation }),
        ...(product.category && { category: product.category }),
        ...(product.description && existing.description === '' && { description: product.description }),
      });
    } else {
      // New product
      existingMap.set(product.name, product);
    }
  }

  return Array.from(existingMap.values());
}

// Run
scrape()
  .then((result) => {
    console.log(`\n🎉 Done! Summary: ${JSON.stringify(result)}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(`\n❌ Scraper failed: ${error.message}`);
    process.exit(1);
  });
