import { TournamentCreatorTemplate } from '../templates/TournamentCreatorTemplate';
import { gql, useQuery } from '@apollo/client';
import { ErrorText, BigSpinner } from 'src/shared/design-system';

const GET_TOURNAMENT_DETAILS = gql`
  query Tournament($tournamentId: Int!) {
    tournament(tournamentId: $tournamentId) {
      tournamentId
      name
      location
      startDate
      endDate
      userId
      buffer
      preferredStyle
      isPublic
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
    <BigSpinner />
  ) : (
    <TournamentCreatorTemplate tournament={data.tournament} />
  );
}

export default TournamentCreatorPage;
