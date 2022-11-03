import { Form } from 'src/shared/react-hook-form/organisms';
import {
  FormInput,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';

const DateSelection = () => {
  return (
    <Form onSubmit={(data) => alert(JSON.stringify(data))}>
      <FormInput name={'Date'} label={'Date'} type="date" />
      <FormSubmitButton name={'AddDate'} title={'Add'} />
    </Form>
  );
};

export default DateSelection;
