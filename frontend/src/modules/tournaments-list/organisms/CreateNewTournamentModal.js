import { Modal } from '../../../shared/design-system/organisms';
import CreateNewTournamentForm from './CreateNewTournamentForm';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { convertValuesForSending, CREATE_TOURNAMENT_MUTATION } from '../utils';
import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { route } from '../../../Routes';
import { useNavigate } from 'react-router-dom';

const CreateNewTournamentModal = ({ isOpen, onClose, onOpen }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [createTournament] = useMutation(CREATE_TOURNAMENT_MUTATION, {
    onCompleted: ({ createTournament: newTournamentId }) => {
      toast({
        title: 'Tournament created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      navigate(route.tournamentCreator({ id: newTournamentId }));
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
      const newTournament = convertValuesForSending(values);
      await createTournament({
        variables: newTournament,
      });
      onClose();
    },
    [onClose, createTournament]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={() => {
        onOpen();
      }}
      title="Create new tournament"
      modalBody={<CreateNewTournamentForm onSubmit={onSubmit} />}
    />
  );
};

CreateNewTournamentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default CreateNewTournamentModal;
