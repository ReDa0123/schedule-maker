import { Box } from 'src/shared/design-system';
import { CreateNewButton } from '../atoms';
import { TournamentFilter } from './';
import { TournamentTable } from './';
import { useState } from 'react';
import PropTypes from 'prop-types';

const TournamentList = ({ tournaments }) => {
  const [{ globalFilter, setGlobalFilter, rowsLength }, setFilter] = useState({
    globalFilter: '',
  });
  return (
    <>
      <Box my={3}>
        <CreateNewButton />
      </Box>
      <TournamentFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
        tournaments={tournaments}
        rowsLength={rowsLength}
      />
      <TournamentTable data={tournaments} setFilter={setFilter} />
    </>
  );
};

TournamentList.propTypes = {
  tournaments: PropTypes.array.isRequired,
};

export default TournamentList;
