import { useScheduleDetail } from './useScheduleDetail';
import { BLOCK_SCALE, MINUTES_IN_BLOCK, TABLE_TOP_PADDING } from '../constants';
import { Block } from '../atoms';

export const useDetailBlocksInArea = ({ areaId, dayId, startTime }) => {
  const { filteredBlocks: blocks } = useScheduleDetail();
  const blocksInArea = blocks.filter(
    (block) => block.areaId === areaId && block.dayId === dayId
  );

  return {
    blocksInArea: blocksInArea.map((block) => (
      <Block
        key={block.blockId}
        value={block}
        pointerEvents="none"
        position="absolute"
        top={`${
          ((block.startTime - startTime) * BLOCK_SCALE) / MINUTES_IN_BLOCK +
          TABLE_TOP_PADDING
        }px`}
        left="50%"
        transform="translateX(-50%)"
      />
    )),
  };
};
