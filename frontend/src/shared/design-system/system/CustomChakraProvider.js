import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../theme';

export function CustomChakraProvider({ children, ...restProps }) {
  return (
    <ChakraProvider theme={theme} {...restProps}>
      {children}
    </ChakraProvider>
  );
}
