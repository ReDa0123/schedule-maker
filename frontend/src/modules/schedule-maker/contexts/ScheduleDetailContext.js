import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  allPass,
  compose,
  pluck,
  uniq,
  values,
  filter as rFilter,
  o,
  prop,
  includes,
  __,
  toPairs,
  map,
} from 'ramda';
import { SEXES } from '../constants';
import { propEqOrIsEmptyOrNil } from '../../../shared/utils';
import { useTournamentSchedule } from '../hooks';

const filterFns = {
  category: propEqOrIsEmptyOrNil,
  sex: propEqOrIsEmptyOrNil,
  sportId: propEqOrIsEmptyOrNil,
};

export const scheduleDetailContext = createContext(null);

const ScheduleDetailProvider = scheduleDetailContext.Provider;

const ScheduleDetailContext = ({ children }) => {
  const { blocks, sports } = useTournamentSchedule();
  const [filter, setFilter] = useState({
    category: '',
    sex: '',
    sportId: '',
  });

  const categoriesToFilter = useMemo(
    () => compose(uniq, values, pluck('category'))(blocks),
    [blocks]
  );

  const filteredBlocks = useMemo(
    () =>
      blocks.filter(
        allPass(
          o(
            map(([fieldName, filterFn]) =>
              filterFn(fieldName, filter[fieldName])
            ),
            toPairs
          )(filterFns)
        )
      ),
    [blocks, filter]
  );

  const sportsToFilter = useMemo(
    () =>
      rFilter(
        o(
          includes(__, compose(uniq, values, pluck('sportId'))(blocks)),
          prop('sportId')
        )
      )(sports),
    [blocks, sports]
  );

  return (
    <ScheduleDetailProvider
      value={{
        filter,
        setFilter,
        categoriesToFilter,
        sexesToFilter: values(SEXES),
        filteredBlocks,
        sportsToFilter,
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
