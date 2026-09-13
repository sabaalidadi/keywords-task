// src/components/dashboard/TranslationItem.jsx

import SortableKeywordItem from "../SortableKeywordItem";

function EditIcon() {
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
        d="m16.862 3.487 3.65 3.65M5 19l4.2-.8L19.7 7.7a2.58 2.58 0 0 0-3.65-3.65L5.55 14.55 5 19Z"
      />
    </svg>
  );
}

function TrashIcon() {
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
        d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"
      />
    </svg>
  );
}

function CheckIcon() {
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
        d="m5 12 4 4L19 6"
      />
    </svg>
  );
}

function CloseIcon() {
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
        d="m6 6 12 12M18 6 6 18"
      />
    </svg>
  );
}

function DragIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
    >
      <circle cx="8" cy="6" r="1.3" />
      <circle cx="16" cy="6" r="1.3" />

      <circle cx="8" cy="12" r="1.3" />
      <circle cx="16" cy="12" r="1.3" />

      <circle cx="8" cy="18" r="1.3" />
      <circle cx="16" cy="18" r="1.3" />
    </svg>
  );
}

function TranslationItem({
  item,
  editingId,
  editFormData,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditFieldChange,
  onDelete,
}) {
  const isEditing = editingId === item.id;

  return (
    <SortableKeywordItem item={item}>
      {({ dragHandleProps }) => (
        <div
          className={`
            group
            overflow-hidden
            rounded-xl
            border
            bg-white
            transition-all
            ${
              isEditing
                ? "border-sky-300 bg-sky-50/20 shadow-sm"
                : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
            }
          `}
        >
          <div
            className="
              grid
              grid-cols-1
              gap-4
              p-4
              md:grid-cols-[40px_1fr_1fr_1fr_90px]
              md:items-center
            "
          >
            {/* Drag Handle */}
            <div className="hidden md:flex md:items-center md:justify-center">
              <button
                type="button"
                ref={dragHandleProps.ref}
                {...dragHandleProps}
                aria-label="جابجایی ترجمه"
                title="برای جابجایی بکشید"
                className="
                  flex
                  h-8
                  w-8
                  cursor-grab
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-300
                  transition
                  hover:bg-slate-100
                  hover:text-slate-500
                  active:cursor-grabbing
                  focus:outline-none
                  focus:ring-2
                  focus:ring-sky-500/20
                "
              >
                <DragIcon />
              </button>
            </div>

            {/* English */}
            <TranslationCell
              value={item.en}
              editing={isEditing}
              field="en"
              editFormData={editFormData}
              onChange={onEditFieldChange}
              placeholder="English"
              direction="ltr"
            />

            {/* Persian */}
            <TranslationCell
              value={item.fa}
              editing={isEditing}
              field="fa"
              editFormData={editFormData}
              onChange={onEditFieldChange}
              placeholder="فارسی"
              direction="rtl"
            />

            {/* French */}
            <TranslationCell
              value={item.fr}
              editing={isEditing}
              field="fr"
              editFormData={editFormData}
              onChange={onEditFieldChange}
              placeholder="Français"
              direction="ltr"
            />

            {/* Actions */}
            <div
              className="
                flex
                items-center
                justify-center
                gap-1
                border-t
                border-slate-100
                pt-3
                md:border-0
                md:pt-0
              "
            >
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => onSaveEdit(item.id)}
                    title="ذخیره تغییرات"
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      text-emerald-600
                      transition
                      hover:bg-emerald-50
                      focus:outline-none
                      focus:ring-2
                      focus:ring-emerald-500/20
                    "
                  >
                    <CheckIcon />
                  </button>

                  <button
                    type="button"
                    onClick={onCancelEdit}
                    title="لغو ویرایش"
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      text-slate-500
                      transition
                      hover:bg-slate-100
                      focus:outline-none
                      focus:ring-2
                      focus:ring-slate-500/20
                    "
                  >
                    <CloseIcon />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => onStartEdit(item)}
                    title="ویرایش ترجمه"
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      text-slate-500
                      transition
                      hover:bg-sky-50
                      hover:text-sky-600
                      focus:outline-none
                      focus:ring-2
                      focus:ring-sky-500/20
                    "
                  >
                    <EditIcon />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(item.id, item.key)}
                    title="حذف ترجمه"
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      text-slate-500
                      transition
                      hover:bg-rose-50
                      hover:text-rose-600
                      focus:outline-none
                      focus:ring-2
                      focus:ring-rose-500/20
                    "
                  >
                    <TrashIcon />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Drag Handle */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              border-t
              border-slate-100
              px-4
              py-2
              md:hidden
            "
          >
            <button
              type="button"
              ref={dragHandleProps.ref}
              {...dragHandleProps}
              aria-label="جابجایی ترجمه"
              title="برای جابجایی بکشید"
              className="
                flex
                h-8
                w-8
                cursor-grab
                items-center
                justify-center
                rounded-lg
                text-slate-300
                transition
                hover:bg-slate-100
                hover:text-slate-500
                active:cursor-grabbing
                focus:outline-none
                focus:ring-2
                focus:ring-sky-500/20
              "
            >
              <DragIcon />
            </button>

            <span className="text-[11px] text-slate-400">
              برای تغییر ترتیب، بکشید
            </span>
          </div>
        </div>
      )}
    </SortableKeywordItem>
  );
}

function TranslationCell({
  value,
  editing,
  field,
  editFormData,
  onChange,
  placeholder,
  direction,
}) {
  if (editing) {
    return (
      <div className="flex min-w-0 items-center justify-center">
        <input
          value={editFormData[field] || ""}
          onChange={(event) =>
            onChange(field, event.target.value)
          }
          dir={direction}
          placeholder={placeholder}
          className="
            w-full
            rounded-lg
            border
            border-sky-200
            bg-white
            px-3
            py-2
            text-center
            text-sm
            text-slate-800
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-sky-500
            focus:ring-4
            focus:ring-sky-500/10
          "
        />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 items-center justify-center">
      <div
        dir={direction}
        title={value || undefined}
        className={`
          w-full
          truncate
          text-center
          text-sm
          ${
            value
              ? "font-medium text-slate-700"
              : "italic text-slate-300"
          }
        `}
      >
        {value || "ترجمه‌ای ثبت نشده است"}
      </div>
    </div>
  );
}


export default TranslationItem;