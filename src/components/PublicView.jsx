// src/components/PublicView.jsx
import { useState } from 'react';
import { AVAILABLE_LANGUAGES } from '../data/initialData';
import { useAppContext } from '../context/AppContext';

function PublicView() {
    const {
    keywords,
    currentLang,
    setCurrentLang,
  } = useAppContext();

  // امکان سوییچ بین نمای جدولی و کارتی
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  // دریافت مشخصات زبان فعلی
  const activeLangObj =
    AVAILABLE_LANGUAGES.find(
      (lang) => lang.code === currentLang
    ) || AVAILABLE_LANGUAGES[0];

  const isRtl = activeLangObj.dir === 'rtl';
  return (
    <div className="space-y-6">
      {/* نوار بالایی: انتخاب زبان فعال و حالت نمایش */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">پیش‌نمایش عمومی ترجمه‌ها</h2>
          <p className="text-xs text-slate-500 mt-1">
            زبان مورد نظر خود را انتخاب کنید تا عبارات و کلیدواژه‌ها را مشاهده نمایید.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* دکمه‌های تغییر زبان */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {AVAILABLE_LANGUAGES.map((lang) => {
              const isActive = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-white text-sky-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang.name}
                </button>
              );
            })}
          </div>

          {/* سوییچ حالت نمایش (جدول / کارت) */}
          <div className="hidden sm:flex bg-slate-100 p-1 rounded-xl text-xs text-slate-600">
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              جدول
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                viewMode === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              کارت‌ها
            </button>
          </div>
        </div>
      </div>

      {/* اگر هیچ کلمه‌ای ثبت نشده باشد */}
      {keywords.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
            📖
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">داده‌ای برای نمایش وجود ندارد</h3>
          <p className="text-xs text-slate-400">
            لطفاً ابتدا از داشبورد مدیریت چند کلیدواژه اضافه کنید.
          </p>
        </div>
      ) : viewMode === 'table' ? (
        /* ۱. نمای جدولی (Table View) */
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase">
                  <th className="py-3 px-4 w-16 text-center">#</th>
                  <th className="py-3 px-4">شناسه کلید (Key)</th>
                  <th className="py-3 px-4">
                    ترجمه به {activeLangObj.name} ({activeLangObj.code.toUpperCase()})
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {keywords.map((item, index) => {
                  const translation = item[currentLang];
                  const hasTranslation = translation && translation.trim() !== '';

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 text-center text-xs font-mono text-slate-400">
                        {index + 1}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-sky-700">
                        <span className="bg-sky-50 px-2.5 py-1 rounded-md text-xs border border-sky-100">
                          {item.key}
                        </span>
                      </td>
                      <td
                        className={`py-3.5 px-4 ${
                          isRtl ? 'text-right' : 'text-left font-sans'
                        }`}
                        dir={activeLangObj.dir}
                      >
                        {hasTranslation ? (
                          <span className="text-slate-800 font-medium">{translation}</span>
                        ) : (
                          /* وضعیت خالی (Empty State) */
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                            ترجمه نشده
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ۲. نمای کارتی (Cards Grid View) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keywords.map((item, index) => {
            const translation = item[currentLang];
            const hasTranslation = translation && translation.trim() !== '';

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:border-sky-200 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-medium bg-sky-50 text-sky-700 border border-sky-100 px-2.5 py-1 rounded-lg">
                    {item.key}
                  </span>
                  <span className="text-xs text-slate-300 font-mono">#{index + 1}</span>
                </div>

                <div
                  className={`mt-2 p-3.5 rounded-xl bg-slate-50 border border-slate-100 min-h-[52px] flex items-center ${
                    isRtl ? 'text-right justify-start' : 'text-left justify-start font-sans'
                  }`}
                  dir={activeLangObj.dir}
                >
                  {hasTranslation ? (
                    <span className="text-slate-800 text-sm font-semibold">{translation}</span>
                  ) : (
                    /* وضعیت خالی (Empty State) */
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      فاقد ترجمه برای این زبان
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PublicView;
