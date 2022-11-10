import { TournamentCreatorTemplate } from '../templates/TournamentCreatorTemplate';
import { useParams } from 'react-router-dom';

export function TournamentCreatorPage() {
  const { tournamentId } = useParams();
  return <TournamentCreatorTemplate tournamentId={Number(tournamentId)} />;
}

export default TournamentCreatorPage;
