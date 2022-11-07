import { Box, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { TournamentListHeading } from '../atoms';
import { useRef } from 'react';
import { SelectiveFiltering } from '../molecules';

const TournamentFilter = ({ filter, setFilter }) => {
  const selectRef = useRef('');
  return (
    <Box mb="50px" mt="30px">
      <TournamentListHeading>Filter</TournamentListHeading>
      <SelectiveFiltering
        mt={4}
        mb={4}
        selectRef={selectRef}
        setFilter={setFilter}
      />
      <TournamentListHeading mb={4}>Search</TournamentListHeading>
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
