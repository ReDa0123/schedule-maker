import { Button, Center, Flex, Text } from '../atoms';
import { RouterLink } from '../../navigation';

const SubHeader = (props) => {
  // eslint-disable-next-line react/prop-types
  const { title } = props;

  return (
    <Flex direction={'row'} marginY={'30px'} marginX={'20px'}>
      <Center>
        <RouterLink to="/" marginX="20px">
          <Button colorScheme="blue" variant="solid">
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

export default SubHeader;
