import { useContext } from 'react';
import { blockWarningContext } from '../contexts/BlockWarningContext';

export const useBlockWarning = (index) =>
  useContext(blockWarningContext)[index];
