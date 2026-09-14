import SearchInput from "../SearchInput";
import TranslationItem from "./TranslationItem";
import EmptyState from "./EmptyState";
import { useDashboardContext } from "../../context/DashboardContext";

function TranslationList() {
  const { filteredKeywords: items, keywords, searchQuery, setSearchQuery, editingId, editFormData, handleStartEdit, handleSaveEdit, handleCancelEdit, handleEditFieldChange, handleDeleteClick } = useDashboardContext();
  const totalCount = keywords.length;
  const hasSearch = Boolean(searchQuery.trim());

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-sm font-bold text-slate-900">
                فهرست ترجمه‌ها
              </h2>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                {totalCount}
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500">مدیریت و ویرایش</p>
          </div>

          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="جستجو در ترجمه‌ها..."
          />
        </div>
      </div>

      {/* Column Header */}
      {items.length > 0 && (
        <div className="hidden border-b border-slate-100 bg-slate-50/70 px-5 py-3 md:grid md:grid-cols-[40px_1fr_1fr_1fr_90px] md:items-center md:gap-4">
          <div className="text-center text-[11px] font-bold uppercase tracking-wide text-slate-400">
            {""}
          </div>

          <div className="text-center text-[11px] font-bold uppercase tracking-wide text-slate-400">
            English
          </div>

          <div className="text-center text-[11px] font-bold text-slate-400">
            فارسی
          </div>

          <div className="text-center text-[11px] font-bold uppercase tracking-wide text-slate-400">
            Français
          </div>

          <div className="text-center text-[11px] font-bold text-slate-400">
            عملیات
          </div>
        </div>
      )}

      {/* Items */}
      <div className="p-4">
        {items.length === 0 ? (
          <EmptyState hasSearch={hasSearch} />
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <TranslationItem
                key={item.id}
                item={item}
                editingId={editingId}
                editFormData={editFormData}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onEditFieldChange={handleEditFieldChange}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TranslationList;
