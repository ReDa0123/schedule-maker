import { useMemo } from 'react';
import { ScheduleDetail, ScheduleEdit } from '../organisms';
import { useTournamentSchedule } from '../hooks';
import SubHeader from 'src/shared/design-system/molecules/SubHeader';
import PropTypes from 'prop-types';
import { BigSpinner, ErrorText } from 'src/shared/design-system';
import DisplayModeContext from '../contexts/DisplayModeContext';

const ScheduleMakerTemplate = ({ isLoading, error }) => {
  const { detailMode } = useTournamentSchedule();

  const ComponentToRender = useMemo(
    () => (detailMode ? ScheduleDetail : ScheduleEdit),
    [detailMode]
  );
  return (
    <>
      <SubHeader path={'/tournaments-list'} title="Schedule Maker" />
      {isLoading ? (
        <BigSpinner />
      ) : error ? (
        <ErrorText text={error.message} />
      ) : (
        <DisplayModeContext>
          <ComponentToRender />
        </DisplayModeContext>
      )}
    </>
  );
};

ScheduleMakerTemplate.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

export default ScheduleMakerTemplate;
