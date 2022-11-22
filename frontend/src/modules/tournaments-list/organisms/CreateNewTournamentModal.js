import { Modal } from 'src/shared/design-system/organisms';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { convertValuesForSending, CREATE_TOURNAMENT_MUTATION } from '../utils';
import { useMutation } from '@apollo/client';
import { useToast } from 'src/shared/design-system';
import { route } from 'src/Routes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BasicTournamentForm } from '../../tournament-creator/organisms';

const CreateNewTournamentModal = ({ isOpen, onClose, onOpen }) => {
  const { toastFn } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    searchParams.get('create') === 'true' && onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [createTournament] = useMutation(CREATE_TOURNAMENT_MUTATION, {
    onCompleted: ({ createTournament: newTournamentId }) => {
      toastFn({
        title: 'Tournament created successfully',
        status: 'success',
      });
      navigate(route.tournamentCreator({ id: newTournamentId }));
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
      const variables = convertValuesForSending(values);
      await createTournament({
        variables,
      });
    },
    [createTournament]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={() => {
        onOpen();
      }}
      title="Create new tournament"
      modalBody={<BasicTournamentForm onSubmit={onSubmit} />}
      headerText="Create new tournament"
      modalProps={{
        size: 'xl',
      }}
    />
  );
};

CreateNewTournamentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default CreateNewTournamentModal;
