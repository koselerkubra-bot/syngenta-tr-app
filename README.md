# Syngenta Türkiye - Bitki Koruma Ürünleri Mobil Uygulaması

Syngenta Türkiye'nin bitki koruma ürünlerini kolayca incelemenizi sağlayan mobil uygulama.

## Özellikler

- 🔍 Ürün adı, etken madde veya zararlı ile arama
- 🏷️ Kategori filtresi (Fungisit, Herbisit, İnsektisit, Tohum İlacı, Biyostimulant)
- 🌾 Bitki bazında filtreleme (18+ bitki)
- 📋 Detaylı etiket bilgileri (etken madde, formülasyon, doz, PHI)
- 🔄 Otomatik güncelleme (syngenta.com.tr'den günlük veri çekme)
- 📱 Android & iOS native uygulama (Capacitor)

## Teknoloji

- **Frontend:** React 18 + TypeScript + Tailwind CSS + Vite
- **Mobil:** Capacitor (Android + iOS)
- **Backend:** Supabase (PostgreSQL + REST API)
- **Scraper:** Node.js + GitHub Actions (günlük otomatik crawl)
- **Hosting:** Vercel (web) + Google Play / App Store (mobil)

## Geliştirme

```bash
npm install
npm run dev
```

## Scraper

```bash
node scripts/scraper.mjs
```

Scraper, GitHub Actions ile her gün 06:00 UTC'de otomatik çalışır ve syngenta.com.tr'deki güncellemeleri çeker.

## Lisans

Private - Syngenta internal use only.
