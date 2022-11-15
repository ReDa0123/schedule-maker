import { Button } from 'src/shared/design-system';
import CreateNewTournamentModal from '../organisms/CreateNewTournamentModal';
import { useDisclosure } from '@chakra-ui/react';

const CreateNewButton = () => {
  //Modal control hook
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Create new</Button>
      <CreateNewTournamentModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

export default CreateNewButton;
