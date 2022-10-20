import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme';
import PropTypes from 'prop-types';

function CustomChakraProvider({ children, ...restProps }) {
  return (
    <ChakraProvider theme={theme} {...restProps}>
      {children}
    </ChakraProvider>
  );
}

CustomChakraProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CustomChakraProvider };
