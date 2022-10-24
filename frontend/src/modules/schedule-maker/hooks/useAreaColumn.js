import { MINUTES_IN_BLOCK } from '../constants';
import { useEffect, useState } from 'react';

export const useAreaColumn = ({ startTime, endTime }) => {
  const [timeslots, setTimeslots] = useState([]);

  useEffect(() => {
    const timeslots = [];
    for (let i = startTime; i < endTime; i += MINUTES_IN_BLOCK) {
      timeslots.push(i);
    }
    setTimeslots(timeslots);
  }, [startTime, endTime]);

  return timeslots;
};
