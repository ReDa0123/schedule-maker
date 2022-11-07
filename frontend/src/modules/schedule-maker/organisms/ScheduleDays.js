import { useTournamentSchedule } from '../hooks';
import { useMemo, useState } from 'react';
import { Schedule } from './index';
import { Box, Tabs, TabList, Tab, Text, Link } from 'src/shared/design-system';
import { format } from 'date-fns';
import { WithTooltip } from 'src/shared/design-system/molecules';
import { IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { isNilOrEmpty } from 'ramda-extension';

const ScheduleDays = () => {
  const { days, detailMode } = useTournamentSchedule();
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedDay = useMemo(() => days[activeIndex], [days, activeIndex]);

  return !isNilOrEmpty(days) ? (
    <>
      <Tabs index={activeIndex} onChange={setActiveIndex} overflow="auto">
        <TabList>
          {days.map(({ dayId, date, description }) => (
            <Tab key={dayId}>
              <Box
                w="100%"
                color="blue.600"
                fontSize={20}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                textAlign="start"
              >
                {description}
              </Box>
              <Box color="blue.600" w="100%" textAlign="start">
                {format(new Date(Number(date)), 'dd.MM.yyyy')}
              </Box>
            </Tab>
          ))}
          {!detailMode && (
            <WithTooltip label="Add new day">
              <IconButton
                variant="outline"
                aria-label="Add day"
                icon={<AddIcon />}
                bg="none"
                color="blue.500"
                marginY="auto"
                ml={4}
              />
            </WithTooltip>
          )}
        </TabList>
      </Tabs>
      <Schedule
        dayId={selectedDay.dayId}
        startTime={selectedDay.startTime}
        endTime={selectedDay.endTime}
      />
    </>
  ) : (
    <>
      This tournament has no days yet.
      {!detailMode && (
        <Text>
          You can add one <Link onClick={() => {}}>here</Link>.
        </Text>
      )}
    </>
  );
};

export default ScheduleDays;
