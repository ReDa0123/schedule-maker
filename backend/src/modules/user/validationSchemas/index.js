import * as yup from 'yup';

export const userValidationSchema = yup.object().shape({
  username: yup.string().required().min(4).max(16),
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(32),
});

export const emailValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const emailPasswordValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(32),
});
