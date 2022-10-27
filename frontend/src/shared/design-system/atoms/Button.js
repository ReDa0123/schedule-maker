import { Button as ChakraButton } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const Button = forwardRef((props, ref) => (
  <ChakraButton
    minW="150px"
    colorScheme="blue"
    fontWeight="500"
    textTransform="uppercase"
    boxShadow="lg"
    ref={ref}
    {...props}
  />
));
