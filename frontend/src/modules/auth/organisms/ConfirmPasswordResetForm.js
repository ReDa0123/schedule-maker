import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from 'src/shared/react-hook-form/molecules';
import { Form } from 'src/shared/react-hook-form/organisms';
import { FormSubmitButton } from 'src/shared/react-hook-form/molecules';
import { VStack } from 'src/shared/design-system';
import PropTypes from 'prop-types';
import { useFormContext, useWatch } from 'react-hook-form';

const PASSWORD_LENGTH_MESSAGE =
  'Length of your password must be between 6 and 32 characters';
const PASSWORD_MISMATCH_MESSAGE = 'Your passwords do not match';
const CODE_LENGTH_MESSAGE = 'The code must be exactly 10 characters long';

const validationSchema = yup.object().shape({
  email: yup.string(),
  code: yup
    .string()
    .required()
    .min(10, CODE_LENGTH_MESSAGE)
    .max(10, CODE_LENGTH_MESSAGE),
  password: yup
    .string()
    .required('Please enter your new password')
    .min(6, PASSWORD_LENGTH_MESSAGE)
    .max(32, PASSWORD_LENGTH_MESSAGE),
  repeatPassword: yup
    .string()
    .required('Please fill in your password again')
    .oneOf([yup.ref('password')], PASSWORD_MISMATCH_MESSAGE),
});

const ResetPasswordForm = ({ onSubmit, email }) => {
  const repeatPassword = useWatch({ name: 'repeatPassword' });
  const { trigger } = useFormContext();
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        email: email,
        code: '',
        password: '',
        repeatPassword: '',
      }}
      resolver={yupResolver(validationSchema)}
      mode="onChange"
    >
      <VStack gap={4}>
        <FormInput
          label="Email address"
          name={'email'}
          placeholder="Enter your email address"
          disabled
        />
        <FormInput
          label="Reset code from email"
          name={'code'}
          placeholder="Enter code that was sent to your email"
        />
        <FormInput
          name="password"
          label="Password"
          helperText="Choose your new password. The length should be between 6 and 16 characters"
          type="password"
          onChange={async () => {
            if (repeatPassword !== '') {
              await trigger('repeatPassword');
            }
          }}
        />
        <FormInput
          name="repeatPassword"
          label="Password again"
          type="password"
        />
        <FormSubmitButton title={'Reset password'} />
      </VStack>
    </Form>
  );
};

export default ResetPasswordForm;

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};
