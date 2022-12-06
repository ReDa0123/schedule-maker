import { useWatch, Controller } from 'react-hook-form';
import { BLOCK_DND_NAME, SCHEDULE_FORM_NAME } from '../constants';
import { useDrop } from 'react-dnd';
import { Flex } from 'src/shared/design-system';
import { useFieldArrayProps, useSelectedVersion } from '../hooks';
import { propEq } from 'ramda';
import { Block } from '../molecules';
import { isNilOrEmpty } from 'ramda-extension';
import { useMemo } from 'react';

const NOT_ASSIGNED_BLOCKS_HEIGHT = 200;

const NotAssignedBlocks = () => {
  const { fields } = useFieldArrayProps();
  const values = useWatch({ name: SCHEDULE_FORM_NAME, defaultValue: [] });
  const selectedVersion = useSelectedVersion();

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

  const notAssignedBlocks = useMemo(() => {
    return fields.map((field, index) => {
      if (isNilOrEmpty(values)) return null;
      const correspondingValue = values.find(propEq('blockId', field.blockId));
      return (
        !correspondingValue?.startTime &&
        correspondingValue?.versionId === selectedVersion && (
          <Controller
            key={field.id}
            name={`schedule.${index}`}
            render={({ field: { onChange, value } }) => (
              <Block
                onChange={onChange}
                value={value}
                index={index}
                isDetailedDisplay
              />
            )}
          />
        )
      );
    });
  }, [fields, values, selectedVersion]);

  return (
    <Flex
      gap={2}
      borderWidth="3px"
      borderColor="blue.500"
      p={2}
      ref={drop}
      bg={isOver ? 'green.500' : 'white'}
      position="sticky"
      top={0}
      h={`${NOT_ASSIGNED_BLOCKS_HEIGHT}px`}
      overflowY="auto"
      zIndex={1000}
      maxW="min(1000px, calc(100% - 32px))"
      marginX={{ base: '16px', ll: 'auto' }}
      w="100%"
      borderRadius="lg"
    >
      {notAssignedBlocks}
    </Flex>
  );
};

export default NotAssignedBlocks;
