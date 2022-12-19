import { compose, pluck, prop, replace, uniq, values } from 'ramda';
import {
  convertPropToNumberIfNotNil,
  convertTimeToMinutesString,
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

export const calculateDuration = ({ persons, style, matchDuration }, buffer) =>
  formulas[style](persons) * (1 + buffer) * (matchDuration / 60);

export const calculateEndTime = (
  { startTime, persons, style, matchDuration },
  buffer
) => calculateDuration({ persons, style, matchDuration }, buffer) + startTime;

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
  orderIndex: convertPropToNumberIfNotNil('orderIndex'),
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

export const blockDurationValueParser = (value) =>
  `${minutesToTime(value)} minutes`;

export const blockDurationChangeParser = (value) => {
  convertTimeToMinutesString(replace(' minutes', '', value));
};
