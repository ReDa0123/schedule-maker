import { Box, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const TournamentFilter = ({ filter, setFilter }) => {
  return (
    <Box mb="100px">
      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search"
        maxW="600px"
      />
    </Box>
  );
};

TournamentFilter.propTypes = {
  filter: PropTypes.any,
  setFilter: PropTypes.any,
};

export default TournamentFilter;
