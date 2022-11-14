import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '../../design-system';
import PropTypes from 'prop-types';
import { Autocomplete } from 'chakra-ui-simple-autocomplete';
import { Controller } from 'react-hook-form';
import { Box, Text } from '@chakra-ui/react';
import { CheckCircleIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
  compose,
  equals,
  filter,
  flatten,
  groupWith,
  prop,
  sortBy,
} from 'ramda';
import { renderComboboxBadge } from '../../utils';

const Combobox = ({
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
            <Autocomplete
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
              renderCheckIcon={() => (
                <CheckCircleIcon color="green.500" mr={2} />
              )}
              renderCreateIcon={() => {
                return (
                  <>
                    <SmallAddIcon color="green.500" mr={2} />
                    <Text>Create new</Text>
                  </>
                );
              }}
              colorScheme={'green.500'}
              borderWidth={2}
              borderColor="blue.500"
              placeholder={placeholder}
              _hover={{ borderColor: 'blue.700' }}
              renderBadge={renderComboboxBadge}
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

Combobox.propTypes = {
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

export default Combobox;
