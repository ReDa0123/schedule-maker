import { createContext, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';

export const fieldArrayContext = createContext(null);

const FieldArrayProvider = fieldArrayContext.Provider;

const FieldArrayContext = ({ name, initialData = [], ...props }) => {
  const fieldArrayProps = useFieldArray({
    name,
  });

  const { replace } = fieldArrayProps;

  useEffect(() => {
    replace(initialData);
  }, [replace, initialData]);

  return <FieldArrayProvider value={{ ...fieldArrayProps }} {...props} />;
};

FieldArrayContext.propTypes = {
  name: PropTypes.string.isRequired,
  initialData: PropTypes.array,
};

export default FieldArrayContext;
