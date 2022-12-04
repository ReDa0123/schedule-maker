import { Modal } from 'src/shared/design-system/organisms';
import ResetPasswordForm from './ResetPasswordForm';
import { useCallback, useRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useToast } from 'src/shared/design-system';
import { useDisclosure } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ConfirmPasswordResetModal from './ConfirmPasswordResetModal';

const REQUEST_RESET_MUTATION = gql`
  mutation requestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;
const ResetPasswordModal = ({ isOpen, onClose, onOpen }) => {
  const { toastFn } = useToast();
  const emailRef = useRef('');

  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const [requestReset] = useMutation(REQUEST_RESET_MUTATION, {
    onCompleted: () => {
      toastFn({
        title: 'Password reset requested successfully',
        description:
          'Email with password reset code was sent to given email address',
        status: 'success',
      });
      onClose();
      onConfirmOpen();
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
      emailRef.current = variables.email;
      await requestReset({ variables });
    },
    [requestReset]
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={() => {
          onOpen();
        }}
        title="Reset password"
        modalBody={<ResetPasswordForm onSubmit={onSubmit} />}
        headerText="Reset password"
        modalProps={{
          size: 'xl',
        }}
      />
      <ConfirmPasswordResetModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        onOpen={onConfirmOpen}
        email={emailRef}
      />
    </>
  );
};

export default ResetPasswordModal;

ResetPasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};
