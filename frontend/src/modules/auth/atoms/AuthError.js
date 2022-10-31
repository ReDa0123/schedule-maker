import { RouterLink } from 'src/shared/navigation';
import { Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const AuthError = ({ message, to = '/', linkMessage = 'Go to home page' }) => (
  <Box p={10}>
    <Text>{message}</Text>
    <RouterLink to={to}>{linkMessage}</RouterLink>
  </Box>
);

AuthError.propTypes = {
  message: PropTypes.string.isRequired,
  to: PropTypes.string,
  linkMessage: PropTypes.string,
};

export default AuthError;
