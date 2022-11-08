import { Tab as ChakraTab } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const Tab = forwardRef((props, ref) => (
  <ChakraTab
    display="flex"
    flexDir="column"
    borderTopRadius="md"
    overflow="hidden"
    maxW="250px"
    minW="150px"
    bg="white"
    _hover={{
      bg: 'orange.50',
    }}
    _selected={{
      bg: 'orange.100',
      boxShadow: 'xl',
      _hover: {
        bg: 'orange.100',
      },
    }}
    ref={ref}
    {...props}
  />
));
