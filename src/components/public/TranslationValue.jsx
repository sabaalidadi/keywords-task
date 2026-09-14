function TranslationValue({ value, variant = "default" }) {
  const hasTranslation = value && value.trim() !== "";

  if (!hasTranslation) {
    return (
      <span
        className={`
          inline-flex
          items-center
          gap-1.5
          rounded-full
          text-xs
          font-medium
          ${
            variant === "table"
              ? "border border-amber-200/60 bg-amber-50 px-2.5 py-1 text-amber-600"
              : "text-amber-600"
          }
        `}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        ترجمه نشده
      </span>
    );
  }

  return <span className="text-slate-800">{value}</span>;
}

export default TranslationValue;
