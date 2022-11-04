import { Tab as ChakraTab } from '@chakra-ui/react';

export const Tab = (props) => (
  <ChakraTab
    display="flex"
    flexDir="column"
    borderTopRadius="md"
    overflow="hidden"
    maxW="250px"
    minW="150px"
    _hover={{
      bg: 'orange.50',
    }}
    _selected={{
      bg: 'orange.100',
      _hover: {
        bg: 'orange.100',
      },
    }}
    {...props}
  />
);
