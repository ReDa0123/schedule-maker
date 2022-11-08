import SubHeader from '../../../shared/design-system/molecules/SubHeader';
import { ContentBox, Heading } from '../../../shared/design-system';
import { AddAreaForm, BasicTournamentSettings, DayForm } from '../organisms';

export function TournamentCreatorTemplate() {
  return (
    <>
      <SubHeader title={'Create Tournament'} path="/tournaments-list" />
      <ContentBox>
        <Heading> Tournament settings </Heading>
        <BasicTournamentSettings />
        <AddAreaForm />
        <DayForm onSubmit={(data) => console.log(data)} />
      </ContentBox>
    </>
  );
}
