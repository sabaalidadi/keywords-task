import { createContext, useContext, useEffect, useState } from "react";
import { INITIAL_KEYWORDS } from "../data/initialData";

const AppContext = createContext(null);

const STORAGE_KEY = "app_translation_keywords";

export function AppProvider({ children }) {
  const [keywords, setKeywords] = useState(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);

      if (!savedData) {
        return INITIAL_KEYWORDS;
      }

      const parsedData = JSON.parse(savedData);

      return Array.isArray(parsedData) ? parsedData : INITIAL_KEYWORDS;
    } catch (error) {
      console.error("خطا در خواندن داده‌ها:", error);
      return INITIAL_KEYWORDS;
    }
  });

  const [currentLang, setCurrentLang] = useState("fa");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
  }, [keywords]);

  const value = {
    keywords,
    setKeywords,
    currentLang,
    setCurrentLang,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext باید داخل AppProvider استفاده شود.");
  }

  return context;
}
