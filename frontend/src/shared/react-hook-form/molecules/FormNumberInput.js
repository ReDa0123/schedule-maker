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
  Box,
} from '../../design-system';
import PropTypes from 'prop-types';
import { useFormField } from '../hooks';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  viewParser,
  inputDisabled,
}) => {
  const { isInvalid, field, fieldState, onBlurField, onChangeData } =
    useFormField({
      control,
      onBlur,
      onChange,
      name,
    });

  const [formattedValue, setFormattedValue] = useState(field.value);
  const [formattedValueVisible, setFormattedValueVisible] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    viewParser && setFormattedValue(viewParser(field.value));
  }, [field.value, viewParser]);

  const onFormattedValueClick = useCallback(() => {
    setFormattedValueVisible(false);
    inputRef.current.focus();
  }, []);

  return (
    <FormControl
      isDisabled={disabled}
      isInvalid={isInvalid}
      w="250px"
      position="relative"
      {...formControlProps}
    >
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      {viewParser && formattedValueVisible && (
        <Box
          onClick={onFormattedValueClick}
          bg="white"
          position="absolute"
          top="36px"
          left="4px"
          width="calc(100% - 24px)"
          zIndex="1000"
          pl="18px"
          pt="4px"
          h="34px"
          cursor="text"
        >
          {formattedValue}
        </Box>
      )}
      <NumberInput
        {...field}
        onChange={onChangeData}
        onBlur={(e) => {
          onBlurField(e);
          setFormattedValueVisible(true);
        }}
        onFocus={onFocus}
        type={type}
        min={0}
        w="100%"
        {...inputProps}
        step={step}
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
          ref={inputRef}
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
