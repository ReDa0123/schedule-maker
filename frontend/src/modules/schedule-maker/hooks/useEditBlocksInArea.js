import { useWatch, Controller } from 'react-hook-form';
import { useMemo } from 'react';
import { allPass, applySpec, filter, map, o, pick, prop, propEq } from 'ramda';
import { calculateEndTime } from '../utils/blocks';
import { Block } from '../atoms';
import { BLOCK_SCALE, MINUTES_IN_BLOCK, TABLE_TOP_PADDING } from '../constants';

export const useEditBlocksInArea = ({ dayId, areaId, startTime }) => {
  const { fields } = { fields: [] };
  const values = useWatch({
    name: 'schedule',
    defaultValue: [],
  });

  const valuesForArenaAndDay = useMemo(
    () =>
      filter(allPass([propEq('day', dayId), propEq('arena', areaId)]))(values),
    [values, dayId, areaId]
  );

  const startTimesInThisDayAndArena = useMemo(
    () =>
      map(
        applySpec({
          startTime: prop('startTime'),
          endTime: o(calculateEndTime, pick(['startTime', 'players'])),
          blockId: prop('blockId'),
        })
      )(valuesForArenaAndDay),
    [valuesForArenaAndDay]
  );

  return {
    startTimesInThisDayAndArena,
    blocksInArea: fields.map((field, index) => {
      const correspondingValue = values.find(propEq('blockId', field.blockId));
      const shouldDisplay = allPass([
        propEq('day', dayId),
        propEq('arena', areaId),
      ])(correspondingValue);
      return (
        shouldDisplay && (
          <Controller
            key={field.id}
            name={`schedule.${index}`}
            render={({ field: { onChange, value } }) => (
              <Block
                onChange={onChange}
                value={value}
                position="absolute"
                top={`${
                  ((correspondingValue?.startTime - startTime) * BLOCK_SCALE) /
                    MINUTES_IN_BLOCK +
                  TABLE_TOP_PADDING
                }px`}
                left="50%"
                transform="translateX(-50%)"
              />
            )}
          />
        )
      );
    }),
  };
};
