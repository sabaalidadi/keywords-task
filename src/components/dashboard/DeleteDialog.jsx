import { useDashboardContext } from "../../context/DashboardContext";

function DeleteDialog({ open, keyName, onCancel }) {
  const { handleConfirmDelete } = useDashboardContext();
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/40
        px-4
        backdrop-blur-sm
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"
                />
              </svg>
            </div>

            <div>
              <h3
                id="delete-dialog-title"
                className="text-sm font-bold text-slate-900"
              >
                حذف ترجمه
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                این عملیات قابل بازگشت نیست.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm leading-7 text-slate-600">
            آیا از حذف عبارت{" "}
            <span className="font-bold text-slate-900">«{keyName}»</span>{" "}
            اطمینان دارید؟
          </p>
        </div>
        
        <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50/50 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="
              rounded-lg
              border border-slate-200
              bg-white
              px-4 py-2
              text-xs font-semibold
              text-slate-600
              transition
              hover:bg-slate-50
              focus:outline-none
              focus:ring-2
              focus:ring-slate-500/10
            "
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={handleConfirmDelete}
            className="
              rounded-lg
              bg-rose-600
              px-4 py-2
              text-xs font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-rose-700
              focus:outline-none
              focus:ring-2
              focus:ring-rose-500/20
            "
          >
            حذف ترجمه
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDialog;
