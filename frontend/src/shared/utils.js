import { always, equals, ifElse, o, prop } from 'ramda';
import { isNilOrEmpty } from 'ramda-extension';

export const propEqOrIsEmptyOrNil = (propName, equalValue) => (value) => {
  if (isNilOrEmpty(equalValue)) {
    return true;
  }
  return o(
    ifElse(isNilOrEmpty, always(true), equals(equalValue)),
    prop(propName)
  )(value);
};
