interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="mt-4 relative">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ürün, etken madde veya zararlı ara..."
        className="w-full pl-11 pr-10 py-3.5 bg-gray-100 rounded-2xl text-sm font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-cropwise-green/40 focus:bg-white focus:shadow-lg transition-all"
        aria-label="Ürün arama"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 active:text-gray-800"
          aria-label="Aramayı temizle"
        >
          <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
