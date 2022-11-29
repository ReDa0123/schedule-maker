import { Modal } from '../../../shared/design-system/organisms';
import ResetPasswordForm from './ResetPasswordForm';
import { useCallback } from 'react';
import { convertValuesForSending } from '../../tournaments-list/utils';

const ResetPasswordModal = ({ isOpen, onClose, onOpen }) => {
  const onSubmit = useCallback(async (values) => {
    console.log(values);
  }, []);

  return (
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
  );
};

export default ResetPasswordModal;
