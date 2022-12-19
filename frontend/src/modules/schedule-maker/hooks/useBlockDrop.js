import { useFormContext } from 'react-hook-form';
import { useDrop } from 'react-dnd';
import { BLOCK_DND_NAME, SCHEDULE_FORM_NAME } from '../constants';

export const useBlockDrop = (index, value, isDetailedDisplay) => {
  const formContext = useFormContext();

  return useDrop({
    accept: BLOCK_DND_NAME,
    drop: ({ onChange: onDropChange, value: dropValue }) => {
      const blocks = formContext?.getValues(SCHEDULE_FORM_NAME);
      const oldValue = { ...blocks[index] };
      blocks.forEach(({ orderIndex, dayId, versionId, areaId, blockId }, i) => {
        if (
          orderIndex !== null &&
          dayId === oldValue.dayId &&
          versionId === oldValue.versionId &&
          areaId === oldValue.areaId &&
          orderIndex >= oldValue.orderIndex &&
          blockId !== dropValue.blockId
        ) {
          setTimeout(() => {
            formContext?.setValue(
              `${SCHEDULE_FORM_NAME}.${i}.orderIndex`,
              orderIndex + 1
            );
          }, 0);
        }
      });
      setTimeout(
        () =>
          onDropChange({
            ...dropValue,
            dayId: oldValue.dayId,
            areaId: oldValue.areaId,
            orderIndex: oldValue.orderIndex,
            startTime: null,
          }),
        0
      );
    },
    canDrop: () => value.orderIndex !== null && isDetailedDisplay,
    collect: (monitor) => ({
      isOver: !!monitor.isOver() && !!monitor.canDrop(),
    }),
  });
};
