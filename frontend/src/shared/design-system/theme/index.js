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
  breakpoints: {
    sm: '560px',
    md: '840px',
    lg: '960px',
    ll: '1050px',
    xl: '1200px',
    '2xl': '1536px',
  },
});
