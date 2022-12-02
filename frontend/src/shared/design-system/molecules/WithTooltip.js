import { Flex, Icon, Square, Tooltip } from '@chakra-ui/react';
import { QuestionIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const WithTooltip = ({
  children,
  tooltipProps,
  standalone,
  label,
  icon,
  iconProps,
  ...props
}) =>
  standalone ? (
    <Flex alignItems="center" gap={2} {...props}>
      {children}
      <Tooltip placement="bottom" hasArrow label={label} {...tooltipProps}>
        {icon ? (
          <Square>
            <Icon as={icon} color="blue.500" {...iconProps} />
          </Square>
        ) : (
          <QuestionIcon color="blue.500" {...iconProps} />
        )}
      </Tooltip>
    </Flex>
  ) : (
    <Tooltip label={label} placement="bottom" hasArrow {...tooltipProps}>
      {children}
    </Tooltip>
  );

WithTooltip.propTypes = {
  children: PropTypes.node,
  tooltipProps: PropTypes.object,
  standalone: PropTypes.bool,
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  iconProps: PropTypes.object,
};

export default WithTooltip;
