import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  // see: https://chakra-ui.com/docs/styled-system/customize-theme
  components: {
    Link: {
      baseStyle: {
        color: 'blue.600',
      },
    },
  },
});
