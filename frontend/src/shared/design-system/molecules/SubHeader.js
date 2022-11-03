import { Button, Center, Flex, Text } from '../atoms';
import { RouterLink } from '../../navigation';
import PropTypes from 'prop-types';

const SubHeader = ({ title, path = '/' }) => {
  return (
    <Flex
      direction={'row'}
      marginY={'30px'}
      marginX={{
        base: '0px',
        md: '20px',
      }}
    >
      <Center>
        <RouterLink to={path} marginX="20px">
          <Button
            colorScheme="blue"
            variant="solid"
            size={{
              base: 'xs',
              md: 'sm',
            }}
          >
            Back
          </Button>
        </RouterLink>
      </Center>

      <Center>
        <Text color={'blue.600'} fontSize="3xl">
          {title}
        </Text>
      </Center>
    </Flex>
  );
};

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
};

export default SubHeader;
