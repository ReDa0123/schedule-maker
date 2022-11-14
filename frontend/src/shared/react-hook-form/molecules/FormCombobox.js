import React from 'react';
import {
  Combobox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Box,
} from '../../design-system';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
  compose,
  equals,
  filter,
  flatten,
  groupWith,
  prop,
  sortBy,
} from 'ramda';

const FormCombobox = ({
  name,
  label,
  disabled,
  helperText,
  formControlProps,
  formLabelProps,
  formHelperTextProps,
  formErrorMessageProps,
  placeholder,
  options,
}) => {
  return (
    <Controller
      name={name}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <FormControl
          isDisabled={disabled}
          isInvalid={error}
          w="250px"
          {...formControlProps}
        >
          {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
          <Box>
            <Combobox
              options={options}
              onBlur={onBlur}
              result={value}
              setResult={(values) => {
                const valuesToChange = compose(
                  flatten,
                  filter((value) => value.length === 1),
                  groupWith(equals),
                  sortBy(prop('value'))
                )(values);
                onChange(valuesToChange);
              }}
              placeholder={placeholder}
            />
          </Box>
          {error ? (
            <FormErrorMessage {...formErrorMessageProps}>
              {error.message}
            </FormErrorMessage>
          ) : (
            helperText && (
              <FormHelperText {...formHelperTextProps}>
                {helperText}
              </FormHelperText>
            )
          )}
        </FormControl>
      )}
    />
  );
};

FormCombobox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  formControlProps: PropTypes.object,
  formLabelProps: PropTypes.object,
  formHelperTextProps: PropTypes.object,
  formErrorMessageProps: PropTypes.object,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export default FormCombobox;
