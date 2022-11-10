import { Form } from 'src/shared/react-hook-form/organisms';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Stack } from 'src/shared/design-system';
import { FormSubmitButton } from 'src/shared/react-hook-form/molecules';
import * as yup from 'yup';
import Combobox from 'src/shared/react-hook-form/molecules/Combobox';
import PropTypes from 'prop-types';

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

const AddAreasForm = ({ areas, defaultValues, onSubmit }) => {
  return (
    <Form
      onSubmit={onSubmit}
      resolver={yupResolver(areaValidationSchema)}
      defaultValues={{ areas: defaultValues?.areas || [] }}
      mode="onBlur"
    >
      <Stack direction={'row'}>
        <Combobox name={'areas'} options={areas} label={'Select area type'} />
      </Stack>
      <FormSubmitButton title={'Add'} showAlert />
    </Form>
  );
};

AddAreasForm.propTypes = {
  areas: PropTypes.array.isRequired,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default AddAreasForm;
