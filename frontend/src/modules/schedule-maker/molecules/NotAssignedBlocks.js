import { useWatch, Controller } from 'react-hook-form';
import { BLOCK_DND_NAME, SCHEDULE_FORM_NAME } from '../constants';
import { useDrop } from 'react-dnd';
import { Flex } from 'src/shared/design-system';
import { useFieldArrayProps } from '../hooks';
import { propEq } from 'ramda';
import { Block } from '../atoms';
import { isNilOrEmpty } from 'ramda-extension';

const NotAssignedBlocks = () => {
  const { fields } = useFieldArrayProps();
  const values = useWatch({ name: SCHEDULE_FORM_NAME, defaultValue: [] });

  const [{ isOver }, drop] = useDrop({
    accept: BLOCK_DND_NAME,
    drop: ({ onChange, value }) => {
      onChange({
        ...value,
        arenaId: null,
        dayId: null,
        startTime: null,
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Flex
      gap={2}
      borderWidth={1}
      borderColor="black"
      borderRadius="md"
      p={2}
      ref={drop}
      bg={isOver ? 'green.500' : 'white'}
      position={'sticky'}
      top={0}
      maxH={'25vh'}
      overflowY={'auto'}
      zIndex={1000}
    >
      {fields.map((field, index) => {
        if (isNilOrEmpty(values)) return null;
        const correspondingValue = values.find(
          propEq('blockId', field.blockId)
        );
        return (
          !correspondingValue?.startTime && (
            <Controller
              key={field.id}
              name={`schedule.${index}`}
              render={({ field: { onChange, value } }) => (
                <Block onChange={onChange} value={value} />
              )}
            />
          )
        );
      })}
    </Flex>
  );
};

export default NotAssignedBlocks;
