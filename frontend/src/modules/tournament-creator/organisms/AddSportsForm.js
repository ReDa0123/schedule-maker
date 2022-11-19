import { Form } from 'src/shared/react-hook-form/organisms';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormCombobox } from 'src/shared/react-hook-form/molecules';
import { FormSubmitButton } from 'src/shared/react-hook-form/molecules';
import PropTypes from 'prop-types';

const validationSchema = yup.object().shape({
  sports: yup
    .array()
    .min(1, 'Please enter at least one sport')
    .required('Please enter at least one sport')
    .test({
      name: 'sports-unique',
      message: 'Sports must be unique',
      test: (value) => {
        const set = new Set(value.map((item) => item.value));
        return set.size === value.length;
      },
    }),
});

const AddSportsForm = ({ onSubmit, sports, defaultValues }) => {
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        sports: defaultValues?.sports || [],
      }}
      resolver={yupResolver(validationSchema)}
      mode="onChange"
    >
      <FormCombobox name={'sports'} options={sports} label={'Select sport'} />
      <FormSubmitButton title={'Set'} showAlert mt={4} />
    </Form>
  );
};

AddSportsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  sports: PropTypes.array.isRequired,
  defaultValues: PropTypes.object,
};

export default AddSportsForm;
