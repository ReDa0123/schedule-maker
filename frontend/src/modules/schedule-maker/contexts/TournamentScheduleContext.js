import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { omit, sort } from 'ramda';
import { defaultToEmptyObject, defaultToZero, isNumber } from 'ramda-extension';

export const tournamentScheduleContext = createContext(null);

const TournamentScheduleProvider = tournamentScheduleContext.Provider;

const TournamentScheduleContext = ({ children, tournament, edit, refetch }) => {
  const value = useMemo(() => {
    return {
      tournament: omit(
        ['sports', 'areas', 'days', 'blocks', 'versions'],
        defaultToEmptyObject(tournament)
      ),
      detailMode: !edit,
      blocks: tournament
        ? sort((a, b) =>
            isNumber(a.orderIndex)
              ? a.orderIndex - defaultToZero(b.orderIndex)
              : defaultToZero(a.startTime) - defaultToZero(b.startTime)
          )(tournament.blocks)
        : [],
      days: tournament?.days,
      sports: tournament?.sports,
      areas: tournament?.areas,
      versions: tournament?.versions,
      refetch,
    };
  }, [edit, tournament, refetch]);

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
  refetch: PropTypes.func,
};

export default TournamentScheduleContext;
