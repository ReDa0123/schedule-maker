import { useWatch } from 'react-hook-form';
import { SCHEDULE_FORM_VERSION_NAME } from '../constants';
import { useMemo } from 'react';
import { isNilOrEmpty } from 'ramda-extension';

export const useSelectedVersion = () => {
  const version = useWatch({
    name: SCHEDULE_FORM_VERSION_NAME,
  });
  return useMemo(
    () => (isNilOrEmpty(version) ? null : Number(version)),
    [version]
  );
};
