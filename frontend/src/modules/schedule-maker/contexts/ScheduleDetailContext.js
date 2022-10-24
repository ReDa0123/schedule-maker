import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { both, compose, pluck, uniq, values } from 'ramda';
import { SEXES } from '../constants';
import { propEqOrIsEmptyOrNil } from '../../../shared/utils';
import { useTournamentSchedule } from '../hooks';

const filterFns = {
  category: propEqOrIsEmptyOrNil,
  sex: propEqOrIsEmptyOrNil,
};

export const scheduleDetailContext = createContext(null);

const ScheduleDetailProvider = scheduleDetailContext.Provider;

const ScheduleDetailContext = ({ children }) => {
  const { blocks } = useTournamentSchedule();
  const [filter, setFilter] = useState({
    category: '',
    sex: '',
  });

  const categoriesToFilter = useMemo(
    () => compose(uniq, values, pluck('category'))(blocks),
    [blocks]
  );

  const filteredBlocks = useMemo(
    () =>
      blocks.filter(
        both(
          filterFns.category('category', filter.category),
          filterFns.sex('sex', filter.sex)
        )
      ),
    [blocks, filter]
  );

  return (
    <ScheduleDetailProvider
      value={{
        filter,
        setFilter,
        categoriesToFilter,
        sexesToFilter: values(SEXES),
        filteredBlocks,
      }}
    >
      {children}
    </ScheduleDetailProvider>
  );
};

ScheduleDetailContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScheduleDetailContext;
