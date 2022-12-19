import { useDrop } from 'react-dnd';
import { BLOCK_DND_NAME } from '../constants';
import { useEditBlocksInArea } from '../hooks';
import { Flex } from 'src/shared/design-system';
import PropTypes from 'prop-types';

const FlexibleColumn = ({ dayId, areaId }) => {
  const { blocksInArea, lastOrderIndexInThisDayAndArena } = useEditBlocksInArea(
    { dayId, areaId, orderBy: 'orderIndex' }
  );

  const [{ isOver }, drop] = useDrop({
    accept: BLOCK_DND_NAME,
    drop: ({ onChange, value }) => {
      if (
        value.orderIndex === null ||
        value.dayId !== dayId ||
        value.areaId !== areaId
      ) {
        onChange({
          ...value,
          areaId,
          dayId,
          orderIndex: lastOrderIndexInThisDayAndArena + 1,
          startTime: null,
        });
      }
    },
    canDrop: () => isOver,
    collect: (monitor) => ({
      isOver: !!monitor.isOver({
        shallow: true,
      }),
    }),
  });

  return (
    <Flex
      ref={drop}
      bg={isOver ? 'green.500' : 'white'}
      h="calc(100% - 50px)"
      w="100%"
      direction="column"
      align="center"
      justify="flex-start"
      gap={1}
    >
      {blocksInArea}
    </Flex>
  );
};

FlexibleColumn.propTypes = {
  dayId: PropTypes.number.isRequired,
  areaId: PropTypes.number.isRequired,
};

export default FlexibleColumn;
