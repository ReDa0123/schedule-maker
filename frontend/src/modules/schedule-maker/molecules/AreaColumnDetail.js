import PropTypes from 'prop-types';
import { Box } from 'src/shared/design-system/atoms';
import { Timeslot } from '../atoms';
import { useAreaColumn, useDetailBlocksInArea } from '../hooks';

const AreaColumnDetail = ({
  area: { areaId, name },
  startTime,
  endTime,
  dayId,
}) => {
  const blocksInArea = useDetailBlocksInArea({
    dayId,
    areaId,
    startTime,
  });

  const timeslots = useAreaColumn({ startTime, endTime });
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
          />
        ))}
      </Box>
    </Box>
  );
};

AreaColumnDetail.propTypes = {
  area: PropTypes.object.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  dayId: PropTypes.number.isRequired,
};

export default AreaColumnDetail;
