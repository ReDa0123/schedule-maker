import { compose, pluck, prop, uniq, values } from 'ramda';
import {
  convertPropToNumberIfNotNil,
  convertValuesToLabelValueObj,
  mapplySpec,
  nilIfEmptyProp,
} from 'src/shared/utils';
import { rejectNil } from 'ramda-extension';
import { formulas } from './blockDurationFormulas';

export const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}`;
};

export const calculateDuration = ({ persons, style }, buffer) =>
  formulas[style](persons) * (1 + buffer);

export const calculateEndTime = ({ startTime, persons, style }, buffer) =>
  calculateDuration({ persons, style }, buffer) + startTime;

export const convertBlocksForSending = mapplySpec({
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
  versionId: convertPropToNumberIfNotNil('versionId'),
  matchDuration: convertPropToNumberIfNotNil('matchDuration'),
});

export const propUniqAndConvertToLabelValueObj = (propName) =>
  compose(
    convertValuesToLabelValueObj(),
    uniq,
    rejectNil,
    values,
    pluck(propName)
  );

export const roundToDecimal = (number, decimalPlaces) =>
  Math.round(number * 10 ** decimalPlaces) / 10 ** decimalPlaces;
