import SubHeader from 'src/shared/design-system/molecules/SubHeader';
import { ContentBox, Heading } from 'src/shared/design-system';
import { AddAreas, AddSports, BasicTournamentForm, Days } from '../organisms';

export function TournamentCreatorTemplate() {
  return (
    <>
      <SubHeader title={'Create Tournament'} path="/tournaments-list" />
      <ContentBox>
        <Heading> Tournament settings </Heading>
        <BasicTournamentForm />
        <AddSports />
        <AddAreas />
        <Days />
      </ContentBox>
    </>
  );
}
