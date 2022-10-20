import { useMemo } from 'react';
import {
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Switch,
} from '../../design-system/atoms';
import PropTypes from 'prop-types';
import { useFormField } from '../hooks';

const FormCheckbox = ({
  name,
  label,
  onChange,
  onBlur,
  onFocus,
  disabled,
  helperText,
  isSwitch,
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
  const FormComponent = useMemo(
    () => (isSwitch ? Switch : Checkbox),
    [isSwitch]
  );

  return (
    <FormControl
      isDisabled={disabled}
      isInvalid={isInvalid}
      {...formControlProps}
    >
      <Flex gap={2}>
        <FormComponent
          {...field}
          onChange={onChangeData}
          onBlur={onBlurField}
          onFocus={onFocus}
          {...inputProps}
          isChecked={field.value}
        />
        {label && (
          <FormLabel m={0} {...formLabelProps}>
            {label}
          </FormLabel>
        )}
      </Flex>
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

FormCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  isSwitch: PropTypes.bool,
  formControlProps: PropTypes.object,
  formLabelProps: PropTypes.object,
  formHelperTextProps: PropTypes.object,
  formErrorMessageProps: PropTypes.object,
  inputProps: PropTypes.object,
  control: PropTypes.object,
};

export default FormCheckbox;
