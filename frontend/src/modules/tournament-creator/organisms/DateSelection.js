import { Form } from 'src/shared/react-hook-form/organisms';
import {
  FormInput,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object().shape({
  Date: yup.date().required('Plese enter valid date'),
});

const DateSelection = () => {
  return (
    <Form
      onSubmit={(data) => alert(JSON.stringify(data))}
      resolver={yupResolver(validationSchema)}
    >
      <FormInput name={'Date'} label={'Date'} type="date" />
      <FormSubmitButton name={'AddDate'} title={'Add'} />
    </Form>
  );
};

export default DateSelection;
