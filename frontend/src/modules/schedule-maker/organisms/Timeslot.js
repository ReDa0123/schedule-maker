import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIsInViewport } from '../../../shared/hooks';
import { Box } from 'src/shared/design-system';
import { BLOCK_DND_NAME, BLOCK_SCALE } from '../constants';
import { useTournamentSchedule } from '../hooks';
import { calculateEndTime } from '../utils/blocks';
import { between } from 'ramda-extension';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { Block } from '../molecules';

const TimeslotDrop = ({
  timeslot,
  dayEnd,
  dayId,
  areaId,
  startTimesInThisDayAndArena,
  buffer,
}) => {
  const [dropPreview, setDropPreview] = useState(null);
  const onDrop = useCallback(
    ({ onChange, value }) => {
      onChange({
        ...value,
        areaId,
        dayId,
        startTime: timeslot,
        orderIndex: null,
      });
    },
    [areaId, dayId, timeslot]
  );

  const collect = useCallback(
    (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
    []
  );

  const canDropFn = useCallback(
    ({ value: { persons, blockId, style, matchDuration } }) => {
      const endTimeOfDraggedBlock = calculateEndTime(
        {
          startTime: timeslot,
          persons,
          style,
          matchDuration,
        },
        buffer
      );
      const isOverlapping = startTimesInThisDayAndArena.some(
        ({ startTime, endTime, blockId: checkedBlockId }) =>
          (between(startTime, endTime, endTimeOfDraggedBlock - 0.01) ||
            between(timeslot + 0.01, endTimeOfDraggedBlock, endTime)) &&
          blockId !== checkedBlockId
      );
      return endTimeOfDraggedBlock <= dayEnd && !isOverlapping;
    },
    [startTimesInThisDayAndArena, timeslot, dayEnd, buffer]
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: BLOCK_DND_NAME,
    drop: onDrop,
    collect,
    canDrop: canDropFn,
    hover: ({ value }) => {
      setDropPreview(value);
    },
  });

  const bg = useMemo(() => {
    if (!isOver) return 'white';
    if (!canDrop) return 'red.300';
    return 'green.300';
  }, [isOver, canDrop]);

  useEffect(() => {
    if (!isOver) setDropPreview(null);
    const interval = setInterval(() => {
      if (!isOver) {
        setDropPreview(null);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isOver]);

  return (
    <Box ref={drop} bg={bg} h="100%">
      {dropPreview && (
        <Block
          value={dropPreview}
          pointerEvents="none"
          opacity="0.8"
          marginX="auto"
          isDetailedDisplay
        />
      )}
    </Box>
  );
};

const Timeslot = (props) => {
  const { timeslot } = props;
  const {
    detailMode,
    tournament: { buffer },
  } = useTournamentSchedule();
  const refForView = useRef(null);
  const isInView = useIsInViewport(refForView);
  const topBorder = useMemo(() => {
    if (timeslot % 30 === 0)
      return {
        borderTopStyle: 'solid',
        borderTopColor: 'blue.500',
      };
    if (timeslot % 15 === 0)
      return {
        borderTopStyle: 'dashed',
        borderTopColor: 'blue.300',
      };
    return {
      borderTopStyle: 'dotted',
      borderTopColor: 'blue.200',
    };
  }, [timeslot]);

  return (
    <Box
      ref={refForView}
      h={`${BLOCK_SCALE}px`}
      w="100%"
      borderTopWidth="2px"
      {...topBorder}
    >
      {!detailMode && isInView && <TimeslotDrop {...props} buffer={buffer} />}
    </Box>
  );
};

Timeslot.propTypes = {
  timeslot: PropTypes.number.isRequired,
};

TimeslotDrop.propTypes = {
  timeslot: PropTypes.number.isRequired,
  dayEnd: PropTypes.number.isRequired,
  dayId: PropTypes.number.isRequired,
  areaId: PropTypes.number.isRequired,
  startTimesInThisDayAndArena: PropTypes.array.isRequired,
  buffer: PropTypes.number.isRequired,
};

export default memo(Timeslot);
