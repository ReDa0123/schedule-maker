import { useMemo } from 'react';
import { ScheduleDetail, ScheduleEdit } from '../organisms';
import { useTournamentSchedule } from '../hooks';

const ScheduleMakerTemplate = () => {
  const { detailMode } = useTournamentSchedule();

  const ComponentToRender = useMemo(
    () => (detailMode ? ScheduleDetail : ScheduleEdit),
    [detailMode]
  );
  return <ComponentToRender />;
};

export default ScheduleMakerTemplate;
