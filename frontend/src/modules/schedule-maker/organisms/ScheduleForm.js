import { Form } from 'src/shared/react-hook-form/organisms';
import { FieldArrayContext } from '../contexts';
import {
  Flex,
  ContentBox,
  Button,
  Text,
  WithTooltip,
} from 'src/shared/design-system';
import { useFieldArrayProps, useTournamentSchedule } from '../hooks';
import { ScheduleDays, Versions } from './';
import { BatchUpload, BlockForm, NotAssignedBlocks } from '../molecules';
import { SCHEDULE_FORM_NAME } from '../constants';
import { FormSubmitButton } from 'src/shared/react-hook-form/molecules';
import PropTypes from 'prop-types';
import { LoadingModal } from 'src/shared/design-system/molecules';
import { useCallback, useState } from 'react';
import { assoc, last } from 'ramda';
import uuid from 'react-uuid';
import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';
import { isNilOrEmpty } from 'ramda-extension';
import BlockWarningContext from '../contexts/BlockWarningContext';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Icon,
} from '@chakra-ui/react';
import { AiOutlineSave } from 'react-icons/ai';

const ScheduleFormContent = () => {
  const [leftPadding, setLeftPadding] = useState(0);
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
          top="-28px"
        >
          <Button>Edit Tournament Parameters</Button>
        </RouterLink>
        <FormSubmitButton
          minW="60px"
          w="60px"
          height="60px"
          borderRadius="50%"
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.7)"
          bg="green.500"
          _hover={{
            bg: 'green.600',
          }}
          containerProps={{
            marginX: 'auto',
            mt: '16px',
            position: 'fixed',
            right: '45px',
            top: '45px',
            zIndex: '100',
          }}
        >
          <WithTooltip label={'Save'}>
            <span
              style={{
                height: '2rem',
                display: 'block',
              }}
            >
              <Icon as={AiOutlineSave} boxSize="2rem" />
            </span>
          </WithTooltip>
        </FormSubmitButton>
        <Accordion defaultIndex={[0]} allowMultiple mt={4}>
          <AccordionItem>
            <AccordionButton>
              <Text
                fontWeight={700}
                fontSize={24}
                as="span"
                flex="1"
                textAlign="left"
              >
                Sport Blocks
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <BlockForm
                onSubmit={onBlockFormSubmit}
                defaultValues={defaultValues}
              />
              <BatchUpload />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </ContentBox>
      <NotAssignedBlocks setLeftPadding={setLeftPadding} />
      <ContentBox minW="70%" maxW="95vw">
        <Versions />
        <ScheduleDays
          position="relative"
          left={`${leftPadding}px`}
          w={`calc(100% - ${leftPadding}px)`}
          transition="left 300ms ease-out, width 300ms ease-out"
        />
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
