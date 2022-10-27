import { ScheduleDetailContext } from '../contexts';
import { BlockFilter } from '../molecules';
import { useTournamentSchedule } from '../hooks';
import { Schedule } from './';
import ContentBox from '../../../shared/design-system/atoms/ContentBox';

const ScheduleDetail = () => {
  const { days } = useTournamentSchedule();
  return (
    <ScheduleDetailContext>
      <ContentBox>
        <BlockFilter />
      </ContentBox>
      <ContentBox minW="70%">
        {days.map(({ dayId, date, description, startTime, endTime }) => (
          <Schedule
            key={dayId}
            dayId={dayId}
            date={date}
            description={description}
            startTime={startTime}
            endTime={endTime}
          />
        ))}
      </ContentBox>
    </ScheduleDetailContext>
  );
};

export default ScheduleDetail;
