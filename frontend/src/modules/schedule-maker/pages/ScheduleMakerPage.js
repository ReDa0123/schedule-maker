import { isNilOrEmpty } from 'ramda-extension';
import { ScheduleMakerTemplate } from '../templates';
import TournamentScheduleContext from '../contexts/TournamentScheduleContext';
import { NotFoundPage } from 'src/shared/navigation';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';

const GET_TOURNAMENT_QUERY = gql`
  query Tournament($tournamentId: Int!) {
    tournament(tournamentId: $tournamentId) {
      tournamentId
      name
      location
      startDate
      endDate
      userId
      sports {
        sportId
        name
      }
      areas {
        areaId
        name
      }
      days {
        dayId
        date
        description
        startTime
        endTime
      }
      blocks {
        blockId
        startTime
        persons
        style
        category
        sex
        age
        customParameter
        tournamentId
        dayId
        areaId
        sportId
      }
    }
  }
`;

const ScheduleMakerPage = ({ edit }) => {
  const { tournamentId } = useParams();
  const tournamentFetcher = useQuery(GET_TOURNAMENT_QUERY, {
    variables: { tournamentId },
  });

  return tournamentFetcher.data &&
    isNilOrEmpty(tournamentFetcher.data.tournament) ? (
    <NotFoundPage />
  ) : (
    <TournamentScheduleContext
      tournament={tournamentFetcher.data.tournament}
      edit={edit}
    >
      <ScheduleMakerTemplate
        isLoading={tournamentFetcher.loading}
        error={tournamentFetcher.error}
      />
    </TournamentScheduleContext>
  );
};

ScheduleMakerPage.propTypes = {
  edit: PropTypes.bool,
};

export default ScheduleMakerPage;
