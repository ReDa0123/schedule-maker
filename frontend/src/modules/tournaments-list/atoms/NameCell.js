import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';
import PropTypes from 'prop-types';

const NameCell = ({
  row: {
    original: { name, tournamentId },
  },
}) => (
  <RouterLink to={route.scheduleMaker({ id: tournamentId })}>{name}</RouterLink>
);

NameCell.propTypes = {
  row: PropTypes.object,
};

export default NameCell;
