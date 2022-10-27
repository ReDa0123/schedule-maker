import { Tag } from 'src/shared/design-system';
import PropTypes from 'prop-types';

const TimeTag = ({ time, ...props }) => (
  <Tag size="md" bg="blue.500" color="orange.100" {...props}>
    {`${time} min${time > 1 ? 's' : ''}`}
  </Tag>
);

TimeTag.propTypes = {
  time: PropTypes.number.isRequired,
};

export default TimeTag;
