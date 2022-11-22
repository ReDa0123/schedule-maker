import { useToast } from 'src/shared/design-system';
import { useCallback, useMemo } from 'react';
import { keys, length } from 'ramda';

const toastId = 'validationError';

export const useSubmitButton = ({ onClick, showAlert, errors, isValid }) => {
  const { toastFn, toast } = useToast();

  const errorsCount = useMemo(() => length(keys(errors)), [errors]);
  const errorsCountBiggestThanZero = useMemo(
    () => errorsCount > 0,
    [errorsCount]
  );

  const onClickButton = useCallback(() => {
    onClick && onClick();
    if (!isValid && showAlert && !toast.isActive(toastId)) {
      toastFn({
        title: 'Validation error',
        id: toastId,
        description: 'The form has validation errors. Please fix them.',
        status: 'error',
      });
    }
  }, [isValid, showAlert, toast, toastFn, onClick]);

  return {
    errorsCount,
    errorsCountBiggestThanZero,
    onClickButton,
  };
};
