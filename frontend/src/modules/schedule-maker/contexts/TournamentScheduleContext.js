import { createContext, useMemo } from 'react';
import { blocks, days, sports, areas, tournamentSports } from '../utils/mocks';
import { prop, propEq } from 'ramda';
import PropTypes from 'prop-types';

export const tournamentScheduleContext = createContext(null);

const TournamentScheduleProvider = tournamentScheduleContext.Provider;

const TournamentScheduleContext = ({ children, tournament, edit }) => {
  const propEqualsTournamentId = useMemo(
    () => propEq('tournamentId', tournament.tournamentId),
    [tournament.tournamentId]
  );

  const blocksOfTournament = useMemo(
    () => blocks.filter(propEqualsTournamentId),
    [propEqualsTournamentId]
  );

  const daysOfTournament = useMemo(
    () => days.filter(propEqualsTournamentId),
    [propEqualsTournamentId]
  );

  const areasOfTournament = useMemo(
    () => areas.filter(propEqualsTournamentId),
    [propEqualsTournamentId]
  );

  const sportsOfTournament = useMemo(() => {
    const sportIdsInTournament = tournamentSports
      .filter(propEqualsTournamentId)
      .map(prop('sportId'));
    return sports.filter((sport) =>
      sportIdsInTournament.includes(sport.sportId)
    );
  }, [propEqualsTournamentId]);

  return (
    <TournamentScheduleProvider
      value={{
        tournament,
        detailMode: !edit,
        blocks: blocksOfTournament,
        days: daysOfTournament,
        sports: sportsOfTournament,
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
  edit: PropTypes.bool,
};

export default TournamentScheduleContext;
