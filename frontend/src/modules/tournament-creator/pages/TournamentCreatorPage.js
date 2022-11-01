import { ContentBox } from 'src/shared/design-system';
import { Form } from 'src/shared/react-hook-form/organisms';
import {
  FormInput,
  FormSubmitButton,
  FormCheckbox,
} from 'src/shared/react-hook-form/molecules';

import { SimpleGrid } from '@chakra-ui/react';

const mockSports = [
  'Tennis',
  'Long jump',
  'Swimming',
  'High jump',
  'Chess',
  'Archery',
];
import SubHeader from '../../../shared/design-system/molecules/SubHeader';

const TournamentCreatorPage = () => {
  return (
    <>
      <SubHeader title={'Create Tournament'} />
    <ContentBox>
      Tournament settings
      <Form onSubmit={(data) => alert(JSON.stringify(data))}>
        <FormInput name={'Tournament na()me'} label={'Tournament name'} />
        <FormInput name={'Location'} label={'Location'} />
        <SimpleGrid columns={4}>
          {mockSports.map((sport) => (
            <FormCheckbox name={sport} label={sport} key={sport} />
          ))}
        </SimpleGrid>
        <FormSubmitButton title={'Save'} showAlert />
      </Form>
    </ContentBox></>
  );
};

export default TournamentCreatorPage;
