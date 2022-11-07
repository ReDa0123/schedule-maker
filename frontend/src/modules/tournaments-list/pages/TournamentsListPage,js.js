import { TournamentListTemplate } from '../templates';
import { gql, useQuery } from '@apollo/client';

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

const TournamentsListPage = () => {
  const tournamentsFetcher = useQuery(GET_TOURNAMENTS_QUERY);

  return (
    <TournamentListTemplate
      tournaments={tournamentsFetcher.data?.tournaments}
      isLoading={tournamentsFetcher.loading}
      error={tournamentsFetcher.error}
    />
  );
};

export default TournamentsListPage;
