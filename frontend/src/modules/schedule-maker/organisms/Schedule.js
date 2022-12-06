import { useScheduleDisplayMode, useTournamentSchedule } from '../hooks';
import { Box, Flex } from 'src/shared/design-system';
import PropTypes from 'prop-types';
import {
  AreaColumnDetail,
  AreaColumnEdit,
  ScheduleTimeColumn,
} from '../molecules';
import { useMemo } from 'react';
import { DayResetButton } from '../organisms';
import { isNilOrEmpty } from 'ramda-extension';
import { Text } from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';
import { SCHEDULE_DETAILED_DISPLAY } from '../constants';

const Schedule = ({ dayId, startTime, endTime }) => {
  const { displayMode } = useScheduleDisplayMode();
  const {
    areas,
    detailMode,
    tournament: { tournamentId },
  } = useTournamentSchedule();
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
        {displayMode === SCHEDULE_DETAILED_DISPLAY && (
          <ScheduleTimeColumn startTime={startTime} endTime={endTime} />
        )}
        {isNilOrEmpty(areas) ? (
          <Box w="100%" textAlign="center">
            There are no areas in this tournament yet.
            {!detailMode && (
              <Text as="span">
                {' '}
                You can add them{' '}
                <RouterLink to={route.tournamentCreator({ id: tournamentId })}>
                  here
                </RouterLink>
                .
              </Text>
            )}
          </Box>
        ) : (
          areas.map((area) => (
            <ColumnToRender
              key={area.areaId}
              area={area}
              startTime={startTime}
              endTime={endTime}
              dayId={dayId}
            />
          ))
        )}
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
