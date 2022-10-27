import { CloseIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const DeleteBlockButton = ({ deleteBlock }) => (
  <CloseIcon
    position="absolute"
    top={2}
    right={2}
    boxSize={3}
    color="red.500"
    focusable
    cursor="pointer"
    onClick={deleteBlock}
  >
    X{' '}
  </CloseIcon>
);

DeleteBlockButton.propTypes = {
  deleteBlock: PropTypes.func.isRequired,
};

export default DeleteBlockButton;
