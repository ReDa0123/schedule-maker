import PropTypes from 'prop-types';
import {
  Box,
  Text,
  Flex,
  WithTooltip,
  useToast,
} from 'src/shared/design-system';
import { FlexibleColumn, Timeslot } from '../organisms';
import {
  useAreaColumn,
  useEditBlocksInArea,
  useScheduleDisplayMode,
  useTournamentSchedule,
} from '../hooks';
import { SCHEDULE_DETAILED_DISPLAY, TABLE_TOP_PADDING } from '../constants';
import { namePropCapitalize } from 'src/shared/utils';
import { AgendaColumn } from './';
import { Switch } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { useCallback, useState } from 'react';

const TOGGLE_FLEXIBLE = gql`
  mutation ToggleFlexibleArea($areaId: Int!, $tournamentId: Int!) {
    toggleFlexibleArea(areaId: $areaId, tournamentId: $tournamentId)
  }
`;

const AreaColumnEdit = ({ area, startTime, endTime, dayId }) => {
  const { areaId, flexible } = area;
  const [isFlexible, setIsFlexible] = useState(flexible);
  const {
    tournament: { tournamentId },
    refetch,
  } = useTournamentSchedule();
  const { toastFn } = useToast();
  const { blocksInArea, startTimesInThisDayAndArena, areaContainsSomeBlocks } =
    useEditBlocksInArea({
      dayId,
      areaId,
      startTime,
      orderBy: isFlexible ? 'orderIndex' : 'startTime',
    });
  const timeslots = useAreaColumn({ startTime, endTime });
  const { displayMode } = useScheduleDisplayMode();

  const [toggleFlexible, { loading }] = useMutation(TOGGLE_FLEXIBLE, {
    variables: { areaId: Number(areaId), tournamentId: Number(tournamentId) },
    onCompleted: ({ toggleFlexibleArea: description }) => {
      toastFn({
        description,
        status: 'success',
      });
      refetch();
    },
    onError: ({ message }) => {
      toastFn({
        description: message,
        status: 'error',
      });
    },
  });

  const onToggle = useCallback(async () => {
    setIsFlexible((prev) => !prev);
    await toggleFlexible();
  }, [toggleFlexible]);

  return (
    <Box
      minW={{ md: '320px', base: '220px' }}
      borderRightColor="blue.500"
      borderRightWidth="2px"
      position="relative"
    >
      <Flex
        h={`${TABLE_TOP_PADDING}px`}
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <Text fontWeight="500">{namePropCapitalize(area)}</Text>
        <WithTooltip
          label={`Is flexible? ${
            loading || areaContainsSomeBlocks
              ? 'This switch is disabled because this area contains some blocks already (check other versions and days too).'
              : ''
          }`}
          tooltipProps={{
            shouldWrapChildren: true,
          }}
        >
          <Switch
            id="toggle-flexible"
            disabled={loading || areaContainsSomeBlocks}
            isChecked={isFlexible}
            onChange={onToggle}
          />
        </WithTooltip>
      </Flex>

      {displayMode === SCHEDULE_DETAILED_DISPLAY ? (
        !flexible ? (
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
          <FlexibleColumn areaId={areaId} dayId={dayId} />
        )
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
