import { Form } from '../../../shared/react-hook-form/organisms';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  FormCheckbox,
  FormInput,
  FormSubmitButton,
} from '../../../shared/react-hook-form/molecules';
import { SimpleGrid } from 'src/shared/design-system/atoms';
import * as yup from 'yup';

const mockSports = [
  'Tennis',
  'Long jump',
  'Swimming',
  'High jump',
  'Chess',
  'Archery',
];

const defaultValues = {
  TournamentName: '',
  Location: '',
};

const validationSchema = yup.object().shape({
  TournamentName: yup.string().required('Plese enter tournament name'),
  Location: yup.string().required('Plese enter location'),
});

const BasicTournamentSettings = () => {
  return (
    <Form
      onSubmit={(data) => alert(JSON.stringify(data))}
      defaultValues={defaultValues}
      resolver={yupResolver(validationSchema)}
    >
      <FormInput name={'TournamentName'} label={'Tournament name'} />
      <FormInput name={'Location'} label={'Location'} />
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }}>
        {mockSports.map((sport) => (
          <FormCheckbox name={sport} label={sport} key={sport} />
        ))}
      </SimpleGrid>
      <FormSubmitButton title={'Save'} showAlert />
    </Form>
  );
};

export default BasicTournamentSettings;
