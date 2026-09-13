
import SearchInput from "../SearchInput";

function PublicViewHeader({
  searchQuery,
  onSearch,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg font-bold text-slate-900">
        پیش‌نمایش عمومی ترجمه‌ها
      </h2>

      <div className="flex items-center gap-2">
        {/* Search */}
        <SearchInput
          value={searchQuery}
          onChange={onSearch}
          placeholder="جستجوی ترجمه..."
        />

        {/* View Mode */}
        <div className="flex shrink-0 items-center rounded-xl bg-slate-100 p-1 text-xs text-slate-600">
          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            className={`
              rounded-lg
              px-3
              py-1.5
              font-medium
              transition
              cursor-pointer
              ${
                viewMode === "table"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "hover:text-slate-900"
              }
            `}
          >
            جدول
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("cards")}
            className={`
              rounded-lg
              px-3
              py-1.5
              font-medium
              transition
              cursor-pointer
              ${
                viewMode === "cards"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "hover:text-slate-900"
              }
            `}
          >
            کارت‌ها
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublicViewHeader;

