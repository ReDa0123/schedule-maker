import { useTournamentSchedule } from '../hooks';
import { useMemo, useState } from 'react';
import { Schedule } from './index';
import { Heading, Tabs, TabList, Text, Link } from 'src/shared/design-system';
import { WithTooltip } from 'src/shared/design-system/molecules';
import { isNilOrEmpty } from 'ramda-extension';
import { AddDay, DayTabContent } from '../molecules';

const ScheduleDays = () => {
  const { days, detailMode } = useTournamentSchedule();
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedDay = useMemo(() => days[activeIndex], [days, activeIndex]);

  return !isNilOrEmpty(days) ? (
    <>
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
          You can add one <Link onClick={() => {}}>here</Link>.
        </Text>
      )}
    </>
  );
};

export default ScheduleDays;
