import { useForm, useWatch } from 'react-hook-form';
import { Grid, Button, Flex, Heading } from 'src/shared/design-system';
import {
  FormInput,
  FormNumberInput,
  FormSelect,
} from 'src/shared/react-hook-form/molecules';
import { map, o, values } from 'ramda';
import { useTournamentSchedule } from '../hooks';
import {
  SCHEDULE_FORM_VERSION_NAME,
  SEXES,
  tournamentStyles,
} from '../constants';
import { useSubmitButton } from 'src/shared/react-hook-form/hooks';
import { useCallback } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { isNilOrEmpty } from 'ramda-extension';
import { blockDurationValueParser } from '../utils/blocks';

const validationSchema = yup.object().shape({
  category: yup.string().max(50, `Category can't be longer than 50 characters`),
  persons: yup
    .number()
    .typeError('Please input the number of persons')
    .integer('The number of persons must be a positive integer')
    .positive('The number of persons must be a positive integer')
    .required('Please input the number of persons'),
  style: yup
    .string()
    .required('Please specify the style of the competition')
    .max(50, `Style can't be longer than 50 characters`)
    .oneOf(tournamentStyles, 'Style must be from predetermined array'),
  sportId: yup
    .number()
    .typeError('Please select sport')
    .integer()
    .required('Please select sport'),
  sex: yup.string().oneOf(['M', 'F', '', null]).nullable(true),
  age: yup
    .string()
    .required('Please specify age group')
    .max(50, `Age can't be longer than 50 characters`),
  customParameter: yup
    .string()
    .max(50, `Custom parameter can't be longer than 50 characters`),
  matchDuration: yup
    .number()
    .typeError('Please input the number of seconds of a single match')
    .integer('The number of seconds must be a positive integer')
    .positive('The number of seconds must be a positive integer')
    .required('Please input the number of seconds of a single match'),
});

const BlockForm = ({ onSubmit, defaultValues }) => {
  const { sports } = useTournamentSchedule();
  const selectedVersion = useWatch({
    name: SCHEDULE_FORM_VERSION_NAME,
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      category: defaultValues?.category || '',
      persons: defaultValues?.persons || '0',
      style: defaultValues?.style || '',
      blockId: defaultValues?.blockId || '',
      sportId: defaultValues?.sportId || '',
      sex: defaultValues?.sex || '',
      age: defaultValues?.age || '',
      customParameter: defaultValues?.customParameter || '',
      matchDuration: defaultValues?.matchDuration || '60',
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const onClick = useCallback(
    () =>
      handleSubmit((data) => {
        const versionId = isNilOrEmpty(selectedVersion)
          ? null
          : Number(selectedVersion);
        const enhancedData = {
          ...data,
          versionId,
        };
        onSubmit(enhancedData);
        reset();
      })(),
    [onSubmit, handleSubmit, reset, selectedVersion]
  );

  const { onClickButton } = useSubmitButton({
    showAlert: true,
    onClick,
    errors,
    isValid,
  });
  return (
    <>
      {!defaultValues?.startTime && (
        <Heading fontSize={20} mb={4}>
          Add block manually
        </Heading>
      )}
      <Grid
        templateColumns={{
          base: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
        }}
        gap={4}
        w="100%"
      >
        <FormInput
          name="category"
          label="Category"
          control={control}
          inputProps={{
            placeholder: 'Name of category/block',
          }}
        />
        <FormNumberInput
          name="persons"
          label="Persons"
          type="number"
          disabled={!isNilOrEmpty(defaultValues?.startTime)}
          control={control}
        />
        <FormSelect
          name="style"
          label="Style"
          disabled={!isNilOrEmpty(defaultValues?.startTime)}
          control={control}
          options={tournamentStyles.map((style) => ({
            value: style,
            label: style,
          }))}
          emptyOptionLabel="Select style"
        />
        <FormSelect
          name="sportId"
          options={sports.map(({ sportId, name }) => ({
            value: sportId,
            label: name,
          }))}
          control={control}
          label="Sport"
          emptyOptionLabel="Select sport"
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
        <FormInput
          name="age"
          label="Age"
          control={control}
          inputProps={{
            placeholder: 'Define age division',
          }}
        />
        <FormInput
          name="customParameter"
          label="Custom parameter"
          control={control}
          inputProps={{
            placeholder: 'Additional parameter ',
          }}
        />
        <FormNumberInput
          name="matchDuration"
          label="Duration of one match"
          type="number"
          disabled={!isNilOrEmpty(defaultValues?.startTime)}
          control={control}
          step={15}
          viewParser={blockDurationValueParser}
        />
      </Grid>
      <Flex justifyContent="center">
        <Button
          onClick={onClickButton}
          marginBlock={4}
          disabled={isSubmitting}
          type="submit"
        >
          {defaultValues?.blockId ? 'Edit' : 'Create'}
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
    startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    matchDuration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default BlockForm;
