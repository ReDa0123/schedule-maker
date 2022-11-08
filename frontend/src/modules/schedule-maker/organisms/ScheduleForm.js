import { Form } from 'src/shared/react-hook-form/organisms';
import { FieldArrayContext } from '../contexts';
import { Flex, Heading, ContentBox } from 'src/shared/design-system';
import { useFieldArrayProps, useTournamentSchedule } from '../hooks';
import { ScheduleDays } from './';
import { BlockForm, NotAssignedBlocks } from '../molecules';
import { SCHEDULE_FORM_NAME } from '../constants';
import { FormSubmitButton } from 'src/shared/react-hook-form/molecules';
import PropTypes from 'prop-types';
import { LoadingModal } from 'src/shared/design-system/molecules';
import { useCallback } from 'react';
import { assoc } from 'ramda';
import uuid from 'react-uuid';

const ScheduleFormContent = () => {
  const { append } = useFieldArrayProps();

  const onBlockFormSubmit = useCallback(
    (data) => {
      append(assoc('blockId', uuid(), data));
    },
    [append]
  );

  return (
    <Flex gap={4} flexDir="column" w="100%">
      <ContentBox>
        <BlockForm onSubmit={onBlockFormSubmit} />
        <Heading fontSize={24}>Not assigned blocks</Heading>
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
  );
};
const ScheduleForm = ({ onSubmit, isSaving }) => {
  const { blocks } = useTournamentSchedule();

  return (
    <Form onSubmit={onSubmit}>
      <FieldArrayContext name={SCHEDULE_FORM_NAME} initialData={blocks}>
        <ScheduleFormContent />
      </FieldArrayContext>
      {isSaving && <LoadingModal message="Saving blocks" />}
    </Form>
  );
};

ScheduleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
};

export default ScheduleForm;
