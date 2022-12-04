import { Heading, useToast } from 'src/shared/design-system';
import { gql, useMutation } from '@apollo/client';
import { useCallback, useMemo } from 'react';
import { convertValuesForSending } from '../../tournaments-list/utils';
import { BasicTournamentForm } from './';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { convertToDate } from 'src/shared/utils';

const EDIT_TOURNAMENT_MUTATION = gql`
  mutation editTournament(
    $tournamentId: Int!
    $name: String!
    $location: String!
    $startDate: String!
    $endDate: String!
    $preferredStyle: String
  ) {
    editTournament(
      tournamentId: $tournamentId
      name: $name
      location: $location
      startDate: $startDate
      endDate: $endDate
      preferredStyle: $preferredStyle
    )
  }
`;

const BasicTournament = ({ tournament }) => {
  const { toastFn } = useToast();
  const [editTournament] = useMutation(EDIT_TOURNAMENT_MUTATION, {
    onCompleted: ({ editTournament: successMessage }) => {
      toastFn({
        title: successMessage,
        status: 'success',
      });
    },
    onError: (e) => {
      toastFn({
        title: e.message,
        status: 'error',
      });
    },
  });

  const onSubmit = useCallback(
    async (values) => {
      const variables = {
        ...convertValuesForSending(values),
        tournamentId: tournament.tournamentId,
      };
      await editTournament({
        variables,
      });
    },
    [editTournament, tournament.tournamentId]
  );
  const defaultValues = useMemo(
    () => ({
      name: tournament.name,
      location: tournament.location,
      startDate: format(
        convertToDate(Number(tournament.startDate)),
        'yyyy-MM-dd'
      ),
      endDate: format(convertToDate(Number(tournament.endDate)), 'yyyy-MM-dd'),
      preferredStyle: tournament.preferredStyle,
    }),
    [tournament]
  );

  return (
    <>
      <Heading as="h3" size="md" marginY={4}>
        Tournament info
      </Heading>
      <BasicTournamentForm onSubmit={onSubmit} defaultValues={defaultValues} />
    </>
  );
};

BasicTournament.propTypes = {
  tournament: PropTypes.object.isRequired,
};

export default BasicTournament;
