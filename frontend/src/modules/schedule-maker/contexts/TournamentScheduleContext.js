import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { omit } from 'ramda';
import { defaultToEmptyObject } from 'ramda-extension';

export const tournamentScheduleContext = createContext(null);

const TournamentScheduleProvider = tournamentScheduleContext.Provider;

const TournamentScheduleContext = ({ children, tournament, edit }) => {
  const value = useMemo(() => {
    return {
      tournament: omit(
        ['sports', 'areas', 'days', 'blocks'],
        defaultToEmptyObject(tournament)
      ),
      detailMode: !edit,
      blocks: tournament?.blocks,
      days: tournament?.days,
      sports: tournament?.sports,
      areas: tournament?.areas,
    };
  }, [edit, tournament]);

  return (
    <TournamentScheduleProvider value={value}>
      {children}
    </TournamentScheduleProvider>
  );
};

TournamentScheduleContext.propTypes = {
  children: PropTypes.node.isRequired,
  tournament: PropTypes.object,
  edit: PropTypes.bool,
};

export default TournamentScheduleContext;
