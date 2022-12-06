import { TournamentListTemplate } from '../templates';
import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useAuth } from '../../auth';
import { sort } from 'ramda';

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
  const auth = useAuth();
  const userId = Number(auth?.user?.userId);
  const tournaments = useMemo(() => {
    const sortFn = !isNaN(userId)
      ? (
          { userId: userId1, tournamentId: tournamentId1 },
          { userId: userId2, tournamentId: tournamentId2 }
        ) =>
          (userId1 === userId && userId2 === userId) ||
          (userId1 !== userId && userId2 !== userId)
            ? tournamentId2 - tournamentId1
            : userId1 === userId
            ? -1
            : 1
      : (a, b) => b.tournamentId - a.tournamentId;
    return sort(sortFn, tournamentsFetcher.data?.tournaments ?? []);
  }, [userId, tournamentsFetcher]);

  return (
    <TournamentListTemplate
      tournaments={tournaments}
      isLoading={tournamentsFetcher.loading}
      error={tournamentsFetcher.error}
    />
  );
};

export default TournamentsListPage;
