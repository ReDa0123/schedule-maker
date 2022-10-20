import { useDisclosure } from 'src/shared/design-system/hooks';
import { Box, Button } from 'src/shared/design-system';
import { Modal } from 'src/shared/design-system/organisms';

export const ModalExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={() => {
          alert('CLOSE');
          onClose();
        }}
        headerText="Text"
        modalBody={<Box>Text</Box>}
        footerContent={<Button onClick={onClose}>Close</Button>}
      />
    </>
  );
};
