// اعتبارسنجی با Yup
import * as Yup from 'yup';
const keywordValidationSchema = Yup.object({
  key: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9_]+$/, 'کلید فقط می‌تواند شامل حروف انگلیسی، اعداد و _ باشد')
    .required('وارد کردن کلید الزامی است'),
  fa: Yup.string().trim().required('ترجمه فارسی الزامی است'),
  en: Yup.string().trim().required('ترجمه انگلیسی الزامی است'),
  fr: Yup.string().trim().required('ترجمه فرانسوی الزامی است'),
});

export default keywordValidationSchema