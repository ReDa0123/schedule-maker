import PropTypes from 'prop-types';
import { Box, Flex, useToast } from 'src/shared/design-system';
import { convertToDate } from 'src/shared/utils';
import { format } from 'date-fns';
import { minutesToTime } from '../../schedule-maker/utils/blocks';
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
  const { toastFn } = useToast();
  const [deleteDay] = useMutation(DELETER_DAY_MUTATION, {
    onCompleted: ({ deleteDay: successMessage }) => {
      toastFn({
        title: successMessage,
        status: 'success',
      });
      refetch();
    },
    onError: ({ message }) => {
      toastFn({
        title: message,
        status: 'error',
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
      <Box w="120px">{format(convertToDate(Number(date)), 'dd.MM.yyyy')}</Box>
      <Box w="80px">{minutesToTime(startTime)}</Box>
      <Box>{minutesToTime(endTime)}</Box>
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
