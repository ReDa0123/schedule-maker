import { Form } from '../../../shared/react-hook-form/organisms';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  FormInput,
  FormSubmitButton,
} from '../../../shared/react-hook-form/molecules';

import * as yup from 'yup';
import Combobox from '../../../shared/react-hook-form/molecules/Combobox';

const mockSports = [
  { value: 1, label: 'Tennis' },
  { value: 2, label: 'Long jump' },
  { value: 3, label: 'Swimming' },
];

const defaultValues = {
  TournamentName: '',
  Location: '',
  Sports: mockSports,
};

const validationSchema = yup.object().shape({
  TournamentName: yup.string().required('Please enter tournament name'),
  Location: yup.string().required('Please enter location'),
  Sports: yup.array().required('Please enter sports'),
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

      <Combobox name={'Sports'} label={'Sports'} options={mockSports} />
      <FormSubmitButton title={'Save'} showAlert />
    </Form>
  );
};

export default BasicTournamentSettings;
