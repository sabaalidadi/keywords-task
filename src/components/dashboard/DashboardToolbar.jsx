
function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16V4m0 0 4 4m-4-4-4 4M5 20h14"
      />
    </svg>
  );
}

function DashboardToolbar({
  fileInputRef,
  onExport,
  onImport,
}) {
  return (
    <section className="overflow-hidden">
      <div className="flex items-center gap-2">
        {/* Export JSON */}
        <button
          type="button"
          onClick={onExport}
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-lg
            border border-slate-200
            bg-slate-50
            px-3.5
            py-2
            text-xs
            font-semibold
            text-slate-700
            transition
            hover:border-slate-300
            hover:bg-slate-100
            focus:outline-none
            focus:ring-2
            focus:ring-sky-500/20
          "
        >
          <DownloadIcon />
          خروجی JSON
        </button>

        {/* Import JSON */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-lg
            bg-sky-600
            px-3.5
            py-2
            text-xs
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-sky-700
            focus:outline-none
            focus:ring-2
            focus:ring-sky-500/30
          "
        >
          <UploadIcon />
          ورود JSON
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={onImport}
          className="hidden"
        />
      </div>
    </section>
  );
}

export default DashboardToolbar;

