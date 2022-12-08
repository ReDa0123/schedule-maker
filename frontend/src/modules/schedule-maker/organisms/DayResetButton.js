import { useCallback, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { SCHEDULE_FORM_NAME } from '../constants';
import { Button, useDisclosure } from 'src/shared/design-system';
import { AlertDialog } from 'src/shared/design-system/organisms';
import { WithTooltip } from 'src/shared/design-system/molecules';
import PropTypes from 'prop-types';
import { allPass, propEq } from 'ramda';
import { useSelectedVersion } from '../hooks';

const DayResetButton = ({ dayId }) => {
  const { setValue } = useFormContext();
  const values = useWatch({ name: SCHEDULE_FORM_NAME, defaultValue: [] });
  const selectedVersion = useSelectedVersion();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const resetDay = useCallback(() => {
    values.forEach((value, index) => {
      if (value.dayId === dayId && value.versionId === selectedVersion) {
        setValue(`${SCHEDULE_FORM_NAME}[${index}]`, {
          ...value,
          dayId: null,
          startTime: null,
          areaId: null,
        });
      }
    });
    onClose();
  }, [dayId, values, setValue, onClose, selectedVersion]);

  const noValuesInThisDay = useMemo(
    () =>
      values.filter(
        allPass([propEq('dayId', dayId), propEq('versionId', selectedVersion)])
      ).length === 0,
    [values, dayId, selectedVersion]
  );

  return (
    <>
      <WithTooltip label="Reset blocks for this day">
        <Button
          zIndex={10}
          onClick={onOpen}
          variant="outline"
          colorScheme="red"
          position="absolute"
          minW="50px"
          fontSize="12px"
          left={{ base: 1, md: 2 }}
          top={{ base: 1, md: 2 }}
          disabled={noValuesInThisDay}
        >
          Reset
        </Button>
      </WithTooltip>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        headerText="Do you really want to reset blocks in this day?"
        bodyText="All blocks in this day will be reset."
        cancelButtonText="Cancel"
        confirmButtonText="Reset"
        confirmButtonProps={{ colorScheme: 'red' }}
        onConfirm={resetDay}
        finalFocusRef={null}
      />
    </>
  );
};

DayResetButton.propTypes = {
  dayId: PropTypes.number.isRequired,
};

export default DayResetButton;
