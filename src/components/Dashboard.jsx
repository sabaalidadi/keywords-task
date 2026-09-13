// src/components/Dashboard.jsx
import { useState, useMemo, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AVAILABLE_LANGUAGES } from '../data/initialData';
import { useAppContext } from '../context/AppContext';

// اعتبارسنجی: فقط Key اجباری است
const keywordValidationSchema = Yup.object({
  key: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9_]+$/, 'کلید فقط می‌تواند شامل حروف انگلیسی، اعداد و _ باشد')
    .required('وارد کردن کلید (Key) الزامی است'),
  fa: Yup.string(),
  en: Yup.string(),
  fr: Yup.string(),
});

function Dashboard() {
    const {
    keywords,
    setKeywords,
  } = useAppContext();
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ key: '', fa: '', en: '', fr: '' });
  const [searchQuery, setSearchQuery] = useState('');
  
  // ایندکس‌های مربوط به Drag and Drop
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const fileInputRef = useRef(null);

  // جستجوی بهینه
  const isSearching = searchQuery.trim().length > 0;
  const filteredKeywords = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return keywords;

    return keywords.filter(
      (item) =>
        item.key.toLowerCase().includes(q) ||
        (item.fa && item.fa.toLowerCase().includes(q)) ||
        (item.en && item.en.toLowerCase().includes(q)) ||
        (item.fr && item.fr.toLowerCase().includes(q))
    );
  }, [keywords, searchQuery]);

  // حذف یک کلیدواژه
  const handleDelete = (id, keyName) => {
    if (window.confirm(`آیا از حذف کلید "${keyName}" اطمینان دارید؟`)) {
      setKeywords((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // حالت ویرایش
  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditFormData({
      key: item.key,
      fa: item.fa || '',
      en: item.en || '',
      fr: item.fr || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({ key: '', fa: '', en: '', fr: '' });
  };

  const handleSaveEdit = (id) => {
    if (!editFormData.key.trim()) {
      alert('کلید نمی‌تواند خالی باشد.');
      return;
    }

    setKeywords((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              key: editFormData.key.trim(),
              fa: editFormData.fa.trim(),
              en: editFormData.en.trim(),
              fr: editFormData.fr.trim(),
            }
          : item
      )
    );
    setEditingId(null);
  };

  // پیاده‌سازی Drag and Drop نیتیو
  const handleDragStart = (e, index) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (
      dragItem.current !== null &&
      dragOverItem.current !== null &&
      dragItem.current !== dragOverItem.current
    ) {
      const updatedList = [...keywords];
      const draggedItemContent = updatedList.splice(dragItem.current, 1)[0];
      updatedList.splice(dragOverItem.current, 0, draggedItemContent);
      
      // ذخیره ترتیب جدید (همگام با localStorage از طریق App.jsx)
      setKeywords(updatedList);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // خروجی استاندارد JSON برای فرمت i18n
  const handleExportJSON = (langCode) => {
    const exportObject = {};
    keywords.forEach((item) => {
      exportObject[item.key] = item[langCode] || '';
    });

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${langCode}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // دانلود کل دیتابیس
  const handleExportAllBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(keywords, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `translation_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // آپلود دیتابیس
  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;

    fileReader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          setKeywords(importedData);
          alert('اطلاعات با موفقیت بارگذاری شد.');
        } else {
          alert('فرمت فایل نامعتبر است.');
        }
      } catch {
        alert('خطا در خواندن فایل JSON.');
      }
    };
    fileReader.readAsText(file);
    e.target.value = null;
  };

  return (
    <div className="space-y-6">
      {/* نوار ابزار پشتیبان‌گیری و خروجی */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">ابزارهای خروجی و پشتیبان‌گیری</h2>
          <p className="text-xs text-slate-500 mt-0.5">دریافت خروجی JSON برای هر زبان یا پشتیبان‌گیری کامل</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {AVAILABLE_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleExportJSON(lang.code)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition cursor-pointer"
            >
              خروجی {lang.code.toUpperCase()}.json
            </button>
          ))}
          <button
            onClick={handleExportAllBackup}
            className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            📥 پشتیبان کامل
          </button>
          <input type="file" ref={fileInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />
          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            📤 بارگذاری JSON
          </button>
        </div>
      </div>

      {/* فرم افزودن کلمه کلیدی (با امکان وارد کردن فقط ۱ زبان یا چند زبان) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-1">افزودن کلمه کلیدی جدید</h2>
        <p className="text-sm text-slate-500 mb-5">
          می‌توانید ترجمه را برای حداقل یک زبان وارد کنید؛ برای سایر زبان‌ها مقدار پیش‌فرض خالی در نظر گرفته می‌شود.
        </p>

        <Formik
          initialValues={{ key: '', fa: '', en: '', fr: '' }}
          validationSchema={keywordValidationSchema}
          onSubmit={(values, { resetForm }) => {
            const trimmedKey = values.key.trim();
            const isDuplicate = keywords.some(
              (item) => item.key.toLowerCase() === trimmedKey.toLowerCase()
            );

            if (isDuplicate) {
              alert('این کلید قبلاً ثبت شده است! لطفاً کلید دیگری انتخاب کنید.');
              return;
            }

            const newKeyword = {
              id: Date.now(),
              key: trimmedKey,
              fa: values.fa?.trim() || '',
              en: values.en?.trim() || '',
              fr: values.fr?.trim() || '',
            };

            setKeywords((prev) => [newKeyword, ...prev]);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    کلیدواژه (Key) <span className="text-rose-500">*</span>
                  </label>
                  <Field
                    name="key"
                    placeholder="مثال: nav_about"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition font-mono"
                  />
                  <div className="text-rose-500 text-xs mt-1 font-medium">
                    <ErrorMessage name="key" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">فارسی (FA)</label>
                  <Field
                    name="fa"
                    placeholder="ترجمه فارسی..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">انگلیسی (EN)</label>
                  <Field
                    name="en"
                    placeholder="English translation..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition text-left font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">فرانسوی (FR)</label>
                  <Field
                    name="fr"
                    placeholder="Traduction française..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition text-left font-sans"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg shadow-sm transition active:scale-95 cursor-pointer"
                >
                  + افزودن کلیدواژه
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* لیست کلیدواژه‌ها با قابلیت Drag and Drop */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">لیست و ترتیب کلمات کلیدی</h2>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-semibold">
                {keywords.length} کلید
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {!isSearching ? '💡 می‌توانید با کشیدن آیکون (⋮⋮) ترتیب کلمات را جابجا کنید.' : '⚠️ قابلیت Drag & Drop در زمان جستجو غیرفعال است.'}
            </p>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="جستجو در کلید یا ترجمه‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
          </div>
        </div>

        {filteredKeywords.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            {searchQuery ? 'موردی یافت نشد.' : 'هیچ کلیدواژه‌ای ثبت نشده است.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase">
                  <th className="py-3 px-2 w-10 text-center">ترتیب</th>
                  <th className="py-3 px-3">کلید</th>
                  <th className="py-3 px-3">فارسی</th>
                  <th className="py-3 px-3">انگلیسی</th>
                  <th className="py-3 px-3">فرانسوی</th>
                  <th className="py-3 px-3 text-center w-28">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredKeywords.map((item, index) => {
                  const isEditing = editingId === item.id;

                  return (
                    <tr
                      key={item.id}
                      draggable={!isSearching && !isEditing}
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnter={(e) => handleDragEnter(e, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
                      className={`transition ${
                        !isSearching ? 'hover:bg-slate-50/80 cursor-default' : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* آیکون Drag Handle */}
                      <td className="py-3.5 px-2 text-center text-slate-300">
                        {!isSearching && !isEditing ? (
                          <span
                            className="cursor-grab active:cursor-grabbing text-base hover:text-slate-600 select-none inline-block p-1"
                            title="برای جابجایی بکشید"
                          >
                            ⋮⋮
                          </span>
                        ) : (
                          <span className="text-xs text-slate-300 font-mono">{index + 1}</span>
                        )}
                      </td>

                      {isEditing ? (
                        <>
                          <td className="p-2">
                            <input
                              type="text"
                              value={editFormData.key}
                              onChange={(e) =>
                                setEditFormData({ ...editFormData, key: e.target.value })
                              }
                              className="w-full px-2 py-1.5 border border-sky-400 rounded-md text-xs font-mono"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={editFormData.fa}
                              onChange={(e) =>
                                setEditFormData({ ...editFormData, fa: e.target.value })
                              }
                              className="w-full px-2 py-1.5 border border-sky-400 rounded-md text-xs"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={editFormData.en}
                              onChange={(e) =>
                                setEditFormData({ ...editFormData, en: e.target.value })
                              }
                              className="w-full px-2 py-1.5 border border-sky-400 rounded-md text-xs text-left"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={editFormData.fr}
                              onChange={(e) =>
                                setEditFormData({ ...editFormData, fr: e.target.value })
                              }
                              className="w-full px-2 py-1.5 border border-sky-400 rounded-md text-xs text-left"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleSaveEdit(item.id)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium cursor-pointer"
                              >
                                ذخیره
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-medium cursor-pointer"
                              >
                                انصراف
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-3.5 px-3 font-mono font-medium text-sky-700">
                            <code>{item.key}</code>
                          </td>
                          <td className="py-3.5 px-3 text-slate-800">
                            {item.fa || <span className="text-slate-300 italic text-xs">خالی</span>}
                          </td>
                          <td className="py-3.5 px-3 text-slate-800 text-left font-sans">
                            {item.en || <span className="text-slate-300 italic text-xs">Empty</span>}
                          </td>
                          <td className="py-3.5 px-3 text-slate-800 text-left font-sans">
                            {item.fr || <span className="text-slate-300 italic text-xs">Vide</span>}
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleStartEdit(item)}
                                className="px-2.5 py-1 text-sky-600 hover:bg-sky-50 border border-sky-200 rounded text-xs font-medium transition cursor-pointer"
                              >
                                ویرایش
                              </button>
                              <button
                                onClick={() => handleDelete(item.id, item.key)}
                                className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded text-xs font-medium transition cursor-pointer"
                              >
                                حذف
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
