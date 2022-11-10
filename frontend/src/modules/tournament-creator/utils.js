import { applySpec, o, prop } from 'ramda';
import { format } from 'date-fns';
import { convertPropToDate, convertPropToMinutes } from 'src/shared/utils';
import { gql } from '@apollo/client';

export const convertDayValuesForSending = applySpec({
  date: o((time) => format(time, 'yyyy-MM-dd'), convertPropToDate('date')),
  description: prop('description'),
  startTime: convertPropToMinutes('startTime'),
  endTime: convertPropToMinutes('endTime'),
});

export const CREATE_DAY_MUTATION = gql`
  mutation CreateDay(
    $tournamentId: Int!
    $date: String!
    $startTime: Int!
    $endTime: Int!
    $description: String!
  ) {
    createDay(
      tournamentId: $tournamentId
      date: $date
      startTime: $startTime
      endTime: $endTime
      description: $description
    )
  }
`;
