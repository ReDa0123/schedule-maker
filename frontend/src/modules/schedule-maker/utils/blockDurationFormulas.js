import { MINUTES_IN_BLOCK, tournamentStyles } from '../constants';

export const spiderFormula = (noOfPersons) => {
  return noOfPersons * MINUTES_IN_BLOCK + 5;
};

export const epicFormula = (noOfPersons) => {
  return noOfPersons * MINUTES_IN_BLOCK * 2;
};

export const testFormula = (noOfPersons) => {
  return (noOfPersons * MINUTES_IN_BLOCK) / 2;
};

export const formulas = {
  [tournamentStyles.TEST]: testFormula,
  [tournamentStyles.EPIC]: epicFormula,
  [tournamentStyles.SPIDER]: spiderFormula,
};
