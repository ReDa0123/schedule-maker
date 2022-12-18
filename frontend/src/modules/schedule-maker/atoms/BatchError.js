import { Flex, IconButton, Text, WithTooltip } from 'src/shared/design-system';
import PropTypes from 'prop-types';
import { WarningIcon, ViewOffIcon } from '@chakra-ui/icons';

const BatchError = ({ message, hide }) => (
  <Flex
    w="100%"
    p={2}
    border="2px solid"
    borderColor="red.500"
    borderRadius="md"
    gap={4}
    alignItems="center"
  >
    <WarningIcon color="red.500" />
    <Text fontWeight={500}>{message}</Text>
    <WithTooltip label="Hide validation error">
      <IconButton
        aria-label={`Hide error: ${message}`}
        icon={<ViewOffIcon />}
        onClick={hide}
        ml="auto"
        colorScheme="blue"
      />
    </WithTooltip>
  </Flex>
);

BatchError.propTypes = {
  message: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
};

export default BatchError;
