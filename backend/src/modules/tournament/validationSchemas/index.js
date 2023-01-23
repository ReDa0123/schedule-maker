import * as yup from 'yup';
import { STYLES } from '../../constants';

export const newTournamentValidationSchema = yup.object().shape({
  preferredStyle: yup
    .string()
    .oneOf([...STYLES, null])
    .nullable(),
  name: yup.string().required().max(50),
  location: yup.string().required().max(50),
  startDate: yup
    .date()
    .required()
    .test({
      name: 'startDate-after-endDDate',
      message: 'Start date must be before end date',
      test: (value, ctx) =>
        isNaN(ctx.parent.endDate) ? true : value <= ctx.parent.endDate,
    }),
  endDate: yup
    .date()
    .required('Please enter end time')
    .test({
      name: 'endDate-before-startDate',
      message: 'End date must be after start date',
      test: (value, ctx) =>
        isNaN(ctx.parent.startDate) ? true : value >= ctx.parent.startDate,
    }),
  //TODO isPublic BE validation
});
