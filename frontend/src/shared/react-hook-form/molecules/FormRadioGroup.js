import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '../../design-system';
import PropTypes from 'prop-types';
import { useFormField } from '../hooks';

const FormRadioGroup = ({
  name,
  label,
  onChange,
  onBlur,
  onFocus,
  disabled,
  helperText,
  options,
  formControlProps,
  formLabelProps,
  formHelperTextProps,
  formErrorMessageProps,
  formRadioGroupProps,
  inputProps,
  control,
}) => {
  const { isInvalid, field, fieldState, onBlurField, onChangeData } =
    useFormField({
      control,
      onBlur,
      onChange,
      name,
    });

  return (
    <FormControl
      isDisabled={disabled}
      isInvalid={isInvalid}
      {...formControlProps}
    >
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      <RadioGroup {...field} {...formRadioGroupProps}>
        <Stack direction="row">
          {options.map(({ value, label }) => (
            <Radio
              key={value}
              value={value}
              onChange={onChangeData}
              onBlur={onBlurField}
              onFocus={onFocus}
              {...inputProps}
              colorScheme={
                isInvalid ? 'red' : inputProps?.colorScheme ?? 'blue'
              }
            >
              {label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {isInvalid ? (
        <FormErrorMessage {...formErrorMessageProps}>
          {fieldState.error?.message}
        </FormErrorMessage>
      ) : (
        helperText && (
          <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>
        )
      )}
    </FormControl>
  );
};

FormRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  formControlProps: PropTypes.object,
  formLabelProps: PropTypes.object,
  formHelperTextProps: PropTypes.object,
  formErrorMessageProps: PropTypes.object,
  formRadioGroupProps: PropTypes.object,
  inputProps: PropTypes.object,
  control: PropTypes.object,
};

export default FormRadioGroup;
