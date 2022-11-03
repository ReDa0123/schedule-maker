import { ContentBox, Stack, Heading } from 'src/shared/design-system';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateSelection } from '../organisms';
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
const defaultValues = {
  TournamentName: '',
  Location: '',
};

const validationSchema = yup.object().shape({
  TournamentName: yup.string().required('Plese enter tournament name'),
  Location: yup.string().required('Plese enter location'),
});

const areaValidationSchema = yup.object().shape({
  AreaTypeSelection: yup.number().required('Please select area type'),
  AreaCapacity: yup.number().required('Please enter area capacity'),
});

const TournamentCreatorPage = () => {
  return (
    <>
      <SubHeader title={'Create Tournament'} path="/tournaments-list" />
      <ContentBox>
        <Heading> Tournament settings </Heading>

        <Form
          onSubmit={(data) => alert(JSON.stringify(data))}
          defaultValues={defaultValues}
          resolver={yupResolver(validationSchema)}
        >
          <FormInput name={'TournamentName'} label={'Tournament name'} />
          <FormInput name={'Location'} label={'Location'} />
          <SimpleGrid columns={4}>
            {mockSports.map((sport) => (
              <FormCheckbox name={sport} label={sport} key={sport} />
            ))}
          </SimpleGrid>
          <FormSubmitButton title={'Save'} showAlert />
        </Form>

        <Form
          onSubmit={(data) => alert(JSON.stringify(data))}
          resolver={yupResolver(areaValidationSchema)}
        >
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
      </ContentBox>
    </>
  );
};

export default TournamentCreatorPage;
