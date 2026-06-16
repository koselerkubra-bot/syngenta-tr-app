import type { ProductCategory, CropType } from '@/types/product';

interface Props {
  categories: ProductCategory[];
  crops: CropType[];
  selectedCategory: ProductCategory | 'Tümü';
  selectedCrop: CropType | 'Tümü';
  onCategoryChange: (cat: ProductCategory | 'Tümü') => void;
  onCropChange: (crop: CropType | 'Tümü') => void;
}

const categoryIcons: Record<string, string> = {
  'Tümü': '📋',
  'Fungisit': '🍄',
  'Herbisit': '🌿',
  'İnsektisit': '🐛',
  'Tohum İlacı': '🌱',
  'Biyostimulant': '💧',
  'Biyoinsektisit': '🦠',
};

export function FilterBar({
  categories,
  crops,
  selectedCategory,
  selectedCrop,
  onCategoryChange,
  onCropChange,
}: Props) {
  return (
    <div className="mt-5 space-y-4">
      {/* Category Pills */}
      <div>
        <p className="text-[11px] text-gray-500 font-semibold uppercase mb-2 tracking-wider px-1">
          Kategori
        </p>
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            gap: '8px',
            marginLeft: '-16px',
            marginRight: '-16px',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: '8px',
          }}
        >
          {['Tümü' as const, ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              style={{ flexShrink: 0 }}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-syngenta-navy text-white shadow-lg shadow-syngenta-navy/20'
                  : 'bg-gray-100 text-gray-600 active:bg-gray-200'
              }`}
            >
              <span>{categoryIcons[cat] || '📦'}</span>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Crop Selector */}
      <div>
        <p className="text-[11px] text-gray-500 font-semibold uppercase mb-2 tracking-wider px-1">
          Bitki
        </p>
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            gap: '8px',
            marginLeft: '-16px',
            marginRight: '-16px',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: '8px',
          }}
        >
          {['Tümü' as const, ...crops].map((crop) => (
            <button
              key={crop}
              onClick={() => onCropChange(crop)}
              style={{ flexShrink: 0 }}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCrop === crop
                  ? 'bg-cropwise-green text-syngenta-navy shadow-lg shadow-cropwise-green/20 font-semibold'
                  : 'bg-gray-100 text-gray-600 active:bg-gray-200'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
