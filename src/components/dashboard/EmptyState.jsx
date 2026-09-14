function EmptyState({ hasSearch }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-14 text-center">
      <h3 className="text-sm font-bold text-slate-800">
        {hasSearch ? "نتیجه‌ای پیدا نشد" : "هنوز ترجمه‌ای ثبت نشده است"}
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
