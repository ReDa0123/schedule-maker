import {
  __,
  always,
  applySpec,
  equals,
  identity,
  ifElse,
  includes,
  map,
  o,
  pluck,
  prop,
  values,
  when,
} from 'ramda';
import { alwaysNull, isNilOrEmpty } from 'ramda-extension';

export const propEqOrIsEmptyOrNil = (propName, equalValue) => (value) => {
  if (isNilOrEmpty(equalValue)) {
    return true;
  }
  return o(
    ifElse(isNilOrEmpty, always(true), equals(equalValue)),
    prop(propName)
  )(value);
};

export const propIsContainedInValues = (propName, containedArr) => (value) => {
  if (isNilOrEmpty(containedArr)) {
    return true;
  }

  return o(
    includes(__, o(values, pluck('value'))(containedArr)),
    prop(propName)
  )(value);
};

export const mapplySpec = (spec) => map(applySpec(spec));

export const convertPropToNumberIfNotNil = (propName) =>
  o(ifElse(isNilOrEmpty, alwaysNull, Number), prop(propName));

export const nilIfEmptyProp = (propName) =>
  o(when(isNilOrEmpty, alwaysNull), prop(propName));

export const convertStringToDate = (dateString) => new Date(Number(dateString));

export const convertToDate = (date) => new Date(date);

export const convertPropToDate = (propName) => o(convertToDate, prop(propName));

export const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
};

export const convertPropToMinutes = (propName) =>
  o(convertTimeToMinutes, prop(propName));

export const convertValuesToLabelValueObj = (
  valueFn = identity,
  labelFn = identity
) =>
  mapplySpec({
    value: valueFn,
    label: labelFn,
  });
