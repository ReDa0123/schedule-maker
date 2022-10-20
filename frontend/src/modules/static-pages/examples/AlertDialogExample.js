import { Button } from 'src/shared/design-system';
import { forwardRef } from 'react';
import { useDisclosure } from 'src/shared/design-system/hooks';
import { AlertDialog } from 'src/shared/design-system/organisms';

export const AlertDialogExample = forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button ref={ref} {...props} onClick={onOpen}>
        Open Alert Dialog
      </Button>
      <AlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onConfirm={onClose}
        headerText="Text"
        bodyText="Text"
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        confirmButtonProps={{ colorScheme: 'red' }}
      />
    </>
  );
});
