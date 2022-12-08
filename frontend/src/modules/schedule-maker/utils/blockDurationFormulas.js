import {
  DOUBLE_TYPE,
  INDIVIDUAL_TYPE,
  ROBIN_TYPE,
  SINGLE_TYPE,
  THREE_GAME_TYPE,
} from '../constants';
import { identity } from 'ramda';

export const individualFormula = identity();

export const singleFormula = (noOfPersons) => noOfPersons - 1;

export const doubleFormula = (noOfPersons) => 2 * noOfPersons - 1;

export const threeGameFormula = (noOfPersons) => 3 * noOfPersons + 1;

export const robinFormula = (noOfPersons) =>
  (noOfPersons / 2) * (noOfPersons - 1);

export const formulas = {
  [INDIVIDUAL_TYPE]: individualFormula,
  [SINGLE_TYPE]: singleFormula,
  [DOUBLE_TYPE]: doubleFormula,
  [THREE_GAME_TYPE]: threeGameFormula,
  [ROBIN_TYPE]: robinFormula,
};
