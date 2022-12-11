import { IconButton } from 'src/shared/design-system';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { NotAssignedBlocksTag } from '../atoms';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

const NotAssignedBlocksButton = ({ numberOfBlocks, setOpen, open }) => {
  const [, drop] = useDrop({
    accept: 'block',
    canDrop: () => false,
    hover: () => setOpen(true),
  });
  return (
    <>
      <IconButton
        aria-label="open-close-not-assigned"
        icon={open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        colorScheme="blue"
        onClick={() => setOpen((prev) => !prev)}
        h="100px"
        borderBottomLeftRadius="none"
        borderTopLeftRadius="none"
        ref={drop}
      />
      <NotAssignedBlocksTag value={numberOfBlocks} />
    </>
  );
};

NotAssignedBlocksButton.propTypes = {
  numberOfBlocks: PropTypes.number.isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default NotAssignedBlocksButton;
