import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
} from '../../design-system';
import PropTypes from 'prop-types';
import { useFormField } from '../hooks';

const FormSelect = ({
  name,
  label,
  onChange,
  onBlur,
  onFocus,
  disabled,
  helperText,
  options,
  createEmptyOption = true,
  emptyOptionLabel,
  formControlProps,
  formLabelProps,
  formHelperTextProps,
  formErrorMessageProps,
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
      w="250px"
      {...formControlProps}
    >
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      <Select
        {...field}
        onChange={onChangeData}
        onBlur={onBlurField}
        onFocus={onFocus}
        borderWidth={2}
        borderColor="blue.500"
        iconColor="blue.600"
        _hover={{ borderColor: 'blue.700' }}
        w="100%"
        {...inputProps}
      >
        {createEmptyOption && <option value="">{emptyOptionLabel}</option>}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
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

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  emptyOptionLabel: PropTypes.string,
  formControlProps: PropTypes.object,
  formLabelProps: PropTypes.object,
  formHelperTextProps: PropTypes.object,
  formErrorMessageProps: PropTypes.object,
  inputProps: PropTypes.object,
  control: PropTypes.object,
  createEmptyOption: PropTypes.bool,
  value: PropTypes.string,
};

export default FormSelect;
