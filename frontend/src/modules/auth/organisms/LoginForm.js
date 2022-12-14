import { Form } from 'src/shared/react-hook-form/organisms';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Flex } from 'src/shared/design-system';
import {
  FormInput,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';
import PropTypes from 'prop-types';
import ResetPasswordLink from '../atoms/ResetPasswordLink';

const defaultValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email address')
    .required('Please fill in your email'),
  password: yup.string().required('Please fill in your password'),
});

const LoginForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    defaultValues={defaultValues}
    resolver={yupResolver(validationSchema)}
    mode="onChange"
  >
    <Flex flexDir="column" gap={4} pb={4}>
      <FormInput
        name="email"
        label="Email"
        helperText="Fill in your e-mail address"
        type="email"
      />
      <FormInput
        name="password"
        label="Password"
        helperText="Fill in your password"
        type="password"
      />
      <ResetPasswordLink />
      <FormSubmitButton title="Login" showAlert />
    </Flex>
  </Form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
