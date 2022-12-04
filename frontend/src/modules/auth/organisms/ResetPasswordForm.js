import FormSubmitButton from '../../../shared/react-hook-form/molecules/FormSubmitButton';
import { FormInput } from '../../../shared/react-hook-form/molecules';
import { Form } from '../../../shared/react-hook-form/organisms';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('You have to enter valid email address!')
    .required('You have to enter email address!'),
});

const ResetPasswordForm = ({ onSubmit }) => {
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        email: '',
      }}
      resolver={yupResolver(validationSchema)}
    >
      <FormInput
        label="Email address"
        name={'email'}
        placeholder="Enter your email address"
      />
      <FormSubmitButton title={'Reset password'} />
    </Form>
  );
};

export default ResetPasswordForm;
