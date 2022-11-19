import { useToast } from '@chakra-ui/react';
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
  ) {
    editTournament(
      tournamentId: $tournamentId
      name: $name
      location: $location
      startDate: $startDate
      endDate: $endDate
    )
  }
`;

const BasicTournament = ({ tournament }) => {
  const toast = useToast();
  const [editTournament] = useMutation(EDIT_TOURNAMENT_MUTATION, {
    onCompleted: ({ editTournament: successMessage }) => {
      toast({
        title: successMessage,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: (e) => {
      toast({
        title: e.message,
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
    }),
    [tournament]
  );

  return (
    <BasicTournamentForm onSubmit={onSubmit} defaultValues={defaultValues} />
  );
};

BasicTournament.propTypes = {
  tournament: PropTypes.object.isRequired,
};

export default BasicTournament;
