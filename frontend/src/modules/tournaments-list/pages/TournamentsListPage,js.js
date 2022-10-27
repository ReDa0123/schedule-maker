import { ContentBox } from 'src/shared/design-system';
import { RouterLink } from 'src/shared/navigation';
import { Box, Heading } from '@chakra-ui/react';
import CreateNewButton from '../atoms/CreateNewButton';
import TournamentTable from '../organisms/TournamentTable';

const TournamentsListPage = () => {
  return (
    <ContentBox>
      <Heading as="h2" fontSize={24}>
        Tournaments
      </Heading>
      <Box my={3}>
        <CreateNewButton />
      </Box>

      <br />
      <RouterLink to="/schedule-maker/1?detailmode=true">
        Tournamnet no. 001
      </RouterLink>
      <br />
      <RouterLink to="/schedule-maker/1?detailmode=false">
        Tournamnet no. 002
      </RouterLink>

      <Heading as="h2" fontSize={18}>
        List of Tournaments
      </Heading>

      <TournamentTable />
    </ContentBox>
  );
};

export default TournamentsListPage;
