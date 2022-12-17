import { AddSportsForm } from './';
import { gql, useMutation, useQuery } from '@apollo/client';
import { pluck, prop } from 'ramda';
import { useCallback } from 'react';
import { ErrorText, Spinner, useToast } from 'src/shared/design-system';
import {
  convertValuesToLabelValueObj,
  namePropCapitalize,
} from 'src/shared/utils';
import PropTypes from 'prop-types';
import { FormSection } from '../atoms';

const GET_SPORTS = gql`
  query Sports($tournamentId: Int!) {
    sportsWithSportsOfTournament(tournamentId: $tournamentId) {
      sports {
        sportId
        name
      }
      sportsOfTournament {
        sportId
        name
      }
    }
  }
`;

const SAVE_SPORTS_MUTATION = gql`
  mutation saveSports($sports: [String!]!, $tournamentId: Int!) {
    saveSports(tournamentId: $tournamentId, sports: $sports)
  }
`;

const AddSports = ({ tournamentId }) => {
  const { data, loading, error } = useQuery(GET_SPORTS, {
    variables: { tournamentId: Number(tournamentId) },
  });

  const defaultValues = {
    sports: convertValuesToLabelValueObj(
      prop('name'),
      namePropCapitalize
    )(data?.sportsWithSportsOfTournament?.sportsOfTournament ?? []),
  };

  const querySports = convertValuesToLabelValueObj(
    prop('name'),
    namePropCapitalize
  )(data?.sportsWithSportsOfTournament?.sports ?? []);

  const { toastFn } = useToast();
  const [saveSports] = useMutation(SAVE_SPORTS_MUTATION, {
    onCompleted: ({ saveSports: successMessage }) => {
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
    async ({ sports }) => {
      const variables = {
        sports: pluck('value', sports),
        tournamentId: Number(tournamentId),
      };
      await saveSports({ variables });
    },
    [saveSports, tournamentId]
  );

  return error ? (
    <ErrorText text={error?.message} />
  ) : loading ? (
    <Spinner />
  ) : (
    <FormSection title="Sports of the tournament">
      <AddSportsForm
        onSubmit={onSubmit}
        sports={querySports}
        defaultValues={defaultValues}
      />
    </FormSection>
  );
};

AddSports.propTypes = {
  tournamentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AddSports;
