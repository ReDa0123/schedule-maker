import { useWatch, Controller, useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import { allPass, filter, o, prop, propEq, sort } from 'ramda';
import { calculateEndTime } from '../utils/blocks';
import { Block } from '../molecules';
import {
  BLOCK_OFFSET,
  BLOCK_SCALE,
  MINUTES_IN_BLOCK,
  SCHEDULE_DETAILED_DISPLAY,
  SCHEDULE_FORM_NAME,
  TABLE_TOP_PADDING,
} from '../constants';
import {
  useFieldArrayProps,
  useScheduleDisplayMode,
  useSelectedVersion,
  useTournamentSchedule,
} from './';
import { mapplySpec } from 'src/shared/utils';
import { defaultToZero } from 'ramda-extension';

const emptyArray = [];

export const useEditBlocksInArea = ({
  dayId,
  areaId,
  startTime,
  orderBy = 'startTime',
}) => {
  const {
    tournament: { buffer },
  } = useTournamentSchedule();
  const { fields } = useFieldArrayProps();
  const values =
    useWatch({
      name: SCHEDULE_FORM_NAME,
    }) ?? emptyArray;
  const selectedVersion = useSelectedVersion();
  const { displayMode } = useScheduleDisplayMode();
  const { watch } = useFormContext();

  const startTimesInThisDayAndArena = useMemo(
    () =>
      o(
        mapplySpec({
          startTime: prop('startTime'),
          endTime: (value) => calculateEndTime(value, buffer),
          blockId: prop('blockId'),
        }),
        filter(
          allPass([
            propEq('dayId', dayId),
            propEq('areaId', areaId),
            propEq('versionId', selectedVersion),
          ])
        )
      )(values),
    [values, areaId, dayId, selectedVersion, buffer]
  );
  const indexes = useMemo(
    () => new Map(fields.map(({ blockId }, index) => [blockId, index])),
    [fields]
  );

  const sortedValues = useMemo(
    () =>
      sort(
        (a, b) => defaultToZero(a[orderBy]) - defaultToZero(b[orderBy]),
        values
      ),
    [values, orderBy]
  );

  const isDetailedDisplay = displayMode === SCHEDULE_DETAILED_DISPLAY;
  const isPositionedAbsolute = isDetailedDisplay && orderBy === 'startTime';

  const areaContainsSomeBlocks = useMemo(
    () => sortedValues.some(propEq('areaId', areaId)),
    [sortedValues, areaId]
  );

  const lastOrderIndexInThisDayAndArena = useMemo(
    () =>
      sortedValues.reduce(
        (
          acc,
          { orderIndex, dayId: currentDayId, areaId: currentAreaId, versionId }
        ) =>
          dayId === currentDayId &&
          areaId === currentAreaId &&
          selectedVersion === versionId
            ? Math.max(acc, orderIndex)
            : acc,
        -1
      ),
    [sortedValues, areaId, dayId, selectedVersion]
  );

  return {
    startTimesInThisDayAndArena,
    areaContainsSomeBlocks,
    lastOrderIndexInThisDayAndArena,
    blocksInArea: sortedValues.map((correspondingValue) => {
      const shouldDisplay = allPass([
        propEq('dayId', dayId),
        propEq('areaId', areaId),
        propEq('versionId', selectedVersion),
      ])(correspondingValue);
      return (
        shouldDisplay && (
          <Controller
            key={correspondingValue.blockId}
            name={`schedule.${indexes.get(correspondingValue.blockId)}`}
            render={({ field: { onChange, value } }) => (
              <Block
                onChange={onChange}
                value={watch(`schedule.${indexes.get(value.blockId)}`)}
                index={indexes.get(value.blockId)}
                position={isPositionedAbsolute ? 'absolute' : 'relative'}
                top={
                  isPositionedAbsolute
                    ? `${
                        ((correspondingValue?.startTime - startTime) *
                          BLOCK_SCALE) /
                          MINUTES_IN_BLOCK +
                        TABLE_TOP_PADDING +
                        BLOCK_OFFSET
                      }px`
                    : undefined
                }
                left={isPositionedAbsolute ? '50%' : undefined}
                transform={
                  isPositionedAbsolute ? 'translateX(-50%)' : undefined
                }
                isDetailedDisplay={isDetailedDisplay}
              />
            )}
          />
        )
      );
    }),
  };
};
