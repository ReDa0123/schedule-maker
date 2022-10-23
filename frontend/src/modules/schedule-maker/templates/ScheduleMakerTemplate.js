import { useMemo } from 'react';
import { ScheduleDetail } from '../organisms';
import { useTournamentSchedule } from '../hooks';

const ScheduleForm = null;

const ScheduleMakerTemplate = () => {
  const { detailMode } = useTournamentSchedule();

  const ComponentToRender = useMemo(
    () => (detailMode ? ScheduleDetail : ScheduleForm),
    [detailMode]
  );
  return <ComponentToRender />;
};

export default ScheduleMakerTemplate;
