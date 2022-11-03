import { ContentBox } from 'src/shared/design-system';
import { Box } from '@chakra-ui/react';
import CreateNewButton from '../atoms/CreateNewButton';
import TournamentTable from '../organisms/TournamentTable';
import TournamentListHeading from '../atoms/TournamentListHeading';
import { useState } from 'react';
import TournamentFilter from '../organisms/TournamentFilter';

const TournamentsListPage = () => {
  const [filter, setFilter] = useState({});

  return (
    <ContentBox>
      <TournamentListHeading big>Tournaments</TournamentListHeading>

      <Box my={3}>
        <CreateNewButton />
      </Box>

      <TournamentFilter
        filter={filter.globalFilter}
        setFilter={filter.setGlobalFilter}
      />
      <TournamentTable setFilter={setFilter} />
    </ContentBox>
  );
};

export default TournamentsListPage;
