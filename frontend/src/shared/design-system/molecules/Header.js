import { RouterLink } from '../../navigation';
import { Center, Flex, Spacer, useToast } from '@chakra-ui/react';
import { useAuth } from 'src/modules/auth';
import { Button } from '../atoms';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const Header = (props) => {
  const auth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const handleSignout = useCallback(() => {
    auth.signout();
    toast({
      title: 'You have been logged out',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
    navigate('/');
  }, [auth, toast, navigate]);

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

      {auth.user ? (
        <Center>
          <Button onClick={handleSignout}>Sign out</Button>
        </Center>
      ) : (
        <>
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
        </>
      )}

      <Spacer />
    </Flex>
  );
};

export default Header;
