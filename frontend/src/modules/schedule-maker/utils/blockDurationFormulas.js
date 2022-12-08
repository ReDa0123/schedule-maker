import {
  DOUBLE_TYPE,
  INDIVIDUAL_TYPE,
  ROBIN_TYPE,
  SINGLE_TYPE,
  THREE_GAME_TYPE,
} from '../constants';

const convertedDuration = (matchDuration) => matchDuration / 60;
export const individualFormula = (noOfPersons, matchDuration) =>
  noOfPersons * convertedDuration(matchDuration);

export const singleFormula = (noOfPersons, matchDuration) =>
  noOfPersons * convertedDuration(matchDuration) -
  1 * convertedDuration(matchDuration);

export const doubleFormula = (noOfPersons, matchDuration) =>
  2 * noOfPersons * convertedDuration(matchDuration) -
  1 * convertedDuration(matchDuration);

export const threeGameFormula = (noOfPersons, matchDuration) =>
  3 * noOfPersons * convertedDuration(matchDuration) +
  1 * convertedDuration(matchDuration);

export const robinFormula = (noOfPersons, matchDuration) =>
  ((noOfPersons * convertedDuration(matchDuration)) / 2) *
  (noOfPersons * convertedDuration(matchDuration) -
    1 * convertedDuration(matchDuration));

export const formulas = {
  [INDIVIDUAL_TYPE]: individualFormula,
  [SINGLE_TYPE]: singleFormula,
  [DOUBLE_TYPE]: doubleFormula,
  [THREE_GAME_TYPE]: threeGameFormula,
  [ROBIN_TYPE]: robinFormula,
};
