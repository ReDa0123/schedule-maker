import { createContext } from 'react';
import PropTypes from 'prop-types';
import { omit } from 'ramda';

export const tournamentScheduleContext = createContext(null);

const TournamentScheduleProvider = tournamentScheduleContext.Provider;

const TournamentScheduleContext = ({ children, tournament, edit }) => {
  return (
    <TournamentScheduleProvider
      value={{
        tournament: omit(['sports', 'areas', 'days', 'blocks'], tournament),
        detailMode: !edit,
        blocks: tournament?.blocks,
        days: tournament?.days,
        sports: tournament?.sports,
        areas: tournament?.areas,
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
