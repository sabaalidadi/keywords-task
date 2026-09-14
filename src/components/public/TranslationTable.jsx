
import LanguageSelector from "./LanguageSelector";
import TranslationValue from "./TranslationValue";

function TranslationTable({
  keywords,
  currentLang,
  activeLang,
  remainingLanguages,
  onLanguageChange,
}) {
  const firstLanguage = remainingLanguages[0];
  const secondLanguage = remainingLanguages[1];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-center text-xs font-semibold text-slate-400">
              <th className="px-4 py-3 text-center">
                <LanguageSelector
                  value={currentLang}
                  onChange={onLanguageChange}
                />
              </th>

              <th className="px-4 py-3 text-center">
                {firstLanguage?.name}
              </th>

              {/* Second Remaining Language - Desktop Only */}
              <th className="hidden px-4 py-3 text-center md:table-cell">
                {secondLanguage?.name}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {keywords.map((item) => (
              <tr
                key={item.id}
                className="transition hover:bg-slate-50/70"
              >
                {/* Selected Language */}
                <td
                  className="px-4 py-3.5 text-center font-medium"
                  dir={activeLang.dir}
                >
                  <TranslationValue
                    value={item[currentLang]}
                    variant="table"
                  />
                </td>

                {/* First Remaining Language */}
                <td
                  className="px-4 py-3.5 text-center font-medium"
                  dir={firstLanguage?.dir}
                >
                  <TranslationValue
                    value={item[firstLanguage?.code]}
                    variant="table"
                  />
                </td>

                {/* Second Remaining Language - Desktop Only */}
                <td
                  className="hidden px-4 py-3.5 text-center font-medium md:table-cell"
                  dir={secondLanguage?.dir}
                >
                  <TranslationValue
                    value={item[secondLanguage?.code]}
                    variant="table"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TranslationTable;

