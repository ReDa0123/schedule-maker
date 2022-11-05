import * as yup from 'yup';

export const getBlockValidationSchema = ({ sportIds, dayIds, areaIds }) =>
  yup.object().shape({
    startTime: yup.number().integer().positive().max(1440).nullable(true),
    persons: yup.number().integer().positive().required(),
    //TODO: style is one of predefined values
    style: yup.string().required(),
    category: yup.string().max(50).nullable(true),
    sex: yup.string().oneOf(['M', 'F', null]).nullable(true),
    age: yup.string().required().max(50),
    customParameter: yup.string().max(50).nullable(true),
    sportId: yup.number().integer().required().oneOf(sportIds),
    dayId: yup
      .number()
      .integer()
      .positive()
      .oneOf([...dayIds, null])
      .nullable(true),
    areaId: yup
      .number()
      .integer()
      .positive()
      .oneOf([...areaIds, null])
      .nullable(true),
  });
