import ScheduleForm from './ScheduleForm';

const ScheduleEdit = () => {
  const canEdit = true;

  return canEdit ? <ScheduleForm /> : null;
};

export default ScheduleEdit;
