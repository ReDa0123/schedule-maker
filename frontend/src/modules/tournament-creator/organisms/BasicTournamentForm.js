import { Form } from 'src/shared/react-hook-form/organisms';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  FormInput,
  FormSelect,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Grid } from '@chakra-ui/react';
import { tournamentStyles } from '../../schedule-maker/constants';
import { convertValuesToLabelValueObj } from 'src/shared/utils';

const bufferOptions = ['0.0', '0.01', '0.05', '0.1', '0.25', '0.5'];
const bufferOptionsNumber = bufferOptions.map((value) => parseFloat(value));

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
    .typeError('Please enter tournament start date')
    .test({
      name: 'startDate-before-endDate',
      message: 'Start date must be before end date',
      test: (value, ctx) =>
        isNaN(ctx.parent.endDate) ? true : value <= ctx.parent.endDate,
    }),
  endDate: yup
    .date()
    .required('Please enter tournament end date')
    .typeError('Please enter tournament end date')
    .test({
      name: 'endDate-after-startDate',
      message: 'End date must be after start date',
      test: (value, ctx) =>
        isNaN(ctx.parent.startDate) ? true : value >= ctx.parent.startDate,
    }),
  preferredStyle: yup
    .string()
    .max(50)
    .oneOf([...tournamentStyles, '']),
  buffer: yup.mixed().oneOf([...bufferOptions, ...bufferOptionsNumber, '']),
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
        preferredStyle: defaultValues?.preferredStyle || '',
        buffer: defaultValues?.buffer || '0.0',
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
        {defaultValues && (
          <>
            <FormSelect
              name={'buffer'}
              label={'Buffer'}
              options={bufferOptions.map((value) => ({
                value: value,
                label: (value * 100).toString() + '%',
              }))}
              createEmptyOption={false}
            />
            <FormSelect
              name="preferredStyle"
              label={'Preferred style'}
              options={convertValuesToLabelValueObj()(tournamentStyles)}
            />
          </>
        )}
        <FormSubmitButton title={'Save'} showAlert />
      </Grid>
    </Form>
  );
};

BasicTournamentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  tournament: PropTypes.object,
};

export default BasicTournamentForm;
