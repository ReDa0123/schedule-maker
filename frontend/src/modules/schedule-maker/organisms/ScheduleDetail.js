import { ScheduleDetailContext } from '../contexts';
import { BlockFilter } from '../molecules';
import { ContentBox } from 'src/shared/design-system';
import { ScheduleDays } from './index';

const ScheduleDetail = () => {
  return (
    <ScheduleDetailContext>
      <ContentBox>
        <BlockFilter />
      </ContentBox>
      <ContentBox minW="70%" maxW="95vw">
        <ScheduleDays />
      </ContentBox>
    </ScheduleDetailContext>
  );
};

export default ScheduleDetail;
