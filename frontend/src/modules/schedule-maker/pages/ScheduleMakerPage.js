import { isNilOrEmpty } from 'ramda-extension';
import { ScheduleMakerTemplate } from '../templates';
import { tournaments } from '../utils/mocks';
import TournamentScheduleContext from '../contexts/TournamentScheduleContext';

const ScheduleMakerPage = () => {
  //TODO: useParams and filter
  const tournament = tournaments[0];

  return isNilOrEmpty(tournament) ? null : (
    <TournamentScheduleContext tournament={tournament}>
      <ScheduleMakerTemplate />
    </TournamentScheduleContext>
  );
};

export default ScheduleMakerPage;
