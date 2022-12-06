import { useWatch, Controller } from 'react-hook-form';
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

export const useEditBlocksInArea = ({ dayId, areaId, startTime }) => {
  const {
    tournament: { buffer },
  } = useTournamentSchedule();
  const { fields } = useFieldArrayProps();
  const values = useWatch({
    name: SCHEDULE_FORM_NAME,
    defaultValue: [],
  });
  const selectedVersion = useSelectedVersion();
  const { displayMode } = useScheduleDisplayMode();

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
        (a, b) => defaultToZero(a.startTime) - defaultToZero(b.startTime),
        values
      ),
    [values]
  );

  const isDetailedDisplay = displayMode === SCHEDULE_DETAILED_DISPLAY;

  return {
    startTimesInThisDayAndArena,
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
                value={value}
                index={indexes.get(value.blockId)}
                position={isDetailedDisplay ? 'absolute' : 'relative'}
                top={
                  isDetailedDisplay
                    ? `${
                        ((correspondingValue?.startTime - startTime) *
                          BLOCK_SCALE) /
                          MINUTES_IN_BLOCK +
                        TABLE_TOP_PADDING +
                        BLOCK_OFFSET
                      }px`
                    : undefined
                }
                left={isDetailedDisplay ? '50%' : undefined}
                transform={isDetailedDisplay ? 'translateX(-50%)' : undefined}
                isDetailedDisplay={isDetailedDisplay}
              />
            )}
          />
        )
      );
    }),
  };
};
