import { useWatch, Controller } from 'react-hook-form';
import { useMemo } from 'react';
import { allPass, filter, o, pick, prop, propEq } from 'ramda';
import { calculateEndTime } from '../utils/blocks';
import { Block } from '../molecules';
import {
  BLOCK_OFFSET,
  BLOCK_SCALE,
  MINUTES_IN_BLOCK,
  TABLE_TOP_PADDING,
} from '../constants';
import { useFieldArrayProps } from './';
import { mapplySpec } from 'src/shared/utils';

export const useEditBlocksInArea = ({ dayId, areaId, startTime }) => {
  const { fields } = useFieldArrayProps();
  const values = useWatch({
    name: 'schedule',
    defaultValue: [],
  });

  const startTimesInThisDayAndArena = useMemo(
    () =>
      o(
        mapplySpec({
          startTime: prop('startTime'),
          endTime: o(calculateEndTime, pick(['startTime', 'persons'])),
          blockId: prop('blockId'),
        }),
        filter(allPass([propEq('dayId', dayId), propEq('areaId', areaId)]))
      )(values),
    [values, areaId, dayId]
  );

  return {
    startTimesInThisDayAndArena,
    blocksInArea: fields.map((field, index) => {
      const correspondingValue = values.find(propEq('blockId', field.blockId));
      //TODO: Verze
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
