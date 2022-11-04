import { Form } from '../../../shared/react-hook-form/organisms';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Stack } from 'src/shared/design-system';
import {
  FormNumberInput,
  FormSelect,
  FormSubmitButton,
} from '../../../shared/react-hook-form/molecules';
import * as yup from 'yup';

const mockAreaTypes = [
  { value: 1, label: 'Swimming pool' },
  { value: 2, label: 'Jump track' },
  { value: 3, label: 'Hall' },
];

const areaValidationSchema = yup.object().shape({
  AreaTypeSelection: yup.number().required('Please select area type'),
  AreaCapacity: yup.number().required('Please enter area capacity'),
});

const AddArea = () => {
  return (
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
  );
};

export default AddArea;
