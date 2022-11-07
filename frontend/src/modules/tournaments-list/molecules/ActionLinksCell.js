import PropTypes from 'prop-types';
import { useAuth } from '../../auth';
import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';
import { ActionButton, ActionMenu } from '../atoms';

const ActionLinksCell = ({
  row: {
    original: { tournamentId, userId },
  },
}) => {
  const { user } = useAuth();

  return user?.userId !== userId ? (
    <RouterLink
      to={route.scheduleMaker({ id: tournamentId })}
      _hover={{ underline: 'none' }}
    >
      <ActionButton>Details</ActionButton>
    </RouterLink>
  ) : (
    <ActionMenu tournamentId={tournamentId} />
  );
};

ActionLinksCell.propTypes = {
  row: PropTypes.object,
};

export default ActionLinksCell;
