import { useTournamentSchedule } from './useTournamentSchedule';
import { useFieldArrayProps } from './useFieldArrayProps';
import { useBlockWarning } from './useBlockWarning';
import { useMemo } from 'react';
import { propEq } from 'ramda';
import { calculateDuration } from '../utils/blocks';

export const useBlockInfo = (index, value) => {
  const {
    sports,
    detailMode,
    tournament: { buffer },
  } = useTournamentSchedule();
  const fieldArrayProps = useFieldArrayProps();
  const warning = useBlockWarning(index);
  const sportsName = useMemo(
    () => sports.find(propEq('sportId', value.sportId))?.name,
    [sports, value]
  );
  const sportIndex = useMemo(
    () => sports.findIndex(propEq('sportId', value.sportId)),
    [sports, value]
  );
  const blockDuration = calculateDuration(value, buffer);

  const infoRow1 = useMemo(
    () => `${sportsName} - ${value.age}`,
    [sportsName, value.age]
  );

  const infoRow2 = useMemo(
    () =>
      `${value.category ?? ''}${
        value.customParameter
          ? `${value.category ? ' - ' : ''}${value.customParameter}`
          : ''
      }`,
    [value.category, value.customParameter]
  );

  return {
    sportsName,
    buffer,
    detailMode,
    fieldArrayProps,
    warning,
    sportIndex,
    blockDuration,
    infoRow1,
    infoRow2,
  };
};
