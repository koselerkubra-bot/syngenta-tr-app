import type { Product } from '@/types/product';

interface Props {
  product: Product;
  onBack: () => void;
}

const categoryColors: Record<string, string> = {
  'Fungisit': 'bg-purple-500',
  'Herbisit': 'bg-emerald-500',
  'İnsektisit': 'bg-red-500',
  'Tohum İlacı': 'bg-amber-500',
  'Biyostimulant': 'bg-sky-500',
  'Biyoinsektisit': 'bg-teal-500',
};

export function ProductDetail({ product, onBack }: Props) {
  const catColor = categoryColors[product.category] || 'bg-gray-500';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-syngenta-navy sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white active:bg-white/20 transition-colors"
            aria-label="Geri dön"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-white truncate">
              {product.name}
            </h1>
            <p className="text-[10px] text-cropwise-green/80 font-medium">{product.category}</p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {/* Hero Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className={`h-1.5 ${catColor}`} />
          <div className="p-5">
            <h2 className="text-xl font-bold text-syngenta-navy">
              {product.name}
            </h2>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Etiket Bilgileri */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-syngenta-navy mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-syngenta-navy/5 flex items-center justify-center text-xs">🏷️</span>
            Etiket Bilgileri
          </h3>

          <div className="space-y-0">
            <InfoRow label="Etken Madde" value={product.activeIngredient} />
            <InfoRow label="Formülasyon" value={product.formulation} />
            <InfoRow label="Uygulama Dozu" value={product.dose} highlight />
            <InfoRow label="Son İlaçlama – Hasat (PHI)" value={product.phi} />
          </div>
        </div>

        {/* Ruhsatlı Bitkiler */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-syngenta-navy mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-cropwise-green/10 flex items-center justify-center text-xs">🌾</span>
            Ruhsatlı Bitkiler
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.crops.map((crop) => (
              <span
                key={crop}
                className="text-xs bg-cropwise-green/10 text-syngenta-green-dark px-3 py-2 rounded-xl font-medium"
              >
                {crop}
              </span>
            ))}
          </div>
        </div>

        {/* Hedef Zararlılar */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-syngenta-navy mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center text-xs">🎯</span>
            Hedef Zararlı / Hastalıklar
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.targets.map((target) => (
              <span
                key={target}
                className="text-xs bg-red-50 text-red-700 px-3 py-2 rounded-xl font-medium"
              >
                {target}
              </span>
            ))}
          </div>
        </div>

        {/* Özellikler */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-syngenta-navy mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-syngenta-orange/10 flex items-center justify-center text-xs">✨</span>
            Öne Çıkan Özellikler
          </h3>
          <ul className="space-y-3">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-cropwise-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-cropwise-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-[11px] text-amber-800 leading-relaxed">
            ⚠️ Bu bilgiler genel bilgilendirme amaçlıdır. Uygulama öncesi mutlaka ürün etiketini okuyunuz.
            Güncel ruhsat bilgileri için T.C. Tarım ve Orman Bakanlığı BKÜ veri tabanını kontrol ediniz.
          </p>
        </div>
      </main>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-start justify-between gap-3 py-3 border-b border-gray-50 last:border-0 ${highlight ? 'bg-cropwise-green/5 -mx-2 px-2 rounded-lg' : ''}`}>
      <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
      <span className={`text-xs text-right font-medium ${highlight ? 'text-syngenta-navy' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}
