import { applySpec, o, prop } from 'ramda';
import { format } from 'date-fns';
import { convertPropToDate, convertPropToMinutes } from 'src/shared/utils';

export const convertDayValuesForSending = applySpec({
  date: o((time) => format(time, 'yyyy-MM-dd'), convertPropToDate('date')),
  description: prop('description'),
  startTime: convertPropToMinutes('startTime'),
  endTime: convertPropToMinutes('endTime'),
});
