import PropTypes from 'prop-types';
import { Form } from 'src/shared/react-hook-form/organisms';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Flex } from 'src/shared/design-system';
import {
  FormInput,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';
import { useFormContext, useWatch } from 'react-hook-form';

const defaultValues = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
};

const USERNAME_LENGTH_MESSAGE =
  'Length of your username must be between 4 and 16 characters';

const PASSWORD_LENGTH_MESSAGE =
  'Length of your password must be between 6 and 32 characters';

const PASSWORD_MISMATCH_MESSAGE = 'Your passwords do not match';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Please fill in your desired username')
    .min(4, USERNAME_LENGTH_MESSAGE)
    .max(16, USERNAME_LENGTH_MESSAGE),
  email: yup
    .string()
    .email('Enter a valid email address')
    .required('Please fill in your email'),
  password: yup
    .string()
    .required('Please fill in your password')
    .min(6, PASSWORD_LENGTH_MESSAGE)
    .max(32, PASSWORD_LENGTH_MESSAGE),
  repeatPassword: yup
    .string()
    .required('Please fill in your password again')
    .oneOf([yup.ref('password')], PASSWORD_MISMATCH_MESSAGE),
});

const SignUpForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    defaultValues={defaultValues}
    resolver={yupResolver(validationSchema)}
    mode="onBlur"
  >
    <SignUp />
  </Form>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const SignUp = () => {
  const repeatPassword = useWatch({ name: 'repeatPassword' });
  const { trigger } = useFormContext();

  return (
    <Flex flexDir="column" gap={4} pb={4}>
      <FormInput
        name="username"
        label="Username"
        helperText="Select your desired username. Username must not be already in use"
      />
      <FormInput
        name="email"
        label="Email"
        helperText="Fill in your email. Email must not be already in use"
        type="email"
      />
      <FormInput
        name="password"
        label="Password"
        helperText="Choose your password. The length should be between 6 and 32 characters"
        type="password"
        onChange={async () => {
          if (repeatPassword !== '') {
            await trigger('repeatPassword');
          }
        }}
      />
      <FormInput name="repeatPassword" label="Password again" type="password" />
      <FormSubmitButton title="Sign Up" showAlert />
    </Flex>
  );
};

export default SignUpForm;
