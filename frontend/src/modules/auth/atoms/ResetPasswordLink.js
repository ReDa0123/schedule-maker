import { Link, useDisclosure } from 'src/shared/design-system';
import ResetPasswordModal from '../organisms/ResetPasswordModal';

const ResetPasswordLink = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Link color="gray.500" onClick={onOpen}>
        I forgot my password
      </Link>
      <ResetPasswordModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default ResetPasswordLink;
