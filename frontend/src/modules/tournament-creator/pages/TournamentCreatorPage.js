import { ContentBox, Stack } from 'src/shared/design-system';
import { DateSelection } from 'src/shared/design-system/organisms';
import { Form } from 'src/shared/react-hook-form/organisms';
import {
  FormInput,
  FormSubmitButton,
  FormCheckbox,
  FormSelect,
  FormNumberInput,
} from 'src/shared/react-hook-form/molecules';
import SubHeader from '../../../shared/design-system/molecules/SubHeader';


import { SimpleGrid } from '@chakra-ui/react';

const mockSports = [
  'Tennis',
  'Long jump',
  'Swimming',
  'High jump',
  'Chess',
  'Archery',
];

const mockAreaTypes = [
  { value: 1, label: 'Swimming pool' },
  { value: 2, label: 'Jump track' },
  { value: 3, label: 'Hall' },
];

const TournamentCreatorPage = () => {
  return (
    <>
      <SubHeader title={'Create Tournament'} />
    <ContentBox>
      Tournament settings
      <Form onSubmit={(data) => alert(JSON.stringify(data))}>
        <FormInput name={'Tournament na()me'} label={'Tournament name'} />
        <FormInput name={'Location'} label={'Location'} />
        <label> Sports selection </label>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }}>
          {mockSports.map((sport) => (
            <FormCheckbox name={sport} label={sport} key={sport} />
          ))}
        </SimpleGrid>
        <FormSubmitButton title={'Save'} showAlert />
      </Form>
      <Form onSubmit={(data) => alert(JSON.stringify(data))}>
        <Stack direction={'row'}>
          <FormSelect
            name={'AreaTypeSelection'}
            options={mockAreaTypes}
            label={'Select area type'}
          />
          <FormNumberInput name={'AreaCapacity'} label={'Capacity'} />
        </Stack>
        <FormSubmitButton title={'Add'} showAlert />
      </Form>
      <DateSelection />
    </ContentBox></>
  );
};

export default TournamentCreatorPage;
