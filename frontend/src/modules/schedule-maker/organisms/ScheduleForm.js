import { Form } from 'src/shared/react-hook-form/organisms';
import { FieldArrayContext } from '../contexts';
import { Flex, Heading, ContentBox } from 'src/shared/design-system';
import { useTournamentSchedule } from '../hooks';
import { ScheduleDays } from './';
import { AddBlockForm, NotAssignedBlocks } from '../molecules';
import { SCHEDULE_FORM_NAME } from '../constants';
import { FormSubmitButton } from 'src/shared/react-hook-form/molecules';

const ScheduleForm = () => {
  const { blocks } = useTournamentSchedule();
  return (
    <Form onSubmit={console.log}>
      <FieldArrayContext name={SCHEDULE_FORM_NAME} initialData={blocks}>
        <Flex gap={4} flexDir="column" w="100%">
          <ContentBox>
            <AddBlockForm />
            <Heading fontSize={24} mb={4}>
              Not assigned blocks
            </Heading>
          </ContentBox>
          <NotAssignedBlocks />
          <ContentBox minW="70%">
            <ScheduleDays />
            <FormSubmitButton
              minW="250px"
              containerProps={{ marginX: 'auto', mt: '16px' }}
            >
              SAVE
            </FormSubmitButton>
          </ContentBox>
        </Flex>
      </FieldArrayContext>
    </Form>
  );
};

export default ScheduleForm;
