import { createContext, useMemo } from 'react';
import { blocks, days, sports, areas } from '../utils/mocks';
import { propEq } from 'ramda';
import PropTypes from 'prop-types';

export const tournamentScheduleContext = createContext(null);

const TournamentScheduleProvider = tournamentScheduleContext.Provider;

const TournamentScheduleContext = ({ children, tournament }) => {
  //TODO: useParams
  const detailMode = false;

  const blocksOfTournament = useMemo(
    () => blocks.filter(propEq('tournamentId', tournament.tournamentId)),
    [tournament]
  );

  const daysOfTournament = useMemo(
    () => days.filter(propEq('tournamentId', tournament.tournamentId)),
    [tournament]
  );

  const areasOfTournament = useMemo(
    () => areas.filter(propEq('tournamentId', tournament.tournamentId)),
    [tournament]
  );

  return (
    <TournamentScheduleProvider
      value={{
        tournament,
        detailMode,
        blocks: blocksOfTournament,
        days: daysOfTournament,
        sports,
        areas: areasOfTournament,
      }}
    >
      {children}
    </TournamentScheduleProvider>
  );
};

TournamentScheduleContext.propTypes = {
  children: PropTypes.node.isRequired,
  tournament: PropTypes.object.isRequired,
};

export default TournamentScheduleContext;
