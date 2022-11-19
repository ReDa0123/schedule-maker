import { Form } from 'src/shared/react-hook-form/organisms';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  FormInput,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Grid } from '@chakra-ui/react';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter tournament name')
    .max(50, 'Tournament name must be less than 50 characters'),
  location: yup
    .string()
    .required('Please enter tournament location')
    .max(50, 'Tournament name must be less than 20 characters'),
  startDate: yup
    .date()
    .required('Please enter tournament start date')
    .test({
      name: 'startDate-before-endDate',
      message: 'Start date must be before end date',
      test: (value, ctx) =>
        isNaN(ctx.parent.endDate) ? true : value <= ctx.parent.endDate,
    }),
  endDate: yup
    .date()
    .required('Please enter tournament end date')
    .test({
      name: 'endDate-after-startDate',
      message: 'End date must be after start date',
      test: (value, ctx) =>
        isNaN(ctx.parent.startDate) ? true : value >= ctx.parent.startDate,
    }),
});

const BasicTournamentForm = ({ onSubmit, defaultValues }) => {
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        name: defaultValues?.name || '',
        location: defaultValues?.location || '',
        startDate: defaultValues?.startDate || '',
        endDate: defaultValues?.endDate || '',
      }}
      resolver={yupResolver(validationSchema)}
      mode="onChange"
    >
      <Grid
        templateColumns={{
          base: '1fr',
          sm: '250px 250px',
        }}
        gap={4}
      >
        <FormInput name={'name'} label={'Tournament name'} />
        <FormInput name={'location'} label={'Location'} />
        <FormInput name={'startDate'} label={'Start date'} type={'date'} />
        <FormInput name={'endDate'} label={'End date'} type={'date'} />
        <FormSubmitButton title={'Save'} showAlert />
      </Grid>
    </Form>
  );
};

BasicTournamentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
};

export default BasicTournamentForm;
