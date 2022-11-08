import * as yup from 'yup';

const resolveDifferentPropName = (newDay) =>
  newDay ? 'tournamentId' : 'dayId';

export const getValidationSchema = (newDay) =>
  yup.object().shape({
    date: yup
      .string()
      .required()
      .matches(/^[2-9][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/),
    description: yup.string().required().max(50),
    startTime: yup
      .number()
      .required()
      .min(0)
      .max(1440)
      .test({
        name: 'startTime-before-endTime',
        message: 'Start time must be before end time',
        test: (value, ctx) =>
          ctx.parent.endTime ? value < ctx.parent.endTime : true,
      }),
    endTime: yup
      .number()
      .required()
      .min(0)
      .max(1440)
      .test({
        name: 'endTime-after-startTime',
        message: 'End time must be after start time',
        test: (value, ctx) =>
          ctx.parent.startTime ? value > ctx.parent.startTime : true,
      }),
    [resolveDifferentPropName(newDay)]: yup.number().required(),
  });
