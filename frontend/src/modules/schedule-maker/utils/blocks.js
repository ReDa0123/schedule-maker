import { MINUTES_IN_BLOCK } from '../constants';

export const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}`;
};

export const calculateDuration = ({ players }) =>
  (players * 5) / MINUTES_IN_BLOCK;

export const calculateEndTime = ({ startTime, players }) =>
  calculateDuration({ players }) + startTime;
