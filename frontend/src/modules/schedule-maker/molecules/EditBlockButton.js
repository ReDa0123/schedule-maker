import { WithTooltip } from 'src/shared/design-system/molecules';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { EditBlockModal } from '../organisms';

const EditBlockButton = ({ editBlock, block }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <WithTooltip label={'Edit block'}>
        <EditIcon
          position="absolute"
          top={2}
          right={7}
          boxSize={3}
          color="gray.500"
          focusable
          cursor="pointer"
          onClick={onOpen}
        />
      </WithTooltip>
      <EditBlockModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        editBlock={(data) => {
          editBlock(data);
          onClose();
          toast({
            title: 'Block edited',
            duration: 2000,
            status: 'success',
            isClosable: true,
            position: 'top-right',
          });
        }}
        block={block}
      />
    </>
  );
};

EditBlockButton.propTypes = {
  editBlock: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
};

export default EditBlockButton;
