import { Box, Tab } from 'src/shared/design-system';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { always } from 'ramda';
import { BLOCK_DND_NAME } from '../constants';

const DayTabContent = ({ description, date, setIndex, index }) => {
  const [, drop] = useDrop({
    accept: BLOCK_DND_NAME,
    hover: () => setIndex(index),
    canDrop: always(false),
  });
  return (
    <Tab ref={drop}>
      <Box
        w="100%"
        color="blue.600"
        fontSize={20}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        textAlign="start"
      >
        {description}
      </Box>
      <Box color="blue.600" w="100%" textAlign="start">
        {format(new Date(Number(date)), 'dd.MM.yyyy')}
      </Box>
    </Tab>
  );
};

DayTabContent.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default DayTabContent;
