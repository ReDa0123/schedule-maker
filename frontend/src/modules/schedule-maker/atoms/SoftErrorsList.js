import { UnorderedList, ListItem, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SoftErrorsList = ({ errors }) => {
  return (
    <>
      <UnorderedList>
        {errors.map(({ message }) => (
          <ListItem key={message}>{message}</ListItem>
        ))}
      </UnorderedList>
      <Text mt={2}>
        If there were no other errors, these blocks were also created.
      </Text>
    </>
  );
};

SoftErrorsList.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      severity: PropTypes.oneOf(['warn']).isRequired,
    })
  ).isRequired,
};

export default SoftErrorsList;
