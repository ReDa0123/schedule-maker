import { Form } from 'src/shared/react-hook-form/organisms';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  FormInput,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';

import * as yup from 'yup';
import Combobox from '../../../shared/react-hook-form/molecules/Combobox';

const mockSports = [
  { value: 1, label: 'Tennis' },
  { value: 2, label: 'Long jump' },
  { value: 3, label: 'Swimming' },
];

const defaultValues = {
  name: '',
  location: '',
  sports: mockSports,
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Please enter tournament name'),
  location: yup.string().required('Please enter location'),
  sports: yup
    .array()
    .min(1, 'Please enter at least one sport')
    .required('Please enter at least one sport')
    .test({
      name: 'areas-unique',
      message: 'Areas must be unique',
      test: (value) => {
        const set = new Set(value);
        return set.size === value.length;
      },
    }),
});

const BasicTournamentForm = () => {
  return (
    <Form
      onSubmit={(data) => alert(JSON.stringify(data))}
      defaultValues={defaultValues}
      resolver={yupResolver(validationSchema)}
      mode="onChange"
    >
      <FormInput name={'name'} label={'Tournament name'} />
      <FormInput name={'location'} label={'Location'} />

      <Combobox name={'sports'} label={'Sports'} options={mockSports} />
      <FormSubmitButton title={'Save'} showAlert />
    </Form>
  );
};

export default BasicTournamentForm;
