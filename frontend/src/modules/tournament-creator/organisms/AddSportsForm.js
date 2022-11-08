import { Form } from 'src/shared/react-hook-form/organisms';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Combobox from 'src/shared/react-hook-form/molecules/Combobox';
import { FormSubmitButton } from 'src/shared/react-hook-form/molecules';

const mockSports = [
  { value: 1, label: 'Tennis' },
  { value: 2, label: 'Long jump' },
  { value: 3, label: 'Swimming' },
];

const defaultValues = {
  sports: [],
};

const validationSchema = yup.object().shape({
  sports: yup
    .array()
    .min(1, 'Please enter at least one sport')
    .required('Please enter at least one sport')
    .test({
      name: 'areas-unique',
      message: 'Areas must be unique',
      test: (value) => {
        const set = new Set(value.map((item) => item.value));
        return set.size === value.length;
      },
    }),
});

const AddSportsForm = () => {
  return (
    <Form
      onSubmit={(data) => alert(JSON.stringify(data))}
      defaultValues={defaultValues}
      resolver={yupResolver(validationSchema)}
      mode="onChange"
    >
      <Combobox name={'sports'} options={mockSports} label={'Select sport'} />
      <FormSubmitButton title={'Add'} showAlert />
    </Form>
  );
};

export default AddSportsForm;
