import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { allPass, values, o, prop, toPairs, map, propSatisfies } from 'ramda';
import { SEXES } from '../constants';
import {
  convertValuesToLabelValueObj,
  propEqOrIsEmptyOrNil,
  propIsContainedInValues,
} from 'src/shared/utils';
import { useTournamentSchedule } from '../hooks';
import { propUniqAndConvertToLabelValueObj } from '../utils/blocks';
import { isNilOrEmpty, isNotNil } from 'ramda-extension';

const filterFns = {
  category: propIsContainedInValues,
  sex: propEqOrIsEmptyOrNil,
  sportId: propIsContainedInValues,
  age: propIsContainedInValues,
  customParameter: propIsContainedInValues,
};

export const filterDefaultValues = {
  category: [],
  sex: '',
  sportId: [],
  age: [],
  customParameter: [],
};

export const scheduleDetailContext = createContext(null);

const ScheduleDetailProvider = scheduleDetailContext.Provider;

const ScheduleDetailContext = ({ children }) => {
  const {
    blocks: allBlocks,
    sports,
    tournament: { versionId },
  } = useTournamentSchedule();
  const [filter, setFilter] = useState(filterDefaultValues);
  const version = useMemo(
    () => (isNilOrEmpty(versionId) ? null : Number(versionId)),
    [versionId]
  );

  const blocks = useMemo(
    () =>
      allBlocks.filter(
        allPass([
          propSatisfies(isNotNil, 'startTime'),
          propEqOrIsEmptyOrNil('versionId', version),
        ])
      ),
    [allBlocks, version]
  );

  const categoriesToFilter = useMemo(
    () => propUniqAndConvertToLabelValueObj('category')(blocks),
    [blocks]
  );

  const sportsToFilter = useMemo(
    () => convertValuesToLabelValueObj(prop('sportId'), prop('name'))(sports),
    [sports]
  );

  const agesToFilter = useMemo(
    () => propUniqAndConvertToLabelValueObj('age')(blocks),
    [blocks]
  );

  const customParamsToFilter = useMemo(
    () => propUniqAndConvertToLabelValueObj('customParameter')(blocks),
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

  return (
    <ScheduleDetailProvider
      value={{
        filter,
        setFilter,
        categoriesToFilter,
        sexesToFilter: values(SEXES),
        filteredBlocks,
        sportsToFilter,
        agesToFilter,
        customParamsToFilter,
        shouldShwNoBlocksMessage: blocks.length === 0,
        shouldShowNotFoundMessage: filteredBlocks.length === 0,
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
