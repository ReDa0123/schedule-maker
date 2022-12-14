import { AddAreasForm } from './index';
import { useCallback } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  convertValuesToLabelValueObj,
  namePropCapitalize,
} from 'src/shared/utils';
import { pluck, prop } from 'ramda';
import { ErrorText, Spinner, useToast } from 'src/shared/design-system';
import PropTypes from 'prop-types';
import { FormSection } from '../atoms';

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
      namePropCapitalize
    )(data?.areasWithAreasOfTournament?.areasOfTournament ?? []),
  };

  const queryAreas = convertValuesToLabelValueObj(
    prop('name'),
    namePropCapitalize
  )(data?.areasWithAreasOfTournament?.areas ?? []);

  const { toastFn } = useToast();
  const [saveAreas] = useMutation(SAVE_AREAS_MUTATION, {
    onCompleted: ({ saveAreas: successMessage }) => {
      toastFn({
        title: successMessage,
        status: 'success',
      });
    },
    onError: ({ message }) => {
      toastFn({
        title: message,
        status: 'error',
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
    <FormSection title="Areas of the tournament">
      <AddAreasForm
        onSubmit={onSubmit}
        areas={queryAreas}
        defaultValues={defaultValues}
      />
    </FormSection>
  );
};

AddAreas.propTypes = {
  tournamentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AddAreas;
