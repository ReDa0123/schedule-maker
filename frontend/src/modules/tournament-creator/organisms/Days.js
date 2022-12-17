import { DayForm } from './';
import { AddedDay } from '../molecules';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  Spinner,
  ErrorText,
  Heading,
  useToast,
} from 'src/shared/design-system';
import { convertDayValuesForSending, CREATE_DAY_MUTATION } from '../utils';
import { useCallback } from 'react';
import { isNilOrEmpty } from 'ramda-extension';
import { AddedDaysHeader, FormSection } from '../atoms';
import PropTypes from 'prop-types';

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

const Days = ({ tournamentId, startDate }) => {
  const { data, loading, error, refetch } = useQuery(GET_DAYS_OF_TOURNAMENT, {
    variables: { tournamentId: Number(tournamentId) },
  });

  const { toastFn } = useToast();
  const [createDay] = useMutation(CREATE_DAY_MUTATION, {
    onCompleted: ({ createDay: successMessage }) => {
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
    <FormSection title="Days of the tournament">
      {!isNilOrEmpty(data.daysOfTournament) && <AddedDaysHeader />}
      {data?.daysOfTournament.map((day) => (
        <AddedDay key={day.dayId} day={day} refetch={refetch} />
      ))}
      <Heading as="h4" size="sm" marginY={4}>
        Add new day
      </Heading>
      <DayForm onSubmit={onSubmit} date={startDate} />
    </FormSection>
  );
};

Days.propTypes = {
  tournamentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  startDate: PropTypes.string.isRequired,
};

export default Days;
