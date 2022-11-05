import { always, equals, ifElse, o, prop, when } from 'ramda';
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

export const convertPropToNumberIfNotNil = (propName) =>
  o(ifElse(isNilOrEmpty, alwaysNull, Number), prop(propName));

export const nilIfEmptyProp = (propName) =>
  o(when(isNilOrEmpty, alwaysNull), prop(propName));
