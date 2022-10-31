import ScheduleForm from './ScheduleForm';
import { useCallback } from 'react';
import { useAuth } from '../../auth';
import { useTournamentSchedule } from '../hooks';
import { AuthError } from '../../auth/atoms';

const ScheduleEdit = () => {
  const auth = useAuth();
  const {
    tournament: { userId },
  } = useTournamentSchedule();
  const canEdit = auth.user && auth.user.userId === userId;
  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  return canEdit ? (
    <ScheduleForm onSubmit={onSubmit} />
  ) : (
    <AuthError
      message="You are not authorized to edit the schedule of this tournament."
      to="./?detailmode=true"
      linkMessage="View Schedule"
    />
  );
};

export default ScheduleEdit;
