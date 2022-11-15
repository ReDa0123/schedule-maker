import { Box, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormInput,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';
import * as yup from 'yup';
import { Form } from '../../../shared/react-hook-form/organisms';
import PropTypes from 'prop-types';

const defaultValues = {
  tournamentName: '',
  tournamentLocation: '',
  startDate: '',
  endDate: '',
};

const validationSchema = yup.object().shape({
  tournamentName: yup
    .string()
    .required('Please enter tournament name')
    .max(50, 'Tournament name must be less than 50 characters'),
  tournamentLocation: yup
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

const CreateNewTournamentForm = ({ onSubmit }) => {
  return (
    <Box>
      <Form
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={yupResolver(validationSchema)}
        mode="onBlur"
      >
        <VStack>
          <FormInput
            name={'tournamentName'}
            label={'Tournament name'}
            type="text"
          />
          <FormInput
            name={'tournamentLocation'}
            label={'Tournament location'}
            type="text"
          />
          <FormInput name={'startDate'} label={'Start date'} type="date" />
          <FormInput name={'endDate'} label={'End date'} type="date" />
          <FormSubmitButton title="Create" mt="10px" />
        </VStack>
      </Form>
    </Box>
  );
};

CreateNewTournamentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateNewTournamentForm;
