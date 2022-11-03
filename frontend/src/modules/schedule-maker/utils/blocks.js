import { multiply, o, prop } from 'ramda';
import { MINUTES_IN_BLOCK } from '../constants';

export const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}`;
};

export const calculateDuration = o(multiply(MINUTES_IN_BLOCK), prop('persons'));

export const calculateEndTime = ({ startTime, persons }) =>
  calculateDuration({ persons }) + startTime;
