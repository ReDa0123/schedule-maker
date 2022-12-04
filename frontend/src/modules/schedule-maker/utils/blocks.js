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

export const calculateDuration = ({ persons, style }) =>
  formulas[style](persons);

export const calculateEndTime = ({ startTime, persons, style }) =>
  calculateDuration({ persons, style }) + startTime;

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
});

export const propUniqAndConvertToLabelValueObj = (propName) =>
  compose(
    convertValuesToLabelValueObj(),
    uniq,
    rejectNil,
    values,
    pluck(propName)
  );
