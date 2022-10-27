import { useTournamentSchedule } from '../hooks';
import { Box, Flex, Heading } from 'src/shared/design-system';
import PropTypes from 'prop-types';
import {
  AreaColumnDetail,
  AreaColumnEdit,
  ScheduleTimeColumn,
} from '../molecules';
import { useMemo } from 'react';

const Schedule = ({ dayId, date, description, startTime, endTime }) => {
  const { areas, detailMode } = useTournamentSchedule();
  const ColumnToRender = useMemo(
    () => (detailMode ? AreaColumnDetail : AreaColumnEdit),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [detailMode]
  );
  return (
    <Box w="100%">
      <Heading fontSize={24} mt={4}>
        {date} - {description}
      </Heading>
      <Flex
        w="100%"
        overflow="auto"
        borderWidth="3px"
        borderColor="blue.500"
        mt={4}
        paddingBlock={6}
        paddingRight={10}
        borderRadius="xl"
      >
        <ScheduleTimeColumn startTime={startTime} endTime={endTime} />
        {areas.map((area) => (
          <ColumnToRender
            key={area.areaId}
            area={area}
            startTime={startTime}
            endTime={endTime}
            dayId={dayId}
          />
        ))}
      </Flex>
    </Box>
  );
};

Schedule.propTypes = {
  dayId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
};

export default Schedule;
