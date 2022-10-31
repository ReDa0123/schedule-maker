import { Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const TournamentListHeading = ({ big, ...props }) => {
  return (
    <Heading as="h2" fontSize={big ? 32 : 25} {...props}>
      {props.children}
    </Heading>
  );
};

TournamentListHeading.propTypes = {
  big: PropTypes.bool,
  children: PropTypes.string,
};

export default TournamentListHeading;
