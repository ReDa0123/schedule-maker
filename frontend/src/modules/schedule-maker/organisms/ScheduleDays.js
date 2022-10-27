import { useTournamentSchedule } from '../hooks';
import { useState } from 'react';
import { Schedule } from './index';
import {
  Box,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from 'src/shared/design-system';
import { format } from 'date-fns';
import { AddIcon } from '@chakra-ui/icons';

const ScheduleDays = () => {
  const { days, detailMode } = useTournamentSchedule();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Tabs index={activeIndex} onChange={setActiveIndex}>
      <TabList>
        {days.map(({ dayId, date, description }) => (
          <Tab
            key={dayId}
            display="flex"
            flexDir="column"
            borderTopRadius="md"
            overflow="hidden"
            maxW="250px"
            _selected={{
              bg: 'orange.100',
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
          <IconButton
            variant="outline"
            aria-label="Add day"
            icon={<AddIcon />}
            bg="none"
            color="blue.500"
            marginY="auto"
            ml={4}
          />
        )}
      </TabList>
      <TabPanels>
        {days.map(({ dayId, startTime, endTime }) => (
          <TabPanel key={dayId} p={0}>
            <Schedule dayId={dayId} startTime={startTime} endTime={endTime} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default ScheduleDays;