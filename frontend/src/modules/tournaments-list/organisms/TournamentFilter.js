import { Box, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { TournamentListHeading } from '../atoms';
import { useMemo, useRef } from 'react';
import { SelectiveFiltering } from '../molecules';
import { o, pluck, uniq } from 'ramda';
import { isNilOrEmpty } from 'ramda-extension';

const TournamentFilter = ({
  filter = '',
  setFilter,
  tournaments,
  rowsLength,
}) => {
  const selectRef = useRef('');
  const locations = useMemo(
    () => o(uniq, pluck('location'))(tournaments),
    [tournaments]
  );

  return (
    <Box mb="50px" mt="30px">
      <TournamentListHeading>Filter</TournamentListHeading>
      <SelectiveFiltering
        mt={4}
        mb={4}
        selectRef={selectRef}
        setFilter={setFilter}
        locations={locations}
      />
      <TournamentListHeading mb={4}>
        {`Search${
          !isNilOrEmpty(filter)
            ? ` (Currently showing ${rowsLength} tournaments)`
            : ''
        }`}
      </TournamentListHeading>
      <Input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          selectRef.current.value = '';
        }}
        placeholder="Search by title or location"
        maxW="600px"
      />
    </Box>
  );
};

TournamentFilter.propTypes = {
  filter: PropTypes.any,
  setFilter: PropTypes.any,
  tournaments: PropTypes.array,
  rowsLength: PropTypes.number,
};

export default TournamentFilter;
