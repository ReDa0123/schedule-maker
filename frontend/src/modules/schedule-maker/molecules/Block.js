import PropTypes from 'prop-types';
import {
  calculateEndTime,
  minutesToTime,
  roundToDecimal,
} from '../utils/blocks';
import { Box, Flex, WithTooltip } from 'src/shared/design-system';
import { useDrag } from 'react-dnd';
import {
  BLOCK_COLORS,
  BLOCK_DND_NAME,
  BLOCK_OFFSET,
  BLOCK_SCALE,
  MINUTES_IN_BLOCK,
} from '../constants';
import { PersonsTag, TimeTag, ResetBlockButton, BlockText } from '../atoms';
import { DeleteBlockButton, EditBlockButton } from './';
import { useBlockDrop, useBlockInfo } from '../hooks';
import { useRef } from 'react';
import { RiErrorWarningFill as WarningIcon } from 'react-icons/ri';
import { isNilOrEmpty } from 'ramda-extension';

const Block = ({ value, onChange, index, isDetailedDisplay, ...props }) => {
  const blockRef = useRef(null);
  const [{ isDragging }, drag, preview] = useDrag({
    type: BLOCK_DND_NAME,
    item: { onChange, value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useBlockDrop(index, value, isDetailedDisplay);
  drag(drop(blockRef));

  const {
    sportsName,
    buffer,
    detailMode,
    fieldArrayProps,
    warning,
    sportIndex,
    blockDuration,
    infoRow1,
    infoRow2,
  } = useBlockInfo(index, value);

  return (
    <>
      <Box ref={preview} />
      <WithTooltip
        label={
          blockDuration >= 15 || !isDetailedDisplay
            ? ''
            : `${infoRow1}${isNilOrEmpty(infoRow2) ? '' : `, ${infoRow2}`}`
        }
      >
        <Box
          h={
            isDetailedDisplay
              ? `${
                  (blockDuration / MINUTES_IN_BLOCK) * BLOCK_SCALE -
                  BLOCK_OFFSET * 2
                }px`
              : '125px'
          }
          w={{ md: '275px', base: '200px' }}
          borderWidth={2}
          borderColor={warning ? 'yellow.500' : 'blue.500'}
          p={2}
          bg={`${BLOCK_COLORS[sportIndex % BLOCK_COLORS.length]}.${
            (Math.floor(sportIndex / BLOCK_COLORS.length) + 1) * 100
          }`}
          position="relative"
          zIndex={20}
          ref={detailMode ? null : blockRef}
          opacity={isDragging ? 0.4 : 1}
          flexShrink={0}
          borderRadius="md"
          boxShadow="lg"
          cursor={detailMode ? 'default' : 'grab'}
          pointerEvents={isDragging ? 'none' : 'all'}
          mt={isOver ? 200 : 0}
          {...props}
          css={{
            '&:after': {
              content: '""',
              position: 'absolute',
              top: isOver ? -210 : -10,
              left: 0,
              width: '100%',
              height: isOver ? 210 : 10,
            },
          }}
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
                      areaId: null,
                      dayId: null,
                      startTime: null,
                      orderIndex: null,
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
            <TimeTag time={roundToDecimal(blockDuration, 2)} />
            <PersonsTag numberOfPersons={value.persons} sex={value.sex} />
          </Flex>
          <Box color="blue.600" fontWeight="500">
            {(blockDuration >= 10 || !isDetailedDisplay) && (
              <BlockText>{infoRow1}</BlockText>
            )}
            {(blockDuration >= 15 || !isDetailedDisplay) && (
              <BlockText>{infoRow2}</BlockText>
            )}
          </Box>
          {!isDetailedDisplay && value.startTime && (
            <Box
              position="absolute"
              bottom="8px"
              left="8px"
              color="blue.700"
              fontSize="md"
            >
              {minutesToTime(value.startTime)} -{' '}
              {minutesToTime(
                roundToDecimal(calculateEndTime(value, buffer), 0)
              )}
            </Box>
          )}
        </Box>
      </WithTooltip>
    </>
  );
};

Block.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  index: PropTypes.number,
  error: PropTypes.string,
  isDetailedDisplay: PropTypes.bool,
};

export default Block;
