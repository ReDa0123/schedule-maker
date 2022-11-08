import { Form } from 'src/shared/react-hook-form/organisms';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  FormInput,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';

import * as yup from 'yup';

const defaultValues = {
  name: '',
  location: '',
  startDate: '',
  endDate: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Please enter tournament name'),
  location: yup.string().required('Please enter location'),
  startDate: yup
    .date()
    .required('Please enter start time')
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
});

const BasicTournamentForm = () => {
  return (
    <Form
      onSubmit={(data) => alert(JSON.stringify(data))}
      defaultValues={defaultValues}
      resolver={yupResolver(validationSchema)}
      mode="onChange"
    >
      <FormInput name={'name'} label={'Tournament name'} />
      <FormInput name={'location'} label={'Location'} />
      <FormInput name={'startDate'} label={'Start date'} type={'date'} />
      <FormInput name={'endDate'} label={'End date'} type={'date'} />
      <FormSubmitButton title={'Save'} showAlert />
    </Form>
  );
};

export default BasicTournamentForm;
