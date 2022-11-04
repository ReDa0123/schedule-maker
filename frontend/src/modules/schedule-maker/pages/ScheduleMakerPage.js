import { isNilOrEmpty } from 'ramda-extension';
import { ScheduleMakerTemplate } from '../templates';
import { tournaments } from '../utils/mocks';
import TournamentScheduleContext from '../contexts/TournamentScheduleContext';
import { NotFoundPage } from 'src/shared/navigation';
import { useParams } from 'react-router-dom';
import { propEq } from 'ramda';
import { useMemo } from 'react';
import PropTypes from 'prop-types';

const ScheduleMakerPage = ({ edit }) => {
  const { tournamentId } = useParams();
  const tournament = useMemo(
    () => tournaments.find(propEq('tournamentId', Number(tournamentId))),
    [tournamentId]
  );

  return isNilOrEmpty(tournament) ? (
    <NotFoundPage />
  ) : (
    <TournamentScheduleContext tournament={tournament} edit={edit}>
      <ScheduleMakerTemplate />
    </TournamentScheduleContext>
  );
};

ScheduleMakerPage.propTypes = {
  edit: PropTypes.bool,
};

export default ScheduleMakerPage;
