import { useController } from 'react-hook-form';
import { useCallback, useMemo } from 'react';

export const useFormField = ({ control, onBlur, onChange, name }) => {
  const controllerProps = useMemo(
    () => (control ? { name, control } : { name }),
    [control, name]
  );
  const { field, fieldState } = useController(controllerProps);

  const onBlurField = useCallback(
    (e) => {
      field.onBlur(e);
      onBlur && onBlur(e);
    },
    [field, onBlur]
  );

  const onChangeData = useCallback(
    (e) => {
      field.onChange(e);
      onChange && onChange(e);
    },
    [field, onChange]
  );

  return {
    onBlurField,
    onChangeData,
    isInvalid: !!fieldState?.error,
    field,
    fieldState,
  };
};
