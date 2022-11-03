import { Box, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import TournamentListHeading from '../atoms/TournamentListHeading';
import { useRef } from 'react';
import SelectiveFiltering from '../molecules/SelectiveFiltering';

const TournamentFilter = ({ filter, setFilter }) => {
  const selectRef = useRef('');
  return (
    <Box mb="100px" mt="30px">
      <SelectiveFiltering
        mt="60px"
        mb="60px"
        selectRef={selectRef}
        setFilter={setFilter}
      />

      <TournamentListHeading mt="10px" mb="10px">
        Search
      </TournamentListHeading>
      <Input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          selectRef.current.value = '';
        }}
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
