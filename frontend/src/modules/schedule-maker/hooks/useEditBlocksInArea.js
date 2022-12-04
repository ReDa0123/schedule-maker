import { useWatch, Controller } from 'react-hook-form';
import { useMemo } from 'react';
import { allPass, filter, o, pick, prop, propEq } from 'ramda';
import { calculateEndTime } from '../utils/blocks';
import { Block } from '../molecules';
import {
  BLOCK_OFFSET,
  BLOCK_SCALE,
  MINUTES_IN_BLOCK,
  SCHEDULE_FORM_NAME,
  TABLE_TOP_PADDING,
} from '../constants';
import { useFieldArrayProps, useSelectedVersion } from './';
import { mapplySpec } from 'src/shared/utils';

export const useEditBlocksInArea = ({ dayId, areaId, startTime }) => {
  const { fields } = useFieldArrayProps();
  const values = useWatch({
    name: SCHEDULE_FORM_NAME,
    defaultValue: [],
  });
  const selectedVersion = useSelectedVersion();

  const startTimesInThisDayAndArena = useMemo(
    () =>
      o(
        mapplySpec({
          startTime: prop('startTime'),
          endTime: o(calculateEndTime, pick(['startTime', 'persons', 'style'])),
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
    [values, areaId, dayId, selectedVersion]
  );

  return {
    startTimesInThisDayAndArena,
    blocksInArea: fields.map((field, index) => {
      const correspondingValue = values.find(propEq('blockId', field.blockId));
      const shouldDisplay = allPass([
        propEq('dayId', dayId),
        propEq('areaId', areaId),
        propEq('versionId', selectedVersion),
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
