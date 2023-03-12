import * as yup from 'yup';

export const userRegisterSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  dob: yup.date().min(new Date('1900-01-01')).optional(),
  countryCode: yup.string().required(),
  mobile: yup.string().required(),
  password: yup.string().required(),
});
