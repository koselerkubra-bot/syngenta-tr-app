import { useState, useMemo, useEffect } from 'react';
import productsData from '@/data/products.json';
import type { Product, ProductCategory, CropType } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetail } from '@/components/ProductDetail';
import { FilterBar } from '@/components/FilterBar';
import { SearchBar } from '@/components/SearchBar';
import { Header } from '@/components/Header';

const products = productsData as Product[];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Tümü'>('Tümü');
  const [selectedCrop, setSelectedCrop] = useState<CropType | 'Tümü'>('Tümü');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const allCategories: ProductCategory[] = [...new Set(products.map((p) => p.category))];
  const allCrops: CropType[] = [...new Set(products.flatMap((p) => p.crops))].sort();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.activeIngredient.toLowerCase().includes(search.toLowerCase()) ||
        p.targets.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory = selectedCategory === 'Tümü' || p.category === selectedCategory;
      const matchesCrop = selectedCrop === 'Tümü' || p.crops.includes(selectedCrop);

      return matchesSearch && matchesCategory && matchesCrop;
    });
  }, [search, selectedCategory, selectedCrop]);

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-syngenta-navy flex flex-col items-center justify-center z-[9999]">
        <div className="animate-pulse">
          <div className="w-20 h-20 rounded-full bg-cropwise-green/15 flex items-center justify-center mb-6">
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-cropwise-green" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white">Syngenta</h1>
        <p className="text-sm text-cropwise-green/80 font-medium mt-1">Türkiye</p>
        <p className="text-[10px] text-white/30 mt-6">Bitki Koruma Ürünleri</p>
      </div>
    );
  }

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Header />

      <main className="max-w-lg mx-auto px-4">
        {/* Search */}
        <SearchBar value={search} onChange={setSearch} />

        {/* Filters */}
        <FilterBar
          categories={allCategories}
          crops={allCrops}
          selectedCategory={selectedCategory}
          selectedCrop={selectedCrop}
          onCategoryChange={setSelectedCategory}
          onCropChange={setSelectedCrop}
        />

        {/* Results count */}
        <div className="flex items-center justify-between mt-5 mb-3 px-1">
          <p className="text-xs text-gray-500">
            <span className="font-bold text-syngenta-navy text-sm">{filtered.length}</span> ürün
          </p>
          {(selectedCategory !== 'Tümü' || selectedCrop !== 'Tümü' || search) && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('Tümü');
                setSelectedCrop('Tümü');
              }}
              className="text-xs text-syngenta-orange font-semibold active:opacity-70"
            >
              ✕ Temizle
            </button>
          )}
        </div>

        {/* Product List */}
        <div className="space-y-3">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
              <span className="text-2xl">🔍</span>
            </div>
            <p className="text-sm text-gray-500 mt-4 font-medium">
              Aramanıza uygun ürün bulunamadı.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('Tümü');
                setSelectedCrop('Tümü');
              }}
              className="mt-3 text-sm text-cropwise-green font-semibold active:opacity-70"
            >
              Tüm ürünleri göster
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8 py-4 border-t border-gray-100">
        <p className="text-center text-[10px] text-gray-400">
          © 2026 Syngenta Tarım San. ve Tic. A.Ş. · Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
}
