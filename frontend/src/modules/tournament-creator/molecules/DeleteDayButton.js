import { IconButton, useDisclosure } from 'src/shared/design-system';
import { CloseIcon } from '@chakra-ui/icons';
import { AlertDialog } from 'src/shared/design-system/organisms';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const DeleteDayButton = forwardRef(({ dayId, deleteDay, ...props }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label={'Delete'}
        icon={<CloseIcon />}
        colorScheme="red"
        ref={ref}
        {...props}
        onClick={onOpen}
      />
      <AlertDialog
        onClose={onClose}
        isOpen={isOpen}
        onConfirm={() => deleteDay({ variables: { dayId } })}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        headerText="Delete Day"
        bodyText="Are you sure you want to delete this day? All blocks assigned to this day will be unassigned."
        confirmButtonProps={{ colorScheme: 'red' }}
      />
    </>
  );
});

DeleteDayButton.propTypes = {
  dayId: PropTypes.number.isRequired,
  deleteDay: PropTypes.func.isRequired,
};

export default DeleteDayButton;
