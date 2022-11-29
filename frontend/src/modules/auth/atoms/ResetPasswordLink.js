import { Link, useDisclosure } from '@chakra-ui/react';
import ResetPasswordModal from '../organisms/ResetPasswordModal';

const ResetPasswordLink = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Link color="gray.500" onClick={onOpen}>
        I forgot my passwerd
      </Link>
      <ResetPasswordModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default ResetPasswordLink;
