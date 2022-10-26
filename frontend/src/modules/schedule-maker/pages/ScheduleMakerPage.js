import { isNilOrEmpty } from 'ramda-extension';
import { ScheduleMakerTemplate } from '../templates';
import { tournaments } from '../utils/mocks';
import TournamentScheduleContext from '../contexts/TournamentScheduleContext';
import { NotFoundPage } from 'src/shared/navigation';
import { useParams } from 'react-router-dom';
import { propEq } from 'ramda';
import { useMemo } from 'react';

const ScheduleMakerPage = () => {
  const { tournamentId } = useParams();
  const tournament = useMemo(
    () => tournaments.find(propEq('tournamentId', Number(tournamentId))),
    [tournamentId]
  );

  return isNilOrEmpty(tournament) ? (
    <NotFoundPage />
  ) : (
    <TournamentScheduleContext tournament={tournament}>
      <ScheduleMakerTemplate />
    </TournamentScheduleContext>
  );
};

export default ScheduleMakerPage;
