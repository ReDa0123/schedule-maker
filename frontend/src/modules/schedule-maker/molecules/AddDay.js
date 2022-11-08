import { IconButton, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { AddDayModal } from '../organisms';
import { forwardRef } from 'react';

const AddDay = forwardRef((props, ref) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <IconButton
        variant="outline"
        aria-label="Add day"
        icon={<AddIcon />}
        bg="none"
        color="blue.500"
        marginY="auto"
        ml={4}
        ref={ref}
        {...props}
        onClick={onOpen}
        type="submit"
      />
      <AddDayModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
});

export default AddDay;
