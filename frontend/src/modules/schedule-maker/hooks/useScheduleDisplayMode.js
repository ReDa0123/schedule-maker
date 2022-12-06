import { useContext } from 'react';
import { displayModeContext } from '../contexts/DisplayModeContext';

export const useScheduleDisplayMode = () => useContext(displayModeContext);
