import { Button as ChakraButton } from '@chakra-ui/react';

export const Button = (props) => (
  <ChakraButton
    minW="150px"
    colorScheme="blue"
    fontWeight="500"
    textTransform="uppercase"
    boxShadow="lg"
    {...props}
  />
);
