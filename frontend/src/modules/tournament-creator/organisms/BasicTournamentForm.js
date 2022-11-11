import { Form } from 'src/shared/react-hook-form/organisms';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  FormInput,
  FormSubmitButton,
} from 'src/shared/react-hook-form/molecules';
import { useToast } from '@chakra-ui/react';
import * as yup from 'yup';
import { format } from 'date-fns';
import { convertToDate } from '../../../shared/utils';
import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';

let defaultValues = {
  name: 'Some name',
  location: '',
  startDate: '',
  endDate: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Please enter tournament name'),
  location: yup.string().required('Please enter location'),
  startDate: yup
    .date()
    .required('Please enter start time')
    .test({
      name: 'startDate-after-endDDate',
      message: 'Start date must be before end date',
      test: (value, ctx) =>
        isNaN(ctx.parent.endDate) ? true : value <= ctx.parent.endDate,
    }),
  endDate: yup
    .date()
    .required('Please enter end time')
    .test({
      name: 'endDate-before-startDate',
      message: 'End date must be after start date',
      test: (value, ctx) =>
        isNaN(ctx.parent.startDate) ? true : value >= ctx.parent.startDate,
    }),
});

const EDIT_TOURNAMENT_MUTATION = gql`
  mutation editTournament(
    $tournamentId: Int!
    $name: String!
    $location: String!
    $startDate: String!
    $endDate: String!
    $userId: Int!
  ) {
    editTournament(
      tournamentId: $tournamentId
      name: $name
      location: $location
      startDate: $startDate
      endDate: $endDate
      userId: $userId
    )
  }
`;

const BasicTournamentForm = ({ data }) => {
  //alert(data.tournament.startDate);
  defaultValues.endDate = format(
    convertToDate(Number(data.tournament.endDate)),
    'yyyy-MM-dd'
  );
  defaultValues.startDate = format(
    convertToDate(Number(data.tournament.startDate)),
    'yyyy-MM-dd'
  );
  defaultValues.name = data.tournament.name;
  defaultValues.location = data.tournament.location;
  let tournamentToEdit = data.tournament;
  //const converted = new Date(defaultValues.startDate).getTime()
  //alert(converted);
  //alert(format(
  //  convertToDate(Number(converted)),
  //  'yyyy-MM-dd'
  //))

  const toast = useToast();
  const [editTournament] = useMutation(EDIT_TOURNAMENT_MUTATION, {
    onCompleted: ({ createTournament: successMessage }) => {
      toast({
        title: successMessage,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: (e) => {
      toast({
        title: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const onSubmit = useCallback(
    async (values) => {
      alert(JSON.stringify(values));
      let variables = {
        name: String(values.name),
        location: String(values.location),
        startDate: format(
          convertToDate(Number(values.startDate)),
          'yyyy-MM-dd'
        ).toString(),
        //endDate: new Date(values.endDate).getTime().toString(),
        endDate: format(
          convertToDate(Number(values.endDate)),
          'yyyy-MM-dd'
        ).toString(),
        tournamentId: Number(tournamentToEdit.tournamentId),
        userId: Number(tournamentToEdit.userId),
      };

      alert(JSON.stringify(variables));

      const returnmessage = await editTournament({ variables });
      alert(returnmessage);
    },
    [editTournament]
  );
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      resolver={yupResolver(validationSchema)}
      mode="onChange"
    >
      <FormInput name={'name'} label={'Tournament name'} />
      <FormInput name={'location'} label={'Location'} />
      <FormInput name={'startDate'} label={'Start date'} type={'date'} />
      <FormInput name={'endDate'} label={'End date'} type={'date'} />
      <FormSubmitButton title={'Save'} showAlert />
    </Form>
  );
};

export default BasicTournamentForm;
