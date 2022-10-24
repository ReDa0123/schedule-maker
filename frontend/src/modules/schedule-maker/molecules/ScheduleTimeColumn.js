import { useEffect, useState } from 'react';
import { minutesToTime } from '../utils/blocks';
import { Box } from 'src/shared/design-system';
import { BLOCK_SCALE, MINUTES_IN_BLOCK, TABLE_TOP_PADDING } from '../constants';
import PropTypes from 'prop-types';

const ScheduleTimeColumn = ({ startTime, endTime }) => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const times = [];
    for (let i = startTime; i < endTime; i += MINUTES_IN_BLOCK) {
      const isDivisibleBy15 = i % 15 === 0;
      times.push({
        formattedTime: minutesToTime(i),
        shouldDisplayTime: i === startTime || i === endTime || isDivisibleBy15,
      });
    }
    setTimes(times);
  }, [startTime, endTime]);

  return (
    <Box
      minW="120px"
      pt={`${TABLE_TOP_PADDING}px`}
      borderRightColor="black"
      borderRightWidth="1px"
    >
      {times.map(({ formattedTime, shouldDisplayTime }) => (
        <Box
          key={formattedTime}
          h={`${BLOCK_SCALE}px`}
          fontSize={`${BLOCK_SCALE - 5}px`}
          textAlign="center"
          position="relative"
          top={`-${BLOCK_SCALE - 7}px`}
        >
          {shouldDisplayTime ? formattedTime : ''}
        </Box>
      ))}
    </Box>
  );
};

ScheduleTimeColumn.propTypes = {
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
};

export default ScheduleTimeColumn;
