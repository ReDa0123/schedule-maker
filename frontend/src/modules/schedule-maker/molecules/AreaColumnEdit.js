import PropTypes from 'prop-types';
import { Box } from 'src/shared/design-system';
import { Timeslot } from '../organisms';
import {
  useAreaColumn,
  useEditBlocksInArea,
  useScheduleDisplayMode,
} from '../hooks';
import { SCHEDULE_DETAILED_DISPLAY, TABLE_TOP_PADDING } from '../constants';
import { namePropCapitalize } from 'src/shared/utils';
import { AgendaColumn } from './';

const AreaColumnEdit = ({ area, startTime, endTime, dayId }) => {
  const { areaId } = area;
  const { blocksInArea, startTimesInThisDayAndArena } = useEditBlocksInArea({
    dayId,
    areaId,
    startTime,
  });
  const timeslots = useAreaColumn({ startTime, endTime });
  const { displayMode } = useScheduleDisplayMode();

  return (
    <Box
      minW={{ md: '320px', base: '220px' }}
      borderRightColor="blue.500"
      borderRightWidth="2px"
      position="relative"
    >
      <Box h={`${TABLE_TOP_PADDING}px`} textAlign="center" fontWeight="500">
        {namePropCapitalize(area)}
      </Box>

      {displayMode === SCHEDULE_DETAILED_DISPLAY ? (
        <>
          {blocksInArea}
          <Box>
            {timeslots.map((timeslot) => (
              <Timeslot
                key={timeslot}
                timeslot={timeslot}
                dayId={dayId}
                areaId={areaId}
                dayEnd={endTime}
                startTimesInThisDayAndArena={startTimesInThisDayAndArena}
              />
            ))}
          </Box>
        </>
      ) : (
        <AgendaColumn>{blocksInArea}</AgendaColumn>
      )}
    </Box>
  );
};

AreaColumnEdit.propTypes = {
  area: PropTypes.object.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  dayId: PropTypes.number.isRequired,
};

export default AreaColumnEdit;
