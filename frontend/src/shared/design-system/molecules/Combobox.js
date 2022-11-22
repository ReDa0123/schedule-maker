import React, { forwardRef } from 'react';
import { CreatableSelect, Select } from 'chakra-react-select';
import PropTypes from 'prop-types';

export const Combobox = forwardRef((props, ref) => {
  const Component = props.isNotCreatable ? Select : CreatableSelect;
  return (
    <Component
      isMulti
      menuPosition="fixed"
      menuPlacement="auto"
      maxMenuHeight={200}
      chakraStyles={{
        control: (provided) => ({
          ...provided,
          borderWidth: 2,
          borderColor: 'blue.500',
          _hover: { borderColor: 'blue.700' },
          borderRadius: 'md',
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: 'black',
          backgroundColor: 'transparent',
          paddingInline: 2,
          cursor: 'pointer',
        }),
        clearIndicator: (provided) => ({
          ...provided,
          display: props.showClearIndicator ? 'flex' : 'none',
          _hover: { backgroundColor: 'blue.500', color: 'white' },
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: 'blue.500',
          color: 'white',
          textTransform: 'uppercase',
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          display: 'none',
        }),
        menu: (provided) => ({
          ...provided,
          w: 'fit-content',
          minWidth: '250px',
          right: 0,
        }),
      }}
      ref={ref}
      {...props}
    />
  );
});

Combobox.propTypes = {
  showClearIndicator: PropTypes.bool,
  isNotCreatable: PropTypes.bool,
};
