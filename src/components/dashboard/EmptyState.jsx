// src/components/dashboard/EmptyState.jsx

function EmptyState({ hasSearch }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-14 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h10M4 18h7"
          />
        </svg>
      </div>

      <h3 className="text-sm font-bold text-slate-800">
        {hasSearch
          ? "نتیجه‌ای پیدا نشد"
          : "هنوز ترجمه‌ای ثبت نشده است"}
      </h3>

      <p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-500">
        {hasSearch
          ? "عبارت جستجو را تغییر دهید و دوباره تلاش کنید."
          : "برای شروع، اولین ترجمه چندزبانه خود را از طریق فرم بالا اضافه کنید."}
      </p>
    </div>
  );
}

export default EmptyState;