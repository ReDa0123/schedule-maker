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
      const remainder = startTime % 5;
      const isDivisibleBy15 = (i - remainder) % 15 === 0;
      times.push({
        formattedTime: minutesToTime(i),
        shouldDisplayTime: isDivisibleBy15,
      });
    }
    setTimes(times);
  }, [startTime, endTime]);

  return (
    <Box
      pt={`${TABLE_TOP_PADDING}px`}
      paddingInline={{ md: 14, base: 4 }}
      borderRightWidth="2px"
      borderRightColor="blue.500"
      flexShrink={0}
    >
      {times.map(({ formattedTime, shouldDisplayTime }) => (
        <Box
          key={formattedTime}
          h={`${BLOCK_SCALE}px`}
          fontSize={`${BLOCK_SCALE - 16}px`}
          textAlign="center"
          position="relative"
          top={`-${BLOCK_SCALE - 20}px`}
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
