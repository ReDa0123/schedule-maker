import FormSubmitButton from 'src/shared/react-hook-form/molecules/FormSubmitButton';
import { FormInput } from 'src/shared/react-hook-form/molecules';
import { Form } from 'src/shared/react-hook-form/organisms';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { VStack } from 'src/shared/design-system';

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
      mode="onChange"
    >
      <VStack gap={4}>
        <FormInput
          label="Email address"
          name={'email'}
          placeholder="Enter your email address"
        />
        <FormSubmitButton title={'Request password reset'} />
      </VStack>
    </Form>
  );
};

export default ResetPasswordForm;

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
