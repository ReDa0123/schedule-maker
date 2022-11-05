import { useMemo } from 'react';
import { ScheduleDetail, ScheduleEdit } from '../organisms';
import { useTournamentSchedule } from '../hooks';
import SubHeader from 'src/shared/design-system/molecules/SubHeader';
import PropTypes from 'prop-types';
import { BigSpinner, ErrorText } from 'src/shared/design-system';

const ScheduleMakerTemplate = ({ isLoading, error, refetch }) => {
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
        <ComponentToRender refetch={refetch} />
      )}
    </>
  );
};

ScheduleMakerTemplate.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  refetch: PropTypes.func.isRequired,
};

export default ScheduleMakerTemplate;
