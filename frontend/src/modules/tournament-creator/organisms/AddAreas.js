import { AddAreasForm } from './index';
import { useCallback } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { convertValuesToLabelValueObj } from '../../../shared/utils';
import { pluck, prop } from 'ramda';
import { useToast } from '@chakra-ui/react';
import { ErrorText, Spinner } from '../../../shared/design-system';
import PropTypes from 'prop-types';

const GET_AREAS = gql`
  query Areas($tournamentId: Int!) {
    areasWithAreasOfTournament(tournamentId: $tournamentId) {
      areas {
        areaId
        name
      }
      areasOfTournament {
        areaId
        name
      }
    }
  }
`;

const SAVE_AREAS_MUTATION = gql`
  mutation saveAreas($areas: [String!]!, $tournamentId: Int!) {
    saveAreas(tournamentId: $tournamentId, areas: $areas)
  }
`;

const AddAreas = ({ tournamentId }) => {
  const { data, loading, error } = useQuery(GET_AREAS, {
    variables: { tournamentId: Number(tournamentId) },
  });

  const defaultValues = {
    areas: convertValuesToLabelValueObj(
      prop('name'),
      prop('name')
    )(data?.areasWithAreasOfTournament?.areasOfTournament ?? []),
  };

  const queryAreas = convertValuesToLabelValueObj(
    prop('name'),
    prop('name')
  )(data?.areasWithAreasOfTournament?.areas ?? []);

  const toast = useToast();
  const [saveAreas] = useMutation(SAVE_AREAS_MUTATION, {
    onCompleted: ({ saveAreas: successMessage }) => {
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
    async ({ areas }) => {
      const variables = {
        areas: pluck('value', areas),
        tournamentId: Number(tournamentId),
      };
      await saveAreas({ variables });
    },
    [saveAreas, tournamentId]
  );

  return error ? (
    <ErrorText text={error?.message} />
  ) : loading ? (
    <Spinner />
  ) : (
    <AddAreasForm
      onSubmit={onSubmit}
      areas={queryAreas}
      defaultValues={defaultValues}
    />
  );
};

AddAreas.propTypes = {
  tournamentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AddAreas;
