import { useTournamentSchedule } from '../hooks';
import { useState } from 'react';
import { Schedule } from './index';
import { Box, IconButton, Tabs, TabList, Tab } from 'src/shared/design-system';
import { format } from 'date-fns';
import { AddIcon } from '@chakra-ui/icons';
import { WithTooltip } from 'src/shared/design-system/molecules';

const ScheduleDays = () => {
  const { days, detailMode } = useTournamentSchedule();
  const [activeIndex, setActiveIndex] = useState(0);
  const { dayId, startTime, endTime } = days[activeIndex];

  return (
    <>
      <Tabs index={activeIndex} onChange={setActiveIndex} overflow="auto">
        <TabList>
          {days.map(({ dayId, date, description }) => (
            <Tab
              key={dayId}
              display="flex"
              flexDir="column"
              borderTopRadius="md"
              overflow="hidden"
              maxW="250px"
              minW="150px"
              _hover={{
                bg: 'orange.50',
              }}
              _selected={{
                bg: 'orange.100',
                _hover: {
                  bg: 'orange.100',
                },
              }}
            >
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
                {format(new Date(date), 'dd.MM.yyyy')}
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
      <Schedule dayId={dayId} startTime={startTime} endTime={endTime} />
    </>
  );
};

export default ScheduleDays;
