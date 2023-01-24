import { useScheduleDetail } from './useScheduleDetail';
import {
  BLOCK_OFFSET,
  BLOCK_SCALE,
  MINUTES_IN_BLOCK,
  TABLE_TOP_PADDING,
} from '../constants';
import { Block } from '../molecules';

export const useDetailBlocksInArea = ({
  areaId,
  dayId,
  startTime,
  isDetailedDisplay,
  flexible,
}) => {
  const absolutePosition = isDetailedDisplay && !flexible;
  const { filteredBlocks: blocks } = useScheduleDetail();
  const blocksInArea = blocks.filter(
    (block) => block.areaId === areaId && block.dayId === dayId
  );
  return blocksInArea.map((block) => (
    <Block
      key={block.blockId}
      value={block}
      position={absolutePosition ? 'absolute' : 'relative'}
      top={
        absolutePosition
          ? `${
              ((block.startTime - startTime) * BLOCK_SCALE) / MINUTES_IN_BLOCK +
              TABLE_TOP_PADDING +
              BLOCK_OFFSET
            }px`
          : undefined
      }
      left={absolutePosition ? '50%' : undefined}
      transform={absolutePosition ? 'translateX(-50%)' : undefined}
      isDetailedDisplay={isDetailedDisplay}
    />
  ));
};
