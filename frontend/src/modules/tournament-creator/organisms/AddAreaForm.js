import { Form } from 'src/shared/react-hook-form/organisms';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Stack } from 'src/shared/design-system';
import { FormSubmitButton } from 'src/shared/react-hook-form/molecules';
import * as yup from 'yup';
import Combobox from 'src/shared/react-hook-form/molecules/Combobox';

const defaultValues = {
  areas: [],
};

const mockAreaTypes = [
  { value: 1, label: 'Swimming pool' },
  { value: 2, label: 'Jump track' },
  { value: 3, label: 'Hall' },
];

const areaValidationSchema = yup.object().shape({
  areas: yup
    .array()
    .min(1, 'Please enter at least one area')
    .required('Please enter at least one area')
    .test({
      name: 'areas-unique',
      message: 'Areas must be unique',
      test: (value) => {
        const set = new Set(value);
        return set.size === value.length;
      },
    }),
});

const AddAreaForm = () => {
  return (
    <Form
      onSubmit={(data) => alert(JSON.stringify(data))}
      resolver={yupResolver(areaValidationSchema)}
      defaultValues={defaultValues}
      mode="onBlur"
    >
      <Stack direction={'row'}>
        <Combobox
          name={'areas'}
          options={mockAreaTypes}
          label={'Select area type'}
        />
      </Stack>
      <FormSubmitButton title={'Add'} showAlert />
    </Form>
  );
};

export default AddAreaForm;
