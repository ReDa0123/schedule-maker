import PropTypes from 'prop-types';
import { calculateDuration } from '../utils/blocks';
import { Box, Flex, WithTooltip } from 'src/shared/design-system';
import { useDrag } from 'react-dnd';
import {
  BLOCK_DND_NAME,
  BLOCK_OFFSET,
  BLOCK_SCALE,
  MINUTES_IN_BLOCK,
} from '../constants';
import { PersonsTag, TimeTag, ResetBlockButton } from '../atoms';
import { DeleteBlockButton, EditBlockButton } from './';
import {
  useBlockWarning,
  useFieldArrayProps,
  useTournamentSchedule,
} from '../hooks';
import { useMemo } from 'react';
import { propEq } from 'ramda';
import { RiErrorWarningFill as WarningIcon } from 'react-icons/ri';

const Block = ({ value, onChange, index, ...props }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: BLOCK_DND_NAME,
    item: { onChange, value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const {
    sports,
    detailMode,
    tournament: { buffer },
  } = useTournamentSchedule();
  const fieldArrayProps = useFieldArrayProps();
  const warning = useBlockWarning(index);
  const sportsName = useMemo(
    () => sports.find(propEq('sportId', value.sportId))?.name,
    [sports, value]
  );
  const blockDuration = calculateDuration(value, buffer);

  return (
    <>
      <Box ref={preview} />
      <Box
        h={`${
          (blockDuration / MINUTES_IN_BLOCK) * BLOCK_SCALE - BLOCK_OFFSET * 2
        }px`}
        w={{ md: '275px', base: '200px' }}
        borderWidth={2}
        borderColor={warning ? 'yellow.500' : 'blue.500'}
        p={2}
        bg="orange.100"
        position="relative"
        zIndex={20}
        ref={detailMode ? null : drag}
        opacity={isDragging ? 0.4 : 1}
        flexShrink={0}
        borderRadius="md"
        boxShadow="lg"
        cursor="grab"
        pointerEvents={isDragging ? 'none' : 'all'}
        {...props}
      >
        {warning && (
          <>
            <Box
              position="absolute"
              top="-15px"
              left="-15px"
              cursor="auto"
              bg="white"
              w={7}
              h={7}
              borderRadius="full"
            />
            <WithTooltip
              standalone
              icon={WarningIcon}
              label={
                'Take notice: There is another colliding block in this day in another area with the same age group, sex group and custom parameter.'
              }
              position="absolute"
              top="-15px"
              left="-15px"
              cursor="auto"
              iconProps={{ color: 'yellow.500', width: 7, height: 7 }}
            />
          </>
        )}
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
            <EditBlockButton
              editBlock={(data) => onChange({ ...value, ...data })}
              block={value}
            />
            <DeleteBlockButton
              deleteBlock={() => fieldArrayProps.remove(index)}
              sportsName={sportsName}
              age={value.age}
            />
          </>
        )}
        <Flex gap={2}>
          <TimeTag time={Math.round(blockDuration * 10) / 10} />
          <PersonsTag numberOfPersons={value.persons} sex={value.sex} />
        </Flex>
        <Box color="blue.500" fontWeight="500">
          {blockDuration >= 10 && (
            <Box overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              {sportsName} - {value.age}
            </Box>
          )}
          {blockDuration >= 15 && (
            <Box overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              {value.category}
              {value.customParameter
                ? `${value.category ? ' - ' : ''}${value.customParameter}`
                : ''}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

Block.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  index: PropTypes.number,
  error: PropTypes.string,
};

export default Block;
