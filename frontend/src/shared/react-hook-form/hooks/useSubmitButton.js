import { useToast } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { keys, length } from 'ramda';

export const useSubmitButton = ({ onClick, showAlert }) => {
  const toast = useToast();
  const {
    formState: { errors, isSubmitting, isValid },
  } = useFormContext();
  const errorsCount = useMemo(() => length(keys(errors)), [errors]);
  const errorsCountBiggestThanZero = useMemo(
    () => errorsCount > 0,
    [errorsCount]
  );

  const onClickButton = useCallback(() => {
    onClick && onClick();
    if (!isValid && showAlert) {
      toast({
        title: 'Validation error',
        description: 'The form has validation errors. Please fix them.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [isValid, showAlert, toast, onClick]);

  return {
    isSubmitting,
    errorsCount,
    errorsCountBiggestThanZero,
    onClickButton,
  };
};
