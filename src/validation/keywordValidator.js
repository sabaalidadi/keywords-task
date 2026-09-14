import * as Yup from 'yup';
const validationSchema = Yup.object({
  fa: Yup.string(),
  en: Yup.string(),
  fr: Yup.string(),
});

export default validationSchema