function SearchInput({ value, onChange, placeholder = "جستجو..." }) {
  return (
    <div className="relative w-full sm:w-64">
      {/*Icon */}
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path strokeLinecap="round" d="m16 16 4 4" />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          py-2
          pr-9
          pl-3
          text-sm
          text-slate-800
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-sky-400
          focus:bg-white
          focus:ring-2
          focus:ring-sky-100
        "
      />
    </div>
  );
}

export default SearchInput;
