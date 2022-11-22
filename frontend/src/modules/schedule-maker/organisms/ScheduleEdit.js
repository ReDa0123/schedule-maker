import ScheduleForm from './ScheduleForm';
import { useCallback } from 'react';
import { useAuth } from '../../auth';
import { useTournamentSchedule } from '../hooks';
import { AuthError } from '../../auth/atoms';
import { route } from 'src/Routes';
import { useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useToast } from 'src/shared/design-system';
import { convertBlocksForSending } from '../utils/blocks';

const SAVE_BLOCKS_MUTATION = gql`
  mutation SaveBlocks($blocks: [BlockInput!]!, $tournamentId: Int!) {
    saveBlocks(blocks: $blocks, tournamentId: $tournamentId)
  }
`;

const ScheduleEdit = () => {
  const auth = useAuth();
  const { toastFn } = useToast();
  const [saveBlocksRequest, saveBlocksRequestState] = useMutation(
    SAVE_BLOCKS_MUTATION,
    {
      onCompleted: ({ saveBlocks: successMessage }) => {
        toastFn({
          title: successMessage,
          status: 'success',
        });
      },
      onError: ({ message }) => {
        toastFn({
          title: message,
          status: 'error',
        });
      },
    }
  );
  const { tournamentId } = useParams();
  const {
    tournament: { userId },
  } = useTournamentSchedule();
  const canEdit = auth.user && auth.user.userId === userId;
  const onSubmit = useCallback(
    async ({ schedule }) => {
      const blocks = convertBlocksForSending(schedule);
      await saveBlocksRequest({
        variables: { blocks, tournamentId: Number(tournamentId) },
      });
    },
    [saveBlocksRequest, tournamentId]
  );

  return canEdit ? (
    <ScheduleForm
      onSubmit={onSubmit}
      isSaving={saveBlocksRequestState.loading}
    />
  ) : (
    <AuthError
      message="You are not authorized to edit the schedule of this tournament."
      to={route.scheduleMaker({ id: tournamentId })}
      linkMessage="View Schedule"
    />
  );
};

export default ScheduleEdit;
