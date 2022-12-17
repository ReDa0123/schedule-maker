import { useWatch, Controller } from 'react-hook-form';
import { BLOCK_DND_NAME, SCHEDULE_FORM_NAME } from '../constants';
import { useDrop } from 'react-dnd';
import { Box, Flex, Text } from 'src/shared/design-system';
import { useFieldArrayProps, useSelectedVersion } from '../hooks';
import { propEq } from 'ramda';
import { Block, NotAssignedBlocksButton } from '../molecules';
import { isNilOrEmpty } from 'ramda-extension';
import { useMemo, useState } from 'react';

const WIDTH = 315;

const NotAssignedBlocks = () => {
  const [open, setOpen] = useState(false);
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

  const notAssignedBlocks = useMemo(
    () =>
      fields.map((field, index) => {
        if (isNilOrEmpty(values)) return null;
        const correspondingValue = values.find(
          propEq('blockId', field.blockId)
        );
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
                  marginX="auto"
                />
              )}
            />
          )
        );
      }),
    [fields, values, selectedVersion]
  );

  return (
    <>
      <Box
        position="fixed"
        top="50%"
        left={`${WIDTH + 5}px`}
        transform={`translate(${open ? 0 : -(WIDTH + 5)}px, -50%)`}
        transition="transform 500ms ease-out"
        zIndex={1000}
      >
        <NotAssignedBlocksButton
          setOpen={setOpen}
          numberOfBlocks={notAssignedBlocks.filter((e) => e).length}
          open={open}
        />
      </Box>
      <Flex
        gap={2}
        flexDirection="column"
        borderWidth="3px"
        borderColor="blue.500"
        p={2}
        ref={drop}
        bg={isOver ? 'green.500' : 'white'}
        position="fixed"
        top="5vh"
        left="5px"
        h="90vh"
        overflow="auto"
        zIndex={1000}
        w={`${WIDTH}px`}
        borderRadius="lg"
        transform={`translateX(${open ? 0 : -(WIDTH + 5)}px)`}
        transition="transform 500ms ease-out"
      >
        <Text
          fontWeight={600}
          fontSize="20px"
          borderColor="blue.500"
          borderBottomWidth="3px"
        >
          Not assigned blocks
        </Text>
        {notAssignedBlocks}
      </Flex>
    </>
  );
};

export default NotAssignedBlocks;
