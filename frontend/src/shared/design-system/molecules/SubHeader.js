import { Button, Center, Flex, Text } from '../atoms';
import { RouterLink } from '../../navigation';
import PropTypes from 'prop-types';
import { Divider } from '@chakra-ui/react';

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
      <Center flexShrink="0">
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

      <Center flexShrink={'0'}>
        <Text
          color={'blue.600'}
          fontSize={{
            base: '2xl',
            sm: '3xl',
          }}
        >
          {title}
        </Text>
      </Center>

      <Center
        flexGrow={'1'}
        display={{
          base: 'none',
          sm: 'flex',
        }}
      >
        <Divider
          marginX={'20px'}
          marginTop={'10px'}
          height={'5px'}
          orientation="horizontal"
          bgColor={'blue.500'}
          opacity={'1'}
        />
      </Center>
    </Flex>
  );
};

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
};

export default SubHeader;
