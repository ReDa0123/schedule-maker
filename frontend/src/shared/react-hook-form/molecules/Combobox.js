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
import { Badge, Box, Text } from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon, SmallAddIcon } from '@chakra-ui/icons';

const Combobox = ({
  name,
  label,
  isInvalid,
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
    <FormControl
      isDisabled={disabled}
      isInvalid={isInvalid}
      w="250px"
      {...formControlProps}
    >
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}

      <Controller
        name={name}
        render={({ field: { onChange, value } }) => (
          <Box>
            <Autocomplete
              options={options}
              result={value}
              setResult={onChange}
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
              renderBadge={(option) => (
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme="teal"
                  mx={1}
                  cursor="pointer"
                >
                  {option.label}
                  <CloseIcon ml={1} w={2} h={2} mb="4px" />
                </Badge>
              )}
            />
          </Box>
        )}
      />

      {isInvalid ? (
        <FormErrorMessage {...formErrorMessageProps}>
          Error when saving areas
        </FormErrorMessage>
      ) : (
        helperText && (
          <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>
        )
      )}
    </FormControl>
  );
};

Combobox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isInvalid: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  formControlProps: PropTypes.object,
  formLabelProps: PropTypes.object,
  formHelperTextProps: PropTypes.object,
  formErrorMessageProps: PropTypes.object,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Combobox;
