import { Box } from 'src/shared/design-system';
import { CreateNewButton } from '../atoms';
import { TournamentFilter } from './';
import { TournamentTable } from './';
import { useState } from 'react';
import PropTypes from 'prop-types';

const TournamentList = ({ tournaments, isListPage = true }) => {
  const [{ globalFilter, setGlobalFilter, rowsLength }, setFilter] = useState({
    globalFilter: '',
  });
  return (
    <>
      {isListPage && (
        <Box my={3}>
          <CreateNewButton />
        </Box>
      )}
      <TournamentFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
        tournaments={tournaments}
        rowsLength={rowsLength}
        isListPage={isListPage}
      />
      <TournamentTable
        data={tournaments}
        setFilter={setFilter}
        showPagination={isListPage}
      />
    </>
  );
};

TournamentList.propTypes = {
  tournaments: PropTypes.array.isRequired,
  isListPage: PropTypes.bool,
};

export default TournamentList;
