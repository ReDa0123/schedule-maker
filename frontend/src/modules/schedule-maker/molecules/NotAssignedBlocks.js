import { useWatch, Controller } from 'react-hook-form';
import { BLOCK_DND_NAME, SCHEDULE_FORM_NAME } from '../constants';
import { useDrop } from 'react-dnd';
import { Box, Flex, Text, IconButton } from 'src/shared/design-system';
import { useFieldArrayProps, useSelectedVersion } from '../hooks';
import { propEq } from 'ramda';
import { Block } from '../molecules';
import { isNilOrEmpty } from 'ramda-extension';
import { useMemo, useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { NotAssignedBlocksTag } from '../atoms';

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
                  isDetailedDisplay
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
        left="305px"
        transform={`translate(${open ? 0 : -305}px, -50%)`}
        transition="transform 500ms ease-out"
        zIndex={1000}
      >
        <IconButton
          aria-label="open-close-not-assigned"
          icon={open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          colorScheme="blue"
          onClick={() => setOpen((prev) => !prev)}
          h="100px"
          borderBottomLeftRadius="none"
          borderTopLeftRadius="none"
        />
        <NotAssignedBlocksTag
          value={notAssignedBlocks.filter((e) => e).length}
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
        w="300px"
        borderRadius="lg"
        transform={`translateX(${open ? 0 : -101.5}%)`}
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
