export function exportKeywordsToJSON(keywords) {
  if (!keywords || !keywords.length) {
    throw new Error("داده‌ای برای خروجی گرفتن وجود ندارد");
  }

  const exportData = keywords.map(({ key, fa, en, fr }) => ({
    key: key || "",
    fa: fa || "",
    en: en || "",
    fr: fr || "",
  }));

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "translations.json";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function parseKeywordsJSON(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("فایلی انتخاب نشده است"));

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (!Array.isArray(data)) {
          return reject(new Error("ساختار فایل باید به صورت آرایه باشد"));
        }

        const validItems = data
          .filter(
            (item) =>
              item && typeof item === "object" && typeof item.key === "string",
          )
          .map((item, index) => ({
            id: Date.now() + index,
            key: item.key.trim(),
            fa: typeof item.fa === "string" ? item.fa : "",
            en: typeof item.en === "string" ? item.en : "",
            fr: typeof item.fr === "string" ? item.fr : "",
          }));

        if (!validItems.length) {
          return reject(new Error("داده معتبری در فایل JSON یافت نشد"));
        }

        resolve(validItems);
      } catch {
        reject(new Error("ساختار فایل JSON معتبر نیست"));
      }
    };

    reader.onerror = () => reject(new Error("خطا در خواندن فایل"));
    reader.readAsText(file);
  });
}
