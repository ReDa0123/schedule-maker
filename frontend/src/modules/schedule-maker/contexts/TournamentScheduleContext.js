import { createContext, useMemo } from 'react';
import { blocks, days, sports, areas } from '../utils/mocks';
import { propEq } from 'ramda';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

export const tournamentScheduleContext = createContext(null);

const TournamentScheduleProvider = tournamentScheduleContext.Provider;

const TournamentScheduleContext = ({ children, tournament }) => {
  const [searchParams] = useSearchParams();

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
        detailMode: searchParams.get('detailmode') === 'true',
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
