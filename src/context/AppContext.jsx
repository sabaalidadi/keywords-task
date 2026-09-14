
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { arrayMove } from "@dnd-kit/sortable";
import {INITIAL_KEYWORDS} from '../data/initialData'

const AppContext = createContext(null);
const STORAGE_KEY = "keywords";

function getInitialKeywords() {
  try {
    const savedKeywords = localStorage.getItem(STORAGE_KEY);

    if (!savedKeywords) {
      return INITIAL_KEYWORDS;
    }

    const parsedKeywords = JSON.parse(savedKeywords);

    if (Array.isArray(parsedKeywords) && parsedKeywords.length > 0) {
      return parsedKeywords;
    }

    return INITIAL_KEYWORDS;
  } catch (error) {
    console.error("خطا در خواندن داده‌های ترجمه:", error);
    return INITIAL_KEYWORDS;
  }
}


export function AppProvider({ children }) {
  const [keywords, setKeywords] = useState(getInitialKeywords);

  const [currentLang, setCurrentLang] = useState("fa");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
  }, [keywords]);

  const addKeyword = (values) => {
    const timestamp = Date.now();
    const newEntry = {
      id: timestamp,
      key: `word_${timestamp}`,
      en: values.en || "",
      fa: values.fa || "",
      fr: values.fr || "",
    };
    setKeywords((prev) => [newEntry, ...prev]);
    toast.success("ترجمه جدید با موفقیت اضافه شد");
  };

  const updateKeyword = (id, updatedFields) => {
    setKeywords((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item,
      ),
    );
    toast.success("ترجمه با موفقیت به‌روزرسانی شد");
  };

  const deleteKeyword = (id) => {
    setKeywords((prev) => prev.filter((item) => item.id !== id));
    toast.success("ترجمه با موفقیت حذف شد");
  };

  const reorderKeywords = (activeId, overId) => {
    if (!overId || activeId === overId) return;
    setKeywords((current) => {
      const oldIndex = current.findIndex(
        (item) => String(item.id) === String(activeId),
      );
      const newIndex = current.findIndex(
        (item) => String(item.id) === String(overId),
      );
      return oldIndex === -1 || newIndex === -1
        ? current
        : arrayMove(current, oldIndex, newIndex);
    });
  };

  const appendKeywords = (newItems) => {
    setKeywords((prev) => [...prev, ...newItems]);
    toast.success(`${newItems.length} ترجمه با موفقیت اضافه شد`);
  };

  const value = {
    keywords,
    currentLang,
    setCurrentLang,
    addKeyword,
    updateKeyword,
    deleteKeyword,
    reorderKeywords,
    appendKeywords,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext باید داخل AppProvider استفاده شود.");
  return context;
}
