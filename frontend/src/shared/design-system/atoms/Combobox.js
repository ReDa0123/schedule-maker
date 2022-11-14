import React, { forwardRef } from 'react';
import { Autocomplete } from 'chakra-ui-simple-autocomplete';
import { CheckCircleIcon, CloseIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Badge, Text } from '@chakra-ui/react';
import WithTooltip from '../molecules/WithTooltip';

const renderComboboxBadge = (option) => (
  <WithTooltip label="Remove">
    <Badge
      borderRadius="full"
      px="2"
      bg="blue.500"
      color="white"
      mx={1}
      cursor="pointer"
      _hover={{
        bg: 'blue.600',
      }}
    >
      {option.label}
      <CloseIcon ml={1} w={2} h={2} mb="4px" />
    </Badge>
  </WithTooltip>
);

export const Combobox = forwardRef((props, ref) => (
  <Autocomplete
    renderCreateIcon={() => (
      <>
        <SmallAddIcon color="blue.500" mr={2} />
        <Text>Create new</Text>
      </>
    )}
    renderCheckIcon={() => <CheckCircleIcon color="blue.500" mr={2} />}
    borderWidth={2}
    borderColor="blue.500"
    _hover={{ borderColor: 'blue.700' }}
    renderBadge={renderComboboxBadge}
    ref={ref}
    {...props}
  />
));
