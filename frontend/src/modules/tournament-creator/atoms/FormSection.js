import { Box, Heading } from 'src/shared/design-system';
import PropTypes from 'prop-types';

const FormSection = ({ children, title }) => (
  <Box marginBottom={20}>
    <Heading as="h3" size="md" marginY={4}>
      {title}
    </Heading>
    {children}
  </Box>
);

FormSection.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default FormSection;
