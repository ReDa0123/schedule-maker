import { useToast } from 'src/shared/design-system';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
  convertDayValuesForSending,
  CREATE_DAY_MUTATION,
} from '../../tournament-creator/utils';
import { useCallback } from 'react';
import { Modal } from 'src/shared/design-system/organisms';
import { DayForm } from '../../tournament-creator/organisms';
import PropTypes from 'prop-types';
import { useTournamentSchedule } from '../hooks';

const AddDayModal = ({ onClose, isOpen, onOpen }) => {
  const { refetch } = useTournamentSchedule();
  const { tournamentId } = useParams();
  const { toastFn } = useToast();
  const [createDay] = useMutation(CREATE_DAY_MUTATION, {
    onCompleted: ({ createDay: successMessage }) => {
      toastFn({
        title: successMessage,
        status: 'success',
      });
      refetch();
    },
    onError: (e) => {
      toastFn({
        title: e.message,
        status: 'error',
      });
    },
  });

  const onSubmit = useCallback(
    async (values) => {
      const variables = {
        ...convertDayValuesForSending(values),
        tournamentId: Number(tournamentId),
      };
      await createDay({ variables });
      onClose();
    },
    [createDay, onClose, tournamentId]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={() => {
        onOpen();
      }}
      headerText="Add Day"
      modalBody={<DayForm onSubmit={onSubmit} />}
      modalProps={{ size: 'xl' }}
    />
  );
};

AddDayModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default AddDayModal;
