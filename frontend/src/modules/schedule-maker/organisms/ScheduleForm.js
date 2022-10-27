import { Form } from 'src/shared/react-hook-form/organisms';
import { FieldArrayContext } from '../contexts';
import { Flex, Heading } from 'src/shared/design-system';
import { useTournamentSchedule } from '../hooks';
import { Schedule } from './';
import { AddBlockForm, NotAssignedBlocks } from '../molecules';
import { SCHEDULE_FORM_NAME } from '../constants';
import ContentBox from '../../../shared/design-system/atoms/ContentBox';
import { FormSubmitButton } from 'src/shared/react-hook-form/molecules';

const ScheduleForm = () => {
  const { days, blocks } = useTournamentSchedule();
  return (
    <Form onSubmit={console.log}>
      <FieldArrayContext name={SCHEDULE_FORM_NAME} initialData={blocks}>
        <Flex gap={4} flexDir="column">
          <ContentBox>
            <AddBlockForm />
            <Heading fontSize={24} mb={4} marginInline={4}>
              Not assigned blocks
            </Heading>
          </ContentBox>
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
          <FormSubmitButton containerProps={{ alignSelf: 'center' }}>
            SAVE
          </FormSubmitButton>
        </Flex>
      </FieldArrayContext>
    </Form>
  );
};

export default ScheduleForm;
