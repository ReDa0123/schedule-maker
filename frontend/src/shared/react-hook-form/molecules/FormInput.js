import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '../../design-system';
import PropTypes from 'prop-types';
import { useFormField } from '../hooks';

const FormInput = ({
  name,
  label,
  onChange,
  onBlur,
  onFocus,
  disabled,
  type = 'text',
  helperText,
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
      <Input
        {...field}
        onChange={onChangeData}
        onBlur={onBlurField}
        onFocus={onFocus}
        type={type}
        borderWidth={2}
        borderColor="blue.500"
        w="100%"
        _hover={{ borderColor: 'blue.700' }}
        {...inputProps}
      />
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

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  helperText: PropTypes.string,
  formControlProps: PropTypes.object,
  formLabelProps: PropTypes.object,
  formHelperTextProps: PropTypes.object,
  formErrorMessageProps: PropTypes.object,
  inputProps: PropTypes.object,
  control: PropTypes.object,
};

export default FormInput;
