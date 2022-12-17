import { Form } from 'src/shared/react-hook-form/organisms';
import { FieldArrayContext } from '../contexts';
import { Flex, ContentBox, Button } from 'src/shared/design-system';
import { useFieldArrayProps, useTournamentSchedule } from '../hooks';
import { ScheduleDays, Versions } from './';
import { BlockForm, NotAssignedBlocks } from '../molecules';
import { SCHEDULE_FORM_NAME } from '../constants';
import { FormSubmitButton } from 'src/shared/react-hook-form/molecules';
import PropTypes from 'prop-types';
import { LoadingModal } from 'src/shared/design-system/molecules';
import { useCallback } from 'react';
import { assoc, last } from 'ramda';
import uuid from 'react-uuid';
import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';
import { isNilOrEmpty } from 'ramda-extension';
import BlockWarningContext from '../contexts/BlockWarningContext';

const ScheduleFormContent = () => {
  const { append } = useFieldArrayProps();
  const {
    tournament: { tournamentId, preferredStyle },
  } = useTournamentSchedule();

  const onBlockFormSubmit = useCallback(
    (data) => {
      append(assoc('blockId', uuid(), data));
    },
    [append]
  );

  const defaultValues = { style: preferredStyle };

  return (
    <Flex gap={4} flexDir="column" w="100%">
      <ContentBox position="relative">
        <RouterLink
          to={route.tournamentCreator({ id: tournamentId })}
          color="white"
          _hover={{
            textDecoration: 'none',
          }}
          position="absolute"
          right="0"
          top="16px"
        >
          <Button>Edit Tournament Parameters</Button>
        </RouterLink>
        <BlockForm onSubmit={onBlockFormSubmit} defaultValues={defaultValues} />
      </ContentBox>
      <NotAssignedBlocks />
      <ContentBox minW="70%">
        <Versions />
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
  const { blocks, versions } = useTournamentSchedule();
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        selectedVersion: isNilOrEmpty(versions) ? '' : last(versions).versionId,
      }}
    >
      <FieldArrayContext name={SCHEDULE_FORM_NAME} initialData={blocks}>
        <BlockWarningContext>
          <ScheduleFormContent />
        </BlockWarningContext>
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
