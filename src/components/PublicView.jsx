
import { useMemo, useState } from "react";
import { AVAILABLE_LANGUAGES } from "../data/initialData";
import { useAppContext } from "../context/AppContext";

import PublicViewHeader from "./public/PublicViewHeader";
import TranslationTable from "./public/TranslationTable";
import TranslationCards from "./public/TranslationCards";

function PublicView() {
  const { keywords, currentLang, setCurrentLang } = useAppContext();

  const [viewMode, setViewMode] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");

  const activeLangObj =
    AVAILABLE_LANGUAGES.find(
      (lang) => lang.code === currentLang,
    ) || AVAILABLE_LANGUAGES[0];

  const remainingLanguages = AVAILABLE_LANGUAGES.filter(
    (lang) => lang.code !== currentLang,
  );

  const filteredKeywords = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return keywords;
    }

    return keywords.filter((item) =>
      [item.fa, item.en, item.fr].some(
        (value) =>
          value &&
          value.toLowerCase().includes(query),
      ),
    );
  }, [keywords, searchQuery]);

  const handleLanguageChange = (language) => {
    setCurrentLang(language);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PublicViewHeader
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Empty State */}
      {keywords.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
            📖
          </div>

          <h3 className="mb-1 text-base font-bold text-slate-800">
            داده‌ای برای نمایش وجود ندارد
          </h3>

          <p className="text-xs text-slate-400">
            لطفاً ابتدا از داشبورد مدیریت چند کلیدواژه اضافه کنید.
          </p>
        </div>
      ) : viewMode === "table" ? (
        <TranslationTable
          keywords={filteredKeywords}
          currentLang={currentLang}
          activeLang={activeLangObj}
          remainingLanguages={remainingLanguages}
          onLanguageChange={handleLanguageChange}
        />
      ) : (
        <TranslationCards
          keywords={filteredKeywords}
          currentLang={currentLang}
          activeLang={activeLangObj}
          remainingLanguages={remainingLanguages}
          onLanguageChange={handleLanguageChange}
        />
      )}
    </div>
  );
}

export default PublicView;

