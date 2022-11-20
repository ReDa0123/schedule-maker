import { IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { Modal } from 'src/shared/design-system/organisms';
import { DayForm } from '../organisms';
import { gql, useMutation } from '@apollo/client';
import { forwardRef, useCallback } from 'react';
import { convertDayValuesForSending } from '../utils';
import { format } from 'date-fns';
import { convertToDate } from 'src/shared/utils';
import { minutesToTime } from '../../schedule-maker/utils/blocks';
import PropTypes from 'prop-types';

const EDIT_DAY_MUTATION = gql`
  mutation EditDay(
    $dayId: Int!
    $description: String!
    $date: String!
    $startTime: Int!
    $endTime: Int!
  ) {
    editDay(
      dayId: $dayId
      description: $description
      startTime: $startTime
      endTime: $endTime
      date: $date
    )
  }
`;

const EditDayButton = forwardRef(
  (
    {
      day: { dayId, date, startTime, endTime, description },
      refetch,
      ...props
    },
    ref
  ) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [editDay] = useMutation(EDIT_DAY_MUTATION, {
      onCompleted: ({ editDay: successMessage }) => {
        toast({
          title: successMessage,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        onClose();
        refetch();
      },
      onError: ({ message }) => {
        toast({
          title: message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    });

    const onSubmit = useCallback(
      async (values) => {
        const variables = {
          ...convertDayValuesForSending(values),
          dayId: Number(dayId),
        };
        await editDay({ variables });
      },
      [editDay, dayId]
    );

    return (
      <>
        <IconButton
          aria-label="Edit Day"
          icon={<EditIcon />}
          colorScheme="blue"
          ml="auto"
          ref={ref}
          {...props}
          onClick={onOpen}
        />
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          headerText="Edit Day"
          modalBody={
            <DayForm
              onSubmit={onSubmit}
              defaultValues={{
                description: description,
                date: format(convertToDate(Number(date)), 'yyyy-MM-dd'),
                startTime: minutesToTime(startTime),
                endTime: minutesToTime(endTime),
              }}
            />
          }
          modalProps={{ size: 'xl' }}
        />
      </>
    );
  }
);

EditDayButton.propTypes = {
  day: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default EditDayButton;
