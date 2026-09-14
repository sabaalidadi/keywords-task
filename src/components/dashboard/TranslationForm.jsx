// src/components/dashboard/TranslationForm.jsx

import { useState } from "react";
import { Formik, Form, useField } from "formik";
import validationSchema from "../../validation/keywordValidator";
import { useDashboardContext } from "../../context/DashboardContext";

function TranslationForm() {
  const { handleAddTranslation } = useDashboardContext();
  const [invalidFields, setInvalidFields] = useState({
    en: false,
    fa: false,
    fr: false,
  });

  const [formError, setFormError] = useState("");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
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
                d="M12 5v14M5 12h14"
              />
            </svg>
          </div>

          <h2 className="text-sm font-bold text-slate-900">
            افزودن ترجمه جدید
          </h2>
        </div>
      </div>

      <div className="p-5">
        <Formik
          initialValues={{
            en: "",
            fa: "",
            fr: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const filledFields = [values.fa, values.en, values.fr].filter(
              (value) => value && value.trim().length > 0,
            );

            if (filledFields.length < 2) {
              setInvalidFields({
                en: true,
                fa: true,
                fr: true,
              });

              setFormError("لطفاً حداقل دو زبان را تکمیل کنید");
              return;
            }

            setInvalidFields({
              en: false,
              fa: false,
              fr: false,
            });

            setFormError("");

            handleAddTranslation(values);

            resetForm();
          }}
        >
          <Form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <TranslationField
                name="en"
                label="English"
                placeholder="Enter English translation"
                direction="ltr"
                hasError={invalidFields.en}
                onChange={() => {
                  setInvalidFields((prev) => ({
                    ...prev,
                    en: false,
                  }));
                }}
              />

              <TranslationField
                name="fa"
                label="فارسی"
                placeholder="متن فارسی را وارد کنید"
                direction="rtl"
                hasError={invalidFields.fa}
                onChange={() => {
                  setInvalidFields((prev) => ({
                    ...prev,
                    fa: false,
                  }));
                }}
              />

              <TranslationField
                name="fr"
                label="Français"
                placeholder="Saisissez la traduction"
                direction="ltr"
                hasError={invalidFields.fr}
                onChange={() => {
                  setInvalidFields((prev) => ({
                    ...prev,
                    fr: false,
                  }));
                }}
              />

              <button
                type="submit"
                className="
                  mt-[23px]
                  h-[42px]
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-slate-900
                  px-5
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-slate-800
                  focus:outline-none
                  focus:ring-2
                  focus:ring-slate-900/20
                "
              >
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
                    d="M12 5v14M5 12h14"
                  />
                </svg>
                افزودن ترجمه
              </button>
            </div>

            {formError && (
              <p className="text-xs font-medium text-rose-600">{formError}</p>
            )}
          </Form>
        </Formik>
      </div>
    </section>
  );
}

function TranslationField({
  name,
  label,
  placeholder,
  direction,
  hasError,
  onChange,
}) {
  const [field] = useField(name);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-xs font-semibold text-slate-700"
      >
        {label}
      </label>

      <input
        {...field}
        id={name}
        name={name}
        dir={direction}
        placeholder={placeholder}
        onChange={(event) => {
          field.onChange(event);
          onChange?.();
        }}
        className={`
          w-full
          rounded-xl
          border
          bg-slate-50
          px-3.5
          py-2.5
          text-sm
          text-slate-800
          outline-none
          transition
          placeholder:text-slate-400
          focus:bg-white
          focus:ring-4

          ${
            hasError
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
              : "border-slate-200 focus:border-sky-500 focus:ring-sky-500/10"
          }
        `}
      />
    </div>
  );
}

export default TranslationForm;
