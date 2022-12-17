import SubHeader from 'src/shared/design-system/molecules/SubHeader';
import { ContentBox, Heading, Flex, Button } from 'src/shared/design-system';
import { AddAreas, AddSports, BasicTournament, Days } from '../organisms';
import { RouterLink } from 'src/shared/navigation';
import { DeleteTournamentButton } from '../molecules';
import { route } from 'src/Routes';
import PropTypes from 'prop-types';

export function TournamentCreatorTemplate({ tournament }) {
  const { tournamentId, startDate } = tournament;
  return (
    <>
      <SubHeader title="Create Tournament" path="/tournaments-list" />
      <ContentBox>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>Tournament settings</Heading>
          <Flex gap={4}>
            <RouterLink
              color="white"
              _hover={{ textDecoration: 'none' }}
              to={route.scheduleMakerEdit({ id: tournamentId })}
            >
              <Button>Edit Tournament Schedule</Button>
            </RouterLink>
            <DeleteTournamentButton tournamentId={tournamentId} />
          </Flex>
        </Flex>
        <BasicTournament tournament={tournament} />
        <AddSports tournamentId={tournamentId} />
        <AddAreas tournamentId={tournamentId} />
        <Days tournamentId={tournamentId} startDate={startDate} />
      </ContentBox>
    </>
  );
}

TournamentCreatorTemplate.propTypes = {
  tournament: PropTypes.object,
};
