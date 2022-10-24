import { useContext } from 'react';
import { scheduleDetailContext } from '../contexts/ScheduleDetailContext';

export const useScheduleDetail = () => useContext(scheduleDetailContext);
