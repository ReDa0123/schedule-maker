import { RepeatClockIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { WithTooltip } from 'src/shared/design-system/molecules';

const ResetBlockButton = ({ resetBlock }) => (
  <WithTooltip label="Reset block">
    <RepeatClockIcon
      position="absolute"
      top={2}
      right={12}
      boxSize={3}
      color="green.500"
      focusable
      cursor="pointer"
      onClick={resetBlock}
    />
  </WithTooltip>
);

ResetBlockButton.propTypes = {
  resetBlock: PropTypes.func.isRequired,
};

export default ResetBlockButton;
