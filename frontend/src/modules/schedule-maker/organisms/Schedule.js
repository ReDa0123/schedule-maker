import {
  useEditBlocksInArea,
  useTournamentSchedule,
  useDetailBlocksInArea,
} from '../hooks';
import { Flex, Heading } from 'src/shared/design-system/atoms';
import PropTypes from 'prop-types';
import { AreaColumn, ScheduleTimeColumn } from '../molecules';
import { useMemo } from 'react';

const Schedule = ({ dayId, date, description, startTime, endTime }) => {
  const { areas, detailMode } = useTournamentSchedule();
  const useBlocksInArea = () =>
    useMemo(
      () => (detailMode ? useDetailBlocksInArea : useEditBlocksInArea),
      //eslint-disable-next-line react-hooks/exhaustive-deps
      [detailMode]
    );
  return (
    <>
      <Heading>
        {date} - {description}
      </Heading>
      <Flex
        w="100%"
        maxW="100%"
        overflow="auto"
        borderWidth="1px"
        borderColor="black"
        mt={4}
        paddingBlock={2}
      >
        <ScheduleTimeColumn startTime={startTime} endTime={endTime} />
        {areas.map((area) => (
          <AreaColumn
            key={area.areaId}
            area={area}
            startTime={startTime}
            endTime={endTime}
            dayId={dayId}
            useBlocksInArea={useBlocksInArea}
          />
        ))}
      </Flex>
    </>
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
