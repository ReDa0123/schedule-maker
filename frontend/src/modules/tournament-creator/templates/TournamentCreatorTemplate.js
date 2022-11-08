import SubHeader from 'src/shared/design-system/molecules/SubHeader';
import { ContentBox, Heading } from 'src/shared/design-system';
import {
  AddAreaForm,
  AddSportsForm,
  BasicTournamentForm,
  DayForm,
} from '../organisms';

export function TournamentCreatorTemplate() {
  return (
    <>
      <SubHeader title={'Create Tournament'} path="/tournaments-list" />
      <ContentBox>
        <Heading> Tournament settings </Heading>
        <BasicTournamentForm />
        <AddSportsForm />
        <AddAreaForm />
        <DayForm onSubmit={(data) => console.log(data)} />
      </ContentBox>
    </>
  );
}
