import { useDisclosure, useToast } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Button } from 'src/shared/design-system';
import { AlertDialog } from 'src/shared/design-system/organisms';
import PropTypes from 'prop-types';
import { route } from 'src/Routes';

const DELETE_TOURNAMENT_MUTATION = gql`
  mutation DeleteTournament($tournamentId: Int!) {
    deleteTournament(tournamentId: $tournamentId)
  }
`;

const DeleteTournamentButton = ({ tournamentId }) => {
  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const navigate = useNavigate();
  const [deleteTournament] = useMutation(DELETE_TOURNAMENT_MUTATION, {
    onCompleted: ({ deleteTournament: successMessage }) => {
      toast({
        title: successMessage,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      navigate(route.tournamentsList());
    },
    onError: ({ message }) => {
      toast({
        title: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    },
  });

  const deleteTournamentHandler = useCallback(async () => {
    await deleteTournament({ variables: { tournamentId } });
  }, [deleteTournament, tournamentId]);

  return (
    <>
      <Button onClick={onOpen} colorScheme="red">
        Delete
      </Button>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={deleteTournamentHandler}
        confirmButtonText="Delete Tournament"
        cancelButtonText="Cancel"
        headerText="Delete Tournament"
        bodyText="Are you sure you want to delete this tournament? This action cannot be undone."
        confirmButtonProps={{ colorScheme: 'red' }}
      />
    </>
  );
};

DeleteTournamentButton.propTypes = {
  tournamentId: PropTypes.number.isRequired,
};

export default DeleteTournamentButton;
