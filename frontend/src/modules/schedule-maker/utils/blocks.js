import { applySpec, map, multiply, o, pick, prop } from 'ramda';
import { BLOCKS_PROPS_TO_SEND, MINUTES_IN_BLOCK } from '../constants';
import { convertPropToNumberIfNotNil, nilIfEmptyProp } from 'src/shared/utils';

export const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}`;
};

export const calculateDuration = o(multiply(MINUTES_IN_BLOCK), prop('persons'));

export const calculateEndTime = ({ startTime, persons }) =>
  calculateDuration({ persons }) + startTime;

export const convertBlocksForSending = map(
  o(
    applySpec({
      startTime: convertPropToNumberIfNotNil('startTime'),
      persons: convertPropToNumberIfNotNil('persons'),
      style: prop('style'),
      category: nilIfEmptyProp('category'),
      sex: nilIfEmptyProp('sex'),
      dayId: convertPropToNumberIfNotNil('dayId'),
      areaId: convertPropToNumberIfNotNil('areaId'),
      sportId: convertPropToNumberIfNotNil('sportId'),
      age: prop('age'),
      customParameter: nilIfEmptyProp('customParameter'),
    }),
    pick(BLOCKS_PROPS_TO_SEND)
  )
);
