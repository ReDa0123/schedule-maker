import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '../../design-system';
import PropTypes from 'prop-types';
import { useFormField } from '../hooks';
import { identity } from 'ramda';

const FormNumberInput = ({
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
  step,
  viewParser = identity,
  changeParser = identity,
  inputDisabled,
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
      <NumberInput
        {...field}
        onChange={onChangeData}
        onBlur={onBlurField}
        onFocus={onFocus}
        type={type}
        min={0}
        w="100%"
        {...inputProps}
        step={step}
        format={viewParser}
        parse={changeParser}
      >
        <NumberInputField
          borderWidth={2}
          borderColor="blue.500"
          _hover={{
            borderColor: 'blue.700',
          }}
          _disabled={{
            opacity: disabled ? 0.4 : 1,
            cursor: 'not-allowed',
          }}
          disabled={inputDisabled || disabled}
        />
        <NumberInputStepper>
          <NumberIncrementStepper color="blue.600" border="none" />
          <NumberDecrementStepper color="blue.600" border="none" />
        </NumberInputStepper>
      </NumberInput>
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

FormNumberInput.propTypes = {
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
  step: PropTypes.number,
  viewParser: PropTypes.func,
  changeParser: PropTypes.func,
  inputDisabled: PropTypes.bool,
};

export default FormNumberInput;
