import { AddSportsForm } from './';
import { gql, useMutation, useQuery } from '@apollo/client';
import { prop } from 'ramda';
import { useCallback } from 'react';
import { ErrorText, Spinner } from '../../../shared/design-system';
import { useToast } from '@chakra-ui/react';
import { convertValuesToLabelValueObj } from '../../../shared/utils';
import PropTypes from 'prop-types';

const GET_SPORTS_OF_TOURNAMENT = gql`
  query SportsOfTournament($tournamentId: Int!) {
    sportsOfTournament(tournamentId: $tournamentId) {
      sportId
      name
    }
  }
`;

const GET_ALL_SPORTS = gql`
  query Sports {
    sports {
      sportId
      name
    }
  }
`;

const SAVE_SPORTS_MUTATION = gql`
  mutation saveSports($sports: [String!]!, $tournamentId: Int!) {
    saveSports(tournamentId: $tournamentId, sports: $sports)
  }
`;

const AddSports = ({ tournamentId }) => {
  const { data, loading, error } = useQuery(GET_ALL_SPORTS);

  const {
    data: sportsOfTournamentData,
    loading: sportsTournamentLoading,
    error: sportsTournamentError,
  } = useQuery(GET_SPORTS_OF_TOURNAMENT, {
    variables: { tournamentId: Number(tournamentId) },
  });

  const defaultValues = {
    sports: convertValuesToLabelValueObj(
      prop('sportId'),
      prop('name')
    )(sportsOfTournamentData?.sportsOfTournament ?? []),
  };

  const querySports = data?.sports.map((sport) => {
    return { label: sport.name, value: sport.sportId };
  });

  const toast = useToast();
  const [saveSports] = useMutation(SAVE_SPORTS_MUTATION, {
    onCompleted: ({ saveSports: successMessage }) => {
      toast({
        title: successMessage,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
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
    async ({ sports }) => {
      const sportsToManage = sports.map((sportToAdd) => {
        return String(sportToAdd.label);
      });

      const variables = {
        sports: sportsToManage,
        tournamentId: Number(tournamentId),
      };
      await saveSports({ variables });
    },
    [saveSports, tournamentId]
  );

  return error || sportsTournamentError ? (
    <ErrorText text={error?.message || sportsTournamentError?.message} />
  ) : loading || sportsTournamentLoading ? (
    <Spinner />
  ) : (
    <AddSportsForm
      onSubmit={onSubmit}
      sports={querySports}
      defaultValues={defaultValues}
    />
  );
};

AddSports.propTypes = {
  tournamentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AddSports;
