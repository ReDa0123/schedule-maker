import PropTypes from 'prop-types';
import { Box } from 'src/shared/design-system';
import { Timeslot } from '../organisms';
import { useAreaColumn, useDetailBlocksInArea } from '../hooks';
import { TABLE_TOP_PADDING } from '../constants';

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
      minW={{ md: '320px', base: '220px' }}
      borderRightColor="blue.500"
      borderRightWidth="2px"
      position="relative"
    >
      {blocksInArea}
      <Box h={`${TABLE_TOP_PADDING}px`} textAlign="center" fontWeight="500">
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
