import PropTypes from 'prop-types';
import { calculateDuration } from '../utils/blocks';
import { Box } from 'src/shared/design-system';
import { useDrag } from 'react-dnd';
import { BLOCK_DND_NAME, BLOCK_SCALE, MINUTES_IN_BLOCK } from '../constants';

const Block = ({ value, onChange, ...props }) => {
  const [{ isDragging }, drag] = useDrag({
    type: BLOCK_DND_NAME,
    item: { onChange, value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <Box
      h={`${(calculateDuration(value) / MINUTES_IN_BLOCK) * BLOCK_SCALE}px`}
      w="200px"
      borderWidth={1}
      borderColor="black"
      p={1}
      bg={'red.500'}
      position={'relative'}
      zIndex={isDragging ? -1 : 20}
      ref={drag}
      opacity={isDragging ? 0.5 : 1}
      {...props}
    >
      {`${value.category}`}
    </Box>
  );
};

Block.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Block;
