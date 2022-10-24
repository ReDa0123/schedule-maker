import { ScheduleDetailContext } from '../contexts';
import { BlockFilter } from '../molecules';
import { useTournamentSchedule } from '../hooks';
import { Schedule } from './';

const ScheduleDetail = () => {
  const { days } = useTournamentSchedule();
  return (
    <ScheduleDetailContext>
      <BlockFilter />
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
    </ScheduleDetailContext>
  );
};

export default ScheduleDetail;
