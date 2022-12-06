import { useScheduleDetail } from './useScheduleDetail';
import {
  BLOCK_OFFSET,
  BLOCK_SCALE,
  MINUTES_IN_BLOCK,
  SCHEDULE_DETAILED_DISPLAY,
  TABLE_TOP_PADDING,
} from '../constants';
import { Block } from '../molecules';
import { useScheduleDisplayMode } from './';

export const useDetailBlocksInArea = ({ areaId, dayId, startTime }) => {
  const { filteredBlocks: blocks } = useScheduleDetail();
  const blocksInArea = blocks.filter(
    (block) => block.areaId === areaId && block.dayId === dayId
  );
  const { displayMode } = useScheduleDisplayMode();
  const isDetailedDisplay = displayMode === SCHEDULE_DETAILED_DISPLAY;

  return blocksInArea.map((block) => (
    <Block
      key={block.blockId}
      value={block}
      pointerEvents="none"
      position={isDetailedDisplay ? 'absolute' : 'relative'}
      top={
        isDetailedDisplay
          ? `${
              ((block.startTime - startTime) * BLOCK_SCALE) / MINUTES_IN_BLOCK +
              TABLE_TOP_PADDING +
              BLOCK_OFFSET
            }px`
          : undefined
      }
      left={isDetailedDisplay ? '50%' : undefined}
      transform={isDetailedDisplay ? 'translateX(-50%)' : undefined}
      isDetailedDisplay={isDetailedDisplay}
    />
  ));
};
