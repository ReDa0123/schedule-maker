import { ContentBox } from 'src/shared/design-system';
import { Form } from 'src/shared/react-hook-form/organisms';
import {
  FormInput,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';
import SubHeader from '../../../shared/design-system/molecules/SubHeader';

const TournamentCreatorPage = () => {
  return (
    <>
      <SubHeader title={'Create Tournament'} />
    <ContentBox>
      kontent pro tvorbu tournamentů
      <Form onSubmit={(data) => alert(JSON.stringify(data))}>
        <FormInput name={'Tournament name'} label={'Tournament name'} />
        <FormInput name={'Location'} label={'Location'} />
        <FormSubmitButton title={'Save'} showAlert />
      </Form>
    </ContentBox></>
  );
};

export default TournamentCreatorPage;
