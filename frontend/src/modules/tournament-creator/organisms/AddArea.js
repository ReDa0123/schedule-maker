import { Form } from '../../../shared/react-hook-form/organisms';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Stack } from 'src/shared/design-system';
import {
  FormNumberInput,
  FormSubmitButton,
} from '../../../shared/react-hook-form/molecules';
import * as yup from 'yup';
import Combobox from '../../../shared/react-hook-form/molecules/Combobox';

const defaultValues = {
  AreaTypeSelection: [],
  AreaCapacity: 0,
};

const mockAreaTypes = [
  { value: 1, label: 'Swimming pool' },
  { value: 2, label: 'Jump track' },
  { value: 3, label: 'Hall' },
];

const areaValidationSchema = yup.object().shape({
  AreaTypeSelection: yup.array().required('Please enter at least some array'),
  AreaCapacity: yup.number().required('Please enter area capacity'),
});

const AddArea = () => {
  return (
    <Form
      onSubmit={(data) => alert(JSON.stringify(data))}
      resolver={yupResolver(areaValidationSchema)}
      defaultValues={defaultValues}
    >
      <Stack direction={'row'}>
        <Combobox
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
