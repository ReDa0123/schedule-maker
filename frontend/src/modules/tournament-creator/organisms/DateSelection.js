import { Form } from 'src/shared/react-hook-form/organisms';
import {
  FormInput,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';
import { Stack } from 'src/shared/design-system';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultValues = {
  Day: '',
  startTime: '',
  endTime: '',
  description: '',
};

const validationSchema = yup.object().shape({
  Day: yup.date().required('Please enter valid date'),
  startTime: yup.string().matches(/\d\d:\d\d/, 'Please enter start time'),
  endTime: yup.string().matches(/\d\d:\d\d/, 'Please enter End Times'),
});

const DateSelection = () => {
  return (
    <Form
      onSubmit={(data) => alert(JSON.stringify(data))}
      resolver={yupResolver(validationSchema)}
      defaultValues={defaultValues}
    >
      <Stack direction={{ base: 'column', md: 'row' }}>
        <FormInput name={'Day'} label={'Day'} type="date" />
        <FormInput name={'startTime'} label={'startTime'} type="time" />
        <FormInput name={'endTime'} label={'endTime'} type="time" />
      </Stack>

      <FormInput name={'description'} label={'description'} type="text" />
      <FormSubmitButton title={'Add'} showAlert />
    </Form>
  );
};

export default DateSelection;
