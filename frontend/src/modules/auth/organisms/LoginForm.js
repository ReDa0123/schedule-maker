import { Form } from 'src/shared/react-hook-form/organisms';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, Flex } from 'src/shared/design-system';
import {
  FormInput,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';
import PropTypes from 'prop-types';

const initialValues = {
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

const LoginForm = ({ onSubmit, errorMessage }) => (
  <Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    resolver={yupResolver(validationSchema)}
    mode="onChange"
  >
    <Flex flexDir="column" gap={4} pb={4}>
      {errorMessage && (
        <Text color="red" fontSize={14} mb={4}>
          {errorMessage}
        </Text>
      )}
      <FormInput
        name="email"
        label="Email"
        helperText="Fill in your e-mail address"
        type="email"
        formControlProps={{ w: '350px' }}
      />
      <FormInput
        name="password"
        label="Password"
        helperText="Fill in your password"
        type="password"
        formControlProps={{ w: '350px' }}
      />
      <FormSubmitButton title="Login" showAlert />
    </Flex>
  </Form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default LoginForm;
