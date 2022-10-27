import { RouterLink } from '../../navigation';
import { Center, Flex, Spacer } from '@chakra-ui/react';

const Header = (props) => {
  return (
    <Flex bg="blue.600" minH="50px" {...props}>
      <Spacer />

      <Center>
        <RouterLink to="/" color="white">
          Schedule Maker
        </RouterLink>
      </Center>

      <Spacer />

      <Center>
        <RouterLink to="/tournaments-list" color="white">
          Tournaments
        </RouterLink>
      </Center>

      <Spacer />

      <Center>
        <RouterLink to="/tournament-creator" color="white">
          Create Tournament
        </RouterLink>
      </Center>

      <Spacer />

      <Center>
        <RouterLink to="/login" color="white">
          Login
        </RouterLink>
      </Center>

      <Spacer />

      <Center>
        <RouterLink to="/sign-up" color="white">
          Sign Up
        </RouterLink>
      </Center>

      <Spacer />
    </Flex>
  );
};

export default Header;
