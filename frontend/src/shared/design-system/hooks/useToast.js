import { useCallback } from 'react';
import { useToast as useChakraToast } from '@chakra-ui/react';

export const useToast = () => {
  const toast = useChakraToast();
  return {
    toastFn: useCallback(
      (props) => {
        toast({
          position: 'top-right',
          isClosable: true,
          duration: 5000,
          ...props,
        });
      },
      [toast]
    ),
    toast,
  };
};
