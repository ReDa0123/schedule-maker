import { Form } from 'src/shared/react-hook-form/organisms';
import { FieldArrayContext } from '../contexts';
import { Box } from 'src/shared/design-system/atoms';
import { useTournamentSchedule } from '../hooks';
import { Schedule } from './';
import { AddBlockForm, NotAssignedBlocks } from '../molecules';
import { SCHEDULE_FORM_NAME } from '../constants';

const ScheduleForm = () => {
  const { days, blocks } = useTournamentSchedule();
  return (
    <Form onSubmit={console.log}>
      <FieldArrayContext name={SCHEDULE_FORM_NAME} initialData={blocks}>
        <Box p={2}>
          <AddBlockForm />
          <NotAssignedBlocks />
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
        </Box>
      </FieldArrayContext>
    </Form>
  );
};

export default ScheduleForm;
