import { useContext } from 'react';
import { tournamentScheduleContext } from '../contexts/TournamentScheduleContext';

export const useTournamentSchedule = () =>
  useContext(tournamentScheduleContext);
