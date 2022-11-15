import * as yup from 'yup';

export const newTournamentValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Tournament name missing')
    .min(3, 'Tournament name must be at least 3 characters long')
    .max(50, 'Tournament name must be less than 50 characters'),
  location: yup
    .string()
    .required('Tournament location missing')
    .min(3, 'Tournament location must be at least 3 characters long')
    .max(20, 'Tournament name must be less than 20 characters'),
  startDate: yup.date().required('Tournament start date is missing'),
  endDate: yup.date().required('Tournament end date is missing'),
});
