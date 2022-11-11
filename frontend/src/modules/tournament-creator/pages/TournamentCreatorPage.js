import { TournamentCreatorTemplate } from '../templates/TournamentCreatorTemplate';
import { gql, useQuery } from '@apollo/client';
import { ErrorText, Spinner } from '../../../shared/design-system';

const GET_TOURNAMENT_DETAILS = gql`
  query Tournament($tournamentId: Int!) {
    tournament(tournamentId: $tournamentId) {
      tournamentId
      name
      location
      startDate
      endDate
      userId
    }
  }
`;
import { useParams } from 'react-router-dom';

export function TournamentCreatorPage() {
  const { tournamentId } = useParams();
  const { data, loading, error } = useQuery(GET_TOURNAMENT_DETAILS, {
    variables: { tournamentId: Number(tournamentId) },
  });

  return error ? (
    <ErrorText text={error.message} />
  ) : loading ? (
    <Spinner />
  ) : (
    <TournamentCreatorTemplate data={data} />
  );
}

export default TournamentCreatorPage;
