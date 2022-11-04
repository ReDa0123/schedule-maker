import PropTypes from 'prop-types';
import { calculateDuration } from '../utils/blocks';
import { Box, Flex } from 'src/shared/design-system';
import { useDrag } from 'react-dnd';
import {
  BLOCK_DND_NAME,
  BLOCK_OFFSET,
  BLOCK_SCALE,
  MINUTES_IN_BLOCK,
} from '../constants';
import { PersonsTag, TimeTag, ResetBlockButton } from '../atoms';
import { DeleteBlockButton } from './index';
import { useFieldArrayProps, useTournamentSchedule } from '../hooks';
import { useMemo } from 'react';
import { propEq } from 'ramda';

const Block = ({ value, onChange, index, ...props }) => {
  const [{ isDragging }, drag] = useDrag({
    type: BLOCK_DND_NAME,
    item: { onChange, value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const { sports, detailMode } = useTournamentSchedule();
  const fieldArrayProps = useFieldArrayProps();
  const sportsName = useMemo(
    () => sports.find(propEq('sportId', value.sportId))?.name,
    [sports, value]
  );

  return (
    <Box
      h={`${
        (calculateDuration(value) / MINUTES_IN_BLOCK) * BLOCK_SCALE -
        BLOCK_OFFSET * 2
      }px`}
      w={{ md: '250px', base: '200px' }}
      borderWidth={2}
      borderColor="blue.500"
      p={2}
      bg="orange.100"
      position="relative"
      zIndex={20}
      ref={detailMode ? null : drag}
      opacity={isDragging ? 0.5 : 1}
      flexShrink={0}
      borderRadius="md"
      boxShadow="lg"
      cursor="grab"
      pointerEvents={isDragging ? 'none' : 'all'}
      {...props}
    >
      {!detailMode && (
        <>
          {value.startTime && (
            <ResetBlockButton
              resetBlock={() =>
                onChange({
                  ...value,
                  arenaId: null,
                  dayId: null,
                  startTime: null,
                })
              }
            />
          )}
          <DeleteBlockButton
            deleteBlock={() => fieldArrayProps.remove(index)}
            sportsName={sportsName}
            category={value.category}
          />
        </>
      )}
      <Flex gap={2}>
        <TimeTag time={calculateDuration(value)} />
        <PersonsTag numberOfPersons={value.persons} sex={value.sex} />
      </Flex>
      <Box
        color="blue.500"
        fontWeight="500"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        <Box>
          {sportsName} - {value.age}
        </Box>
        <Box>
          {value.category}
          {value.customParameter ? ` - ${value.customParameter}` : ''}
        </Box>
      </Box>
    </Box>
  );
};

Block.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  index: PropTypes.number,
};

export default Block;
