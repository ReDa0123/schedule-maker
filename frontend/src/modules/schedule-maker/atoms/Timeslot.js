import { memo, useCallback, useMemo, useRef } from 'react';
import { useIsInViewport } from '../../../shared/hooks';
import { Box } from 'src/shared/design-system';
import { BLOCK_SCALE } from '../constants';
import { useTournamentSchedule } from '../hooks';
import { calculateEndTime } from '../utils/blocks';
import { between } from 'ramda-extension';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const TimeslotDrop = ({
  timeslot,
  dayEnd,
  dayId,
  areaId,
  startTimesInThisDayAndArena,
}) => {
  const onDrop = useCallback(
    ({ onChange, value }) => {
      onChange({
        ...value,
        areaId,
        dayId: dayId,
        startTime: timeslot,
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
    ({ value: { blockId, players } }) => {
      const endTimeOfDraggedBlock = calculateEndTime({
        startTime: timeslot,
        players,
      });
      const isOverlapping = startTimesInThisDayAndArena.some(
        ({ startTime, endTime, blockId: checkedBlockId }) =>
          (between(startTime, endTime, endTimeOfDraggedBlock - 0.01) ||
            between(timeslot + 0.01, endTimeOfDraggedBlock, endTime)) &&
          blockId !== checkedBlockId
      );
      return endTimeOfDraggedBlock <= dayEnd && !isOverlapping;
    },
    [startTimesInThisDayAndArena, timeslot, dayEnd]
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'block',
    drop: onDrop,
    collect,
    canDrop: canDropFn,
  });

  const bg = useMemo(() => {
    if (!isOver) return 'white';
    if (!canDrop) return 'red.500';
    return 'green.500';
  }, [isOver, canDrop]);

  return <Box ref={drop} bg={bg} h="100%" />;
};

const Timeslot = (props) => {
  const { detailMode } = useTournamentSchedule();
  const refForView = useRef(null);
  const isInView = useIsInViewport(refForView);

  return (
    <Box
      ref={refForView}
      h={`${BLOCK_SCALE}px`}
      w="100%"
      borderWidth={1}
      borderTopColor="gray"
      borderBottomColor="gray"
    >
      {!detailMode && isInView && <TimeslotDrop {...props} />}
    </Box>
  );
};

TimeslotDrop.propTypes = {
  timeslot: PropTypes.number.isRequired,
  dayEnd: PropTypes.number.isRequired,
  dayId: PropTypes.number.isRequired,
  areaId: PropTypes.number.isRequired,
  startTimesInThisDayAndArena: PropTypes.array.isRequired,
};

export default memo(Timeslot);
