import { applySpec, o, prop } from 'ramda';
import { format } from 'date-fns';
import { convertPropToDate } from '../../shared/utils';
import { gql } from '@apollo/client';

export const convertValuesForSending = applySpec({
  endDate: o(
    (time) => format(time, 'yyyy-MM-dd'),
    convertPropToDate('endDate')
  ),
  startDate: o(
    (time) => format(time, 'yyyy-MM-dd'),
    convertPropToDate('startDate')
  ),
  name: prop('tournamentName'),
  location: prop('tournamentLocation'),
});

export const CREATE_TOURNAMENT_MUTATION = gql`
  mutation createTournament(
    $name: String!
    $location: String!
    $startDate: String!
    $endDate: String!
    $userId: Int!
  ) {
    createTournament(
      name: $name
      location: $location
      startDate: $startDate
      endDate: $endDate
      userId: $userId
    )
  }
`;