import { Modal } from 'src/shared/design-system/organisms';
import PropTypes from 'prop-types';
import ConfirmPasswordResetForm from './ConfirmPasswordResetForm';
import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useToast } from 'src/shared/design-system';

const CONFIRM_PASSWORD_RESET_MUTATION = gql`
  mutation passwordReset($email: String!, $code: String!, $password: String!) {
    passwordReset(email: $email, code: $code, password: $password)
  }
`;

export const ConfirmPasswordResetModal = ({
  isOpen,
  onClose,
  onOpen,
  email,
}) => {
  const { toastFn } = useToast();

  const [confirmReset] = useMutation(CONFIRM_PASSWORD_RESET_MUTATION, {
    onCompleted: () => {
      toastFn({
        title: 'Password was reseted successfully. You can log in!',
        status: 'success',
      });
      onClose();
    },
    onError: ({ message }) => {
      toastFn({
        title: message,
        status: 'error',
      });
    },
  });

  const onSubmit = useCallback(
    async (variables) => {
      await confirmReset({ variables });
    },
    [confirmReset]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      title="Reset password"
      modalBody={
        <ConfirmPasswordResetForm email={email.current} onSubmit={onSubmit} />
      }
      headerText="Reset password"
      modalProps={{
        size: 'xl',
      }}
    />
  );
};

export default ConfirmPasswordResetModal;

ConfirmPasswordResetModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  email: PropTypes.object.isRequired,
};
