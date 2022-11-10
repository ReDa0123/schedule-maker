import { DayForm } from './';
import { AddedDay } from '../molecules';
import { Heading, useToast } from '@chakra-ui/react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Spinner, ErrorText } from 'src/shared/design-system';
import { convertDayValuesForSending, CREATE_DAY_MUTATION } from '../utils';
import { useCallback } from 'react';

const GET_DAYS_OF_TOURNAMENT = gql`
  query DaysOfTournament($tournamentId: Int!) {
    daysOfTournament(tournamentId: $tournamentId) {
      dayId
      date
      startTime
      endTime
      description
      tournamentId
    }
  }
`;

const Days = () => {
  //const { tournamentId } = useParams();
  const tournamentId = 1;
  const { data, loading, error, refetch } = useQuery(GET_DAYS_OF_TOURNAMENT, {
    variables: { tournamentId: Number(tournamentId) },
  });

  const toast = useToast();
  const [createDay] = useMutation(CREATE_DAY_MUTATION, {
    onCompleted: ({ createDay: successMessage }) => {
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

  const onSubmit = useCallback(
    async (values) => {
      const variables = {
        ...convertDayValuesForSending(values),
        tournamentId: Number(tournamentId),
      };
      await createDay({ variables });
    },
    [createDay, tournamentId]
  );

  return error ? (
    <ErrorText text={error.message} />
  ) : loading ? (
    <Spinner />
  ) : (
    <>
      <Heading as="h3" size="md" marginY={4}>
        Days of the tournament
      </Heading>
      {data?.daysOfTournament.map((day) => (
        <AddedDay key={day.dayId} day={day} refetch={refetch} />
      ))}
      <Heading as="h4" size="sm" marginY={4}>
        Add new day
      </Heading>
      <DayForm onSubmit={onSubmit} />
    </>
  );
};

export default Days;
