import { FormInput } from 'src/shared/react-hook-form/molecules';
import { Button, Grid } from 'src/shared/design-system';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { useSubmitButton } from 'src/shared/react-hook-form/hooks';
import { format } from 'date-fns';
import { convertToDate } from '../../../shared/utils';

const validationSchema = yup.object().shape({
  date: yup
    .date()
    .typeError('Please enter valid date')
    .required('Please enter valid date'),
  startTime: yup
    .string()
    .matches(/\d\d:\d\d/, 'Please enter the start time of the day')
    .test({
      name: 'startTime-before-endTime',
      message: 'Start time must be before end time',
      test: (value, ctx) =>
        ctx.parent.endTime ? value < ctx.parent.endTime : true,
    }),
  endTime: yup
    .string()
    .matches(/\d\d:\d\d/, 'Please enter the end time of the day')
    .test({
      name: 'endTime-after-startTime',
      message: 'End time must be after start time',
      test: (value, ctx) =>
        ctx.parent.startTime ? value > ctx.parent.startTime : true,
    }),
  description: yup
    .string()
    .required('Please enter description')
    .max(50, 'Description must be less than 50 characters'),
});

const DayForm = ({ onSubmit, defaultValues, date }) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      date:
        defaultValues?.date ||
        format(convertToDate(Number(date)), 'yyyy-MM-dd') ||
        '',
      startTime: defaultValues?.startTime || '',
      endTime: defaultValues?.endTime || '',
      description: defaultValues?.description || '',
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
      <Grid
        templateColumns={{
          base: '1fr',
          md: '250px 250px',
        }}
        gap={4}
      >
        <FormInput name={'date'} label={'Date'} type="date" control={control} />
        <FormInput
          name={'description'}
          label={'Description'}
          type="text"
          control={control}
        />
        <FormInput
          name={'startTime'}
          label={'Start time'}
          type="time"
          control={control}
        />
        <FormInput
          name={'endTime'}
          label={'End time'}
          type="time"
          control={control}
        />
      </Grid>

      <Button
        onClick={onClickButton}
        marginBlock={4}
        disabled={isSubmitting}
        type="submit"
      >
        {defaultValues ? 'Edit' : 'Add'}
      </Button>
    </>
  );
};

DayForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DayForm;
