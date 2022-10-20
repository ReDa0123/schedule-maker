import { Flex, Icon, Square, Tooltip } from '../atoms';
import { QuestionIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const WithTooltip = ({ children, tooltipProps, standalone, label, icon }) =>
  standalone ? (
    <Flex alignItems="center" gap={2}>
      {children}
      <Tooltip placement="bottom" hasArrow label={label} {...tooltipProps}>
        {icon ? (
          <Square>
            <Icon as={icon} />
          </Square>
        ) : (
          <QuestionIcon />
        )}
      </Tooltip>
    </Flex>
  ) : (
    <Tooltip label={label} placement="bottom" hasArrow {...tooltipProps}>
      {children}
    </Tooltip>
  );

WithTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  tooltipProps: PropTypes.object,
  standalone: PropTypes.bool,
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};

export default WithTooltip;
