import PropTypes from 'prop-types';
import { Box, Flex } from 'src/shared/design-system';
import { convertToDate } from 'src/shared/utils';
import { format } from 'date-fns';
import { minutesToTime } from '../../schedule-maker/utils/blocks';
import { useToast } from '@chakra-ui/react';
import { WithTooltip } from 'src/shared/design-system/molecules';
import { gql, useMutation } from '@apollo/client';
import { DeleteDayButton, EditDayButton } from './';

const DELETER_DAY_MUTATION = gql`
  mutation DeleteDay($dayId: Int!) {
    deleteDay(dayId: $dayId)
  }
`;

const AddedDay = ({ day, refetch }) => {
  const { dayId, date, startTime, endTime, description } = day;
  const toast = useToast();
  const [deleteDay] = useMutation(DELETER_DAY_MUTATION, {
    onCompleted: ({ deleteDay: successMessage }) => {
      toast({
        title: successMessage,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      refetch();
    },
    onError: ({ message }) => {
      toast({
        title: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  return (
    <Flex
      gap={4}
      p={4}
      border="2px solid"
      borderColor="blue.500"
      borderRadius="md"
      mb={4}
      pr={8}
      alignItems="center"
    >
      <Box w="min(40%, 50ch)">{description}</Box>
      <Box>Date: {format(convertToDate(Number(date)), 'dd.MM.yyyy')}</Box>
      <Box>Start Time: {minutesToTime(startTime)}</Box>
      <Box>End Time: {minutesToTime(endTime)}</Box>
      <WithTooltip label="Edit Day">
        <EditDayButton day={day} refetch={refetch} />
      </WithTooltip>
      <WithTooltip label="Delete day">
        <DeleteDayButton dayId={dayId} deleteDay={deleteDay} />
      </WithTooltip>
    </Flex>
  );
};

AddedDay.propTypes = {
  day: PropTypes.shape({
    date: PropTypes.string.isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    dayId: PropTypes.number.isRequired,
    tournamentId: PropTypes.number,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default AddedDay;
