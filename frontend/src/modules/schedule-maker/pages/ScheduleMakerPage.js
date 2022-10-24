import { isNilOrEmpty } from 'ramda-extension';
import { ScheduleMakerTemplate } from '../templates';
import { tournaments } from '../utils/mocks';
import TournamentScheduleContext from '../contexts/TournamentScheduleContext';
import { NotFoundPage } from '../../../shared/navigation';

const ScheduleMakerPage = () => {
  //TODO: useParams and filter
  const tournament = tournaments[0];

  return isNilOrEmpty(tournament) ? (
    <NotFoundPage />
  ) : (
    <TournamentScheduleContext tournament={tournament}>
      <ScheduleMakerTemplate />
    </TournamentScheduleContext>
  );
};

export default ScheduleMakerPage;
