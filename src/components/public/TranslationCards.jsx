
import LanguageSelector from "./LanguageSelector";
import TranslationValue from "./TranslationValue";

function TranslationCards({
  keywords,
  currentLang,
  activeLang,
  remainingLanguages,
  onLanguageChange,
}) {
  return (
    <div className="space-y-5">
      {/* Language Selector */}
<div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
  <div className="min-w-0">
    <h3 className="text-sm font-bold text-slate-800">
      زبان اصلی نمایش
    </h3>
  </div>

  <div className="w-full min-w-0 sm:w-auto">
    <LanguageSelector
      value={currentLang}
      onChange={onLanguageChange}
    />
  </div>
</div>

      {/* Cards */}
      {keywords.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
              />

              <path
                strokeLinecap="round"
                d="m16 16 4 4"
              />
            </svg>
          </div>

          <p className="text-sm font-semibold text-slate-700">
            نتیجه‌ای پیدا نشد
          </p>

          <p className="mt-1 text-xs text-slate-400">
            عبارت جستجو را تغییر دهید.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {keywords.map((item) => {
            const selectedText =
              item[currentLang];

            return (
              <div
                key={item.id}
                className="
                  group
                  rounded-2xl
                  border border-slate-100
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  hover:-translate-y-0.5
                  hover:border-sky-200
                  hover:shadow-md
                "
              >
                {/* Main Translation */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      {activeLang.name}
                    </span>

                    <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-semibold text-sky-600">
                      اصلی
                    </span>
                  </div>

                  <div
                    dir={activeLang.dir}
                    className="
                      flex
                      min-h-[58px]
                      items-center
                      justify-center
                      rounded-xl
                      border border-sky-100
                      bg-sky-50/40
                      px-4
                      py-3
                      text-center
                    "
                  >
                    <TranslationValue
                      value={selectedText}
                    />
                  </div>
                </div>

                {/* Remaining Languages */}
                <div className="space-y-3">
                  {remainingLanguages.map((lang) => {
                    const text = item[lang.code];

                    return (
                      <div key={lang.code}>
                        <div className="mb-1.5 text-xs font-semibold text-slate-400">
                          {lang.name}
                        </div>

                        <div
                          dir={lang.dir}
                          className="
                            flex
                            min-h-[48px]
                            items-center
                            justify-center
                            rounded-xl
                            border border-slate-100
                            bg-slate-50
                            px-3
                            py-2.5
                            text-center
                          "
                        >
                          <TranslationValue
                            value={text}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TranslationCards;

