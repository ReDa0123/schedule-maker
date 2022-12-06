import { useScheduleDisplayMode } from '../hooks';
import {
  SCHEDULE_AGENDA_DISPLAY,
  SCHEDULE_DETAILED_DISPLAY,
} from '../constants';
import { Box, Flex, IconButton, Text } from 'src/shared/design-system';
import { CalendarIcon, HamburgerIcon } from '@chakra-ui/icons';
import { WithTooltip } from '../../../shared/design-system';

const DisplayChangeButtons = () => {
  const { displayMode, setDisplayMode } = useScheduleDisplayMode();

  return (
    <Box>
      <Text fontWeight={500} paddingBottom={1}>
        Display type
      </Text>
      <Flex gap={3} marginBottom={1}>
        <WithTooltip label="Detailed view">
          <IconButton
            aria-label={displayMode}
            onClick={() => {
              setDisplayMode(SCHEDULE_DETAILED_DISPLAY);
            }}
            icon={<CalendarIcon />}
            variant={
              displayMode === SCHEDULE_DETAILED_DISPLAY ? 'solid' : 'outline'
            }
            colorScheme="blue"
          />
        </WithTooltip>
        <WithTooltip label="Agenda view">
          <IconButton
            aria-label={displayMode}
            onClick={() => {
              setDisplayMode(SCHEDULE_AGENDA_DISPLAY);
            }}
            icon={<HamburgerIcon />}
            variant={
              displayMode === SCHEDULE_AGENDA_DISPLAY ? 'solid' : 'outline'
            }
            colorScheme="blue"
          />
        </WithTooltip>
      </Flex>
    </Box>
  );
};

export default DisplayChangeButtons;
