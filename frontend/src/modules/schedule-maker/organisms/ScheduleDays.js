import { useTournamentSchedule } from '../hooks';
import { useMemo, useState } from 'react';
import { Schedule } from './index';
import {
  Heading,
  Tabs,
  TabList,
  Text,
  Link,
  Flex,
} from 'src/shared/design-system';
import { WithTooltip } from 'src/shared/design-system/molecules';
import { isNilOrEmpty } from 'ramda-extension';
import { AddDay, DayTabContent } from '../molecules';
import { useNavigate } from 'react-router-dom';
import { route } from '../../../Routes';
import DisplayChangeButtons from '../molecules/DisplayChangeButtons';

const ScheduleDays = () => {
  const {
    days,
    detailMode,
    tournament: { tournamentId },
  } = useTournamentSchedule();
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedDay = useMemo(() => days[activeIndex], [days, activeIndex]);
  const navigate = useNavigate();

  return !isNilOrEmpty(days) ? (
    <>
      <Flex w="100%" justifyContent="space-between">
        {detailMode ? (
          <Heading fontSize={24} mb={4}>
            Days of the tournament
          </Heading>
        ) : (
          <WithTooltip
            label="While dragging a block, you can hover over a day tab to change the active day."
            standalone
            mb={4}
          >
            <Heading fontSize={24}>Days of the tournament</Heading>
          </WithTooltip>
        )}
        <DisplayChangeButtons />
      </Flex>
      <Tabs index={activeIndex} onChange={setActiveIndex} overflow="auto">
        <TabList>
          {days.map(({ dayId, date, description }, index) => (
            <DayTabContent
              key={dayId}
              description={description}
              date={date}
              setIndex={setActiveIndex}
              index={index}
            />
          ))}
          {!detailMode && (
            <WithTooltip label="Add new day">
              <AddDay />
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
          You can add one{' '}
          <Link
            onClick={() => {
              navigate(route.tournamentCreator({ id: tournamentId }));
            }}
          >
            here
          </Link>
          .
        </Text>
      )}
    </>
  );
};

export default ScheduleDays;
