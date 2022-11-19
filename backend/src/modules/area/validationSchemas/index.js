import * as yup from 'yup';

export const validationSchema = yup
  .array()
  .min(1, 'Please enter at least one sport')
  .required('Please enter at least one sport')
  .test({
    name: 'areas-unique',
    message: 'Areas must be unique',
    test: (value) => {
      const set = new Set(value);
      return set.size === value.length;
    },
  });
