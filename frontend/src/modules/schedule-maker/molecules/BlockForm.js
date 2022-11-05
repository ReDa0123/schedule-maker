import { useForm } from 'react-hook-form';
import { Grid, Button, Flex, Heading } from 'src/shared/design-system';
import {
  FormInput,
  FormNumberInput,
  FormSelect,
} from 'src/shared/react-hook-form/molecules';
import { map, o, values } from 'ramda';
import { useTournamentSchedule } from '../hooks';
import { SEXES, tournamentStyles } from '../constants';
import { useSubmitButton } from 'src/shared/react-hook-form/hooks';
import { useCallback } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

const validationSchema = yup.object().shape({
  category: yup.string(),
  persons: yup
    .number()
    .typeError('Please input the number of persons')
    .integer('The number of persons must be a positive integer')
    .positive('The number of persons must be a positive integer')
    .required('Please input the number of persons'),
  style: yup.string().required('Please specify the style of the competition'),
  sportId: yup
    .number()
    .typeError('Please select sport')
    .integer()
    .required('Please select sport'),
  sex: yup.string(),
  age: yup.string().required('Please specify age group'),
  customParameter: yup.string(),
});

const BlockForm = ({ onSubmit, defaultValues }) => {
  const { sports } = useTournamentSchedule();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      category: defaultValues?.category || '',
      persons: defaultValues?.persons || '',
      style: defaultValues?.style || '',
      blockId: defaultValues?.blockId || '',
      sportId: defaultValues?.sportId || '',
      sex: defaultValues?.sex || '',
      age: defaultValues?.age || '',
      customParameter: defaultValues?.customParameter || '',
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
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
    <>
      <Heading fontSize={24} mb={4}>
        Block creation
      </Heading>
      <Grid
        templateColumns={{
          base: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
        }}
        gap={4}
        w="100%"
      >
        <FormInput name="category" label="Category" control={control} />
        <FormNumberInput
          name="persons"
          label="Persons"
          type="number"
          control={control}
        />
        <FormSelect
          name="style"
          label="Style"
          control={control}
          options={values(tournamentStyles).map((style) => ({
            value: style,
            label: style,
          }))}
        />
        <FormSelect
          name="sportId"
          options={sports.map(({ sportId, name }) => ({
            value: sportId,
            label: name,
          }))}
          control={control}
          label="Sport"
        />
        <FormSelect
          name="sex"
          options={o(
            values,
            map((sex) => ({
              value: sex,
              label: sex,
            }))
          )(SEXES)}
          control={control}
          label="Sex"
          emptyOptionLabel="Both"
        />
        <FormInput name="age" label="Age" control={control} />
        <FormInput
          name="customParameter"
          label="Custom parameter"
          control={control}
        />
      </Grid>
      <Flex justifyContent="center">
        <Button onClick={onClickButton} marginBlock={4} disabled={isSubmitting}>
          {defaultValues ? 'Edit' : 'Create'}
        </Button>
      </Flex>
    </>
  );
};

BlockForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    category: PropTypes.string,
    persons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.string,
    blockId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sportId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    age: PropTypes.string,
    customParameter: PropTypes.string,
    sex: PropTypes.string,
  }),
};

export default BlockForm;