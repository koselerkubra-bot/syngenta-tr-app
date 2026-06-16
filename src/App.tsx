import { useState, useMemo } from 'react';
import productsData from '@/data/products.json';
import type { Product, ProductCategory, CropType } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetail } from '@/components/ProductDetail';
import { FilterBar } from '@/components/FilterBar';
import { SearchBar } from '@/components/SearchBar';
import { Header } from '@/components/Header';

const products = productsData as Product[];

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Tümü'>('Tümü');
  const [selectedCrop, setSelectedCrop] = useState<CropType | 'Tümü'>('Tümü');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
