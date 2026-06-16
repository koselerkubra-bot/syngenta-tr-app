export function Header() {
  return (
    <header className="bg-syngenta-navy sticky top-0 z-50">
      <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Syngenta Leaf Icon */}
          <div className="w-9 h-9 rounded-full bg-cropwise-green/15 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-cropwise-green" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-[15px] font-semibold text-white leading-tight">
              Syngenta Türkiye
            </h1>
            <p className="text-[10px] text-cropwise-green/80 font-medium">
              Bitki Koruma Ürünleri
            </p>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg px-2.5 py-1">
          <span className="text-[10px] text-white/60 font-medium">Katalog</span>
        </div>
      </div>
    </header>
  );
}
