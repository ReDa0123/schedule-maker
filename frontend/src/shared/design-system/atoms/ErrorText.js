import { Text } from '../index';
import PropTypes from 'prop-types';

const ErrorText = ({ text, ...props }) => (
  <Text color="red" marginX="auto" {...props}>
    {text}
  </Text>
);

ErrorText.propTypes = {
  text: PropTypes.string.isRequired,
};

export { ErrorText };
