import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { MINUTES_IN_BLOCK } from '../constants';
import { Box } from 'src/shared/design-system/atoms';
import { Timeslot } from '../atoms';

const AreaColumn = ({
  area: { areaId, name },
  startTime,
  endTime,
  dayId,
  useBlocksInArea,
}) => {
  const { blocksInArea, startTimesInThisDayAndArena } = useBlocksInArea()({
    dayId,
    areaId,
    startTime,
  });
  const [timeslots, setTimeslots] = useState([]);

  useEffect(() => {
    const timeslots = [];
    for (let i = startTime; i < endTime; i += MINUTES_IN_BLOCK) {
      timeslots.push(i);
    }
    setTimeslots(timeslots);
  }, [startTime, endTime]);

  return (
    <Box
      minW="220px"
      borderRightColor="black"
      borderRightWidth="1px"
      position="relative"
    >
      {blocksInArea}
      <Box
        h="20px"
        textAlign="center"
        borderBottomColor="black"
        borderBottomWidth="1px"
      >
        {name}
      </Box>
      <Box>
        {timeslots.map((timeslot) => (
          <Timeslot
            key={timeslot}
            timeslot={timeslot}
            dayId={dayId}
            areaId={areaId}
            dayEnd={endTime}
            startTimesInThisDayAndArena={startTimesInThisDayAndArena}
          />
        ))}
      </Box>
    </Box>
  );
};

AreaColumn.propTypes = {
  area: PropTypes.object.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  dayId: PropTypes.number.isRequired,
  useBlocksInArea: PropTypes.func.isRequired,
};

export default AreaColumn;
