import type { Product } from '@/types/product';

interface Props {
  product: Product;
  onClick: () => void;
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Fungisit': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-l-purple-500' },
  'Herbisit': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-l-emerald-500' },
  'İnsektisit': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-l-red-500' },
  'Tohum İlacı': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-l-amber-500' },
  'Biyostimulant': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-l-sky-500' },
  'Biyoinsektisit': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-l-teal-500' },
};

export function ProductCard({ product, onClick }: Props) {
  const cat = categoryColors[product.category] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-l-gray-500' };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white rounded-2xl border border-gray-100 border-l-4 ${cat.border} p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98]`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-syngenta-navy leading-tight">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
            {product.activeIngredient}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${cat.bg} ${cat.text}`}>
            {product.category}
          </span>
          <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Crops */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {product.crops.slice(0, 5).map((crop) => (
          <span
            key={crop}
            className="text-[10px] bg-gray-50 text-gray-600 px-2 py-1 rounded-lg font-medium"
          >
            {crop}
          </span>
        ))}
        {product.crops.length > 5 && (
          <span className="text-[10px] text-cropwise-green font-semibold px-2 py-1">
            +{product.crops.length - 5}
          </span>
        )}
      </div>

      {/* Quick info */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
        <span className="text-[10px] text-gray-400">
          📏 {product.dose}
        </span>
        <span className="text-[10px] text-gray-400">
          ⏱ PHI: {product.phi}
        </span>
      </div>
    </button>
  );
}
