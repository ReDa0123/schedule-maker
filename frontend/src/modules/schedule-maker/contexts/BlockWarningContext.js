import { createContext, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { SCHEDULE_FORM_NAME } from '../constants';
import { calculateEndTime } from '../utils/blocks';
import { between, defaultToEmptyString, isNotNil } from 'ramda-extension';
import PropTypes from 'prop-types';
import { useTournamentSchedule } from '../hooks';

export const blockWarningContext = createContext([]);

const BlockWarningProvider = blockWarningContext.Provider;

const BlockWarningContext = ({ children }) => {
  const [warnings, setWarnings] = useState([]);
  const values = useWatch({ name: SCHEDULE_FORM_NAME, defaultValue: [] });
  const {
    tournament: { buffer },
  } = useTournamentSchedule();

  useEffect(() => {
    const newWarnings = [];

    for (let i = 0; i < values.length; i++) {
      if (newWarnings[i]) continue;
      if (i + 1 === values.length) {
        newWarnings[i] = false;
        break;
      }

      const { startTime, age, sex, customParameter, dayId, areaId, versionId } =
        values[i];
      const endTime = calculateEndTime(values[i], buffer);

      for (let j = i + 1; j < values.length; j++) {
        const {
          startTime: startTime2,
          age: age2,
          sex: sex2,
          customParameter: customParameter2,
          dayId: dayId2,
          areaId: areaId2,
          versionId: versionId2,
        } = values[j];
        const endTime2 = calculateEndTime(values[j], buffer);
        if (
          isNotNil(startTime) &&
          (between(startTime, endTime - 0.01, startTime2) ||
            between(startTime2, endTime2 - 0.01, startTime)) &&
          age === age2 &&
          defaultToEmptyString(sex) === defaultToEmptyString(sex2) &&
          customParameter &&
          customParameter === customParameter2 &&
          Number(dayId) === Number(dayId2) &&
          Number(versionId) === Number(versionId2) &&
          Number(areaId) !== Number(areaId2)
        ) {
          newWarnings[i] = true;
          newWarnings[j] = true;
        }
        if (!newWarnings[i]) {
          newWarnings[i] = false;
        }
      }
    }

    setWarnings(newWarnings);
  }, [values, buffer]);

  return (
    <BlockWarningProvider value={warnings}>{children}</BlockWarningProvider>
  );
};

BlockWarningContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlockWarningContext;
