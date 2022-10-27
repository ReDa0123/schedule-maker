import { useWatch, Controller } from 'react-hook-form';
import { useMemo } from 'react';
import { allPass, applySpec, filter, map, o, pick, prop, propEq } from 'ramda';
import { calculateEndTime } from '../utils/blocks';
import { Block } from '../atoms';
import {
  BLOCK_OFFSET,
  BLOCK_SCALE,
  MINUTES_IN_BLOCK,
  TABLE_TOP_PADDING,
} from '../constants';
import { useFieldArrayProps } from './';

export const useEditBlocksInArea = ({ dayId, areaId, startTime }) => {
  const { fields } = useFieldArrayProps();
  const values = useWatch({
    name: 'schedule',
    defaultValue: [],
  });

  const startTimesInThisDayAndArena = useMemo(
    () =>
      o(
        map(
          applySpec({
            startTime: prop('startTime'),
            endTime: o(calculateEndTime, pick(['startTime', 'players'])),
            blockId: prop('blockId'),
          })
        ),
        filter(allPass([propEq('dayId', dayId), propEq('areaId', areaId)]))
      )(values),
    [values, areaId, dayId]
  );

  return {
    startTimesInThisDayAndArena,
    blocksInArea: fields.map((field, index) => {
      const correspondingValue = values.find(propEq('blockId', field.blockId));
      const shouldDisplay = allPass([
        propEq('dayId', dayId),
        propEq('areaId', areaId),
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
                index={index}
                position="absolute"
                top={`${
                  ((correspondingValue?.startTime - startTime) * BLOCK_SCALE) /
                    MINUTES_IN_BLOCK +
                  TABLE_TOP_PADDING +
                  BLOCK_OFFSET
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
