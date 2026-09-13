
import { AVAILABLE_LANGUAGES } from "../../data/initialData";

function LanguageSelector({
  value,
  onChange,
}) {
  return (
    <div className="w-full min-w-0 sm:w-auto">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="
          block
          w-full
          min-w-0
          max-w-full
          cursor-pointer
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          px-3
          py-2.5
          text-center
          text-sm
          font-semibold
          text-slate-700
          outline-none
          transition
          focus:border-sky-400
          focus:bg-white
          focus:ring-2
          focus:ring-sky-100
          sm:w-auto
          sm:min-w-[150px]
        "
      >
        {AVAILABLE_LANGUAGES.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
          >
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;

