import { CloseIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { useDisclosure } from 'src/shared/design-system/hooks';
import { AlertDialog } from 'src/shared/design-system/organisms';
import { WithTooltip } from 'src/shared/design-system/molecules';

const DeleteBlockButton = ({ deleteBlock, sportsName, category }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <WithTooltip label="Delete block">
        <CloseIcon
          position="absolute"
          top={2}
          right={2}
          boxSize={3}
          color="red.500"
          focusable
          cursor="pointer"
          onClick={onOpen}
        />
      </WithTooltip>
      <AlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onConfirm={deleteBlock}
        headerText="Do you really want to delete this block?"
        bodyText={`Block "${sportsName} - ${category}" will be deleted.`}
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        confirmButtonProps={{ colorScheme: 'red' }}
      />
    </>
  );
};

DeleteBlockButton.propTypes = {
  deleteBlock: PropTypes.func.isRequired,
  sportsName: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default DeleteBlockButton;
