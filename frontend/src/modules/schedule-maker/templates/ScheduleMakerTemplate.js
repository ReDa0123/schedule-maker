import { useMemo } from 'react';
import { ScheduleDetail, ScheduleEdit } from '../organisms';
import { useTournamentSchedule } from '../hooks';
import SubHeader from '../../../shared/design-system/molecules/SubHeader';

const ScheduleMakerTemplate = () => {
  const { detailMode } = useTournamentSchedule();

  const ComponentToRender = useMemo(
    () => (detailMode ? ScheduleDetail : ScheduleEdit),
    [detailMode]
  );
  return (
    <>
      <SubHeader path={'/tournaments-list'} title="Schedule Maker" />
      <ComponentToRender />
    </>
  );
};

export default ScheduleMakerTemplate;
