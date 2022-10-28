import ScheduleForm from './ScheduleForm';
import { useCallback } from 'react';

const ScheduleEdit = () => {
  const canEdit = true;
  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  return canEdit ? <ScheduleForm onSubmit={onSubmit} /> : null;
};

export default ScheduleEdit;
