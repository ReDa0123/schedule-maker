import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ErrorTag = ({ value, children }) => (
  <Box
    bg="red.500"
    color="white"
    position="absolute"
    px="0.5em"
    py="0.25em"
    borderRadius="6px"
    fontSize="sm"
    top="-10px"
    right="-10px"
  >
    {children || value}
  </Box>
);

ErrorTag.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};

export default ErrorTag;
