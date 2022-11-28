import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useCallback } from 'react';
import { useSubmitButton } from 'src/shared/react-hook-form/hooks';
import { FormInput } from 'src/shared/react-hook-form/molecules';
import { Button, Flex } from 'src/shared/design-system';
import PropTypes from 'prop-types';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, `Name can't be longer than 50 characters`)
    .required('Please input the name of the version'),
});

const CreateVersionForm = ({ onSubmit, defaultValues }) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      name: defaultValues?.name || '',
    },
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const onClick = useCallback(
    () =>
      handleSubmit((data) => {
        onSubmit(data);
        reset();
      })(),
    [onSubmit, handleSubmit, reset]
  );

  const { onClickButton } = useSubmitButton({
    showAlert: true,
    onClick,
    errors,
    isValid,
  });

  return (
    <Flex mt={4} alignItems="center" flexDirection="column" mb="-10px">
      <FormInput name="name" label="Version name" control={control} />
      <Flex justifyContent="center">
        <Button onClick={onClickButton} marginBlock={4} disabled={isSubmitting}>
          {defaultValues ? 'Edit' : 'Create'}
        </Button>
      </Flex>
    </Flex>
  );
};

CreateVersionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default CreateVersionForm;
