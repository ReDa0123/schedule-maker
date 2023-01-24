import { Box, Button, ContentBox, Heading } from 'src/shared/design-system';
import { Flex } from '@chakra-ui/react';
import { route } from '../../../Routes';
import { RouterLink } from '../../../shared/navigation';
import HomeScreenImg from '../../../shared/design-system/svgs/HomeScreenImg';
import { gql, useQuery } from '@apollo/client';
import { slice, sort } from 'ramda';
import { useMemo } from 'react';
import { TournamentList } from '../../tournaments-list/organisms';
import { useAuth } from '../../auth';

const GET_TOURNAMENTS_QUERY = gql`
  query Tournaments {
    tournaments {
      tournamentId
      name
      location
      startDate
      endDate
      userId
    }
  }
`;

export function AboutTemplate() {
  const tournamentsFetcher = useQuery(GET_TOURNAMENTS_QUERY);
  const auth = useAuth();
  const tournaments = useMemo(() => {
    const sortFn = (a, b) => b.startDate - a.startDate;
    return sort(sortFn, tournamentsFetcher.data?.tournaments ?? []);
  }, [tournamentsFetcher]);

  return (
    <>
      <ContentBox>
        <Flex direction="column" alignItems="center">
          <Box mx="auto" mt="12" mb="8">
            <Heading fontSize="3xl">
              <Flex>
                <Box mr="0.5rem">Creating event schedules</Box>
                <Box color="blue.400">made easy</Box>
              </Flex>
            </Heading>
          </Box>

          <Box maxW="40rem" mx="auto" color="grey" mb="6" textAlign="center">
            <Box>
              Excel sheets, random papers and chaos are only a past nightmare.
            </Box>
            <Box>
              Create new event here, import your data and start playing with the
              schedule categories, times, places, rings , or whatever you need
              to call them. We got you covered
            </Box>
          </Box>

          <RouterLink
            _hover={{ textDecoration: 'none' }}
            to={
              auth?.user?.userId ? route.tournamentsList(true) : route.login()
            }
            mb="12"
          >
            <Button>Create your event schedule</Button>
          </RouterLink>

          <Box mb="24">
            <HomeScreenImg />
          </Box>

          <Heading fontSize="2xl">Upcoming of Tournaments</Heading>
          <Box mb="6">
            <TournamentList
              tournaments={slice(0, 5, tournaments)}
              isListPage={false}
            />
          </Box>

          <RouterLink
            _hover={{ textDecoration: 'none' }}
            to={route.tournamentsList()}
            mb="3rem"
          >
            <Button>Show more</Button>
          </RouterLink>
        </Flex>
      </ContentBox>
    </>
  );
}
