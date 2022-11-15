import { Button } from 'src/shared/design-system';
import CreateNewTournamentModal from '../organisms/CreateNewTournamentModal';
import { useDisclosure } from '@chakra-ui/react';
import { useAuth } from '../../auth';

const CreateNewButton = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    user && (
      <>
        <Button onClick={onOpen}>Create new</Button>
        <CreateNewTournamentModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      </>
    )
  );
};

export default CreateNewButton;
