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
    <Flex bg="blue.600" minH="60px" {...props}>
      <Center marginX={'15px'} marginLeft={'30px'}>
        <RouterLink to="/" color="white">
          Schedule Maker
        </RouterLink>
      </Center>

      <Center marginX={'15px'}>
        <RouterLink to="/tournaments-list" color="white">
          Tournaments
        </RouterLink>
      </Center>

      <Center marginX={'15px'}>
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
              <Button
                colorScheme="gray"
                variant="solid"
                color="blue.600"
                marginX="10px"
              >
                Login
              </Button>
            </RouterLink>
          </Center>
          <Center>
            <RouterLink to="/sign-up" color="white" marginRight={'30px'}>
              <Button colorScheme="gray" variant="outline" marginX="10px">
                Sign in
              </Button>
            </RouterLink>
          </Center>
        </>
      )}
    </Flex>
  );
};

export default Header;
