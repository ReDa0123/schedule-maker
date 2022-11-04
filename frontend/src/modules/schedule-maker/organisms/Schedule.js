import { useTournamentSchedule } from '../hooks';
import { Box, Flex } from 'src/shared/design-system';
import PropTypes from 'prop-types';
import {
  AreaColumnDetail,
  AreaColumnEdit,
  ScheduleTimeColumn,
} from '../molecules';
import { useMemo } from 'react';
import { DayResetButton } from '../organisms';

const Schedule = ({ dayId, startTime, endTime }) => {
  const { areas, detailMode } = useTournamentSchedule();
  const ColumnToRender = useMemo(
    () => (detailMode ? AreaColumnDetail : AreaColumnEdit),
    [detailMode]
  );
  return (
    <Box w="100%">
      <Flex
        w="100%"
        overflow="auto"
        borderWidth="3px"
        borderColor="blue.500"
        mt={4}
        paddingBlock={6}
        paddingRight={10}
        borderRadius="xl"
        position="relative"
      >
        {!detailMode && <DayResetButton dayId={dayId} />}
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
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
};

export default Schedule;
