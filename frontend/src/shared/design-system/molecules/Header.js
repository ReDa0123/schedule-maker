import { RouterLink } from '../../navigation';
import {
  Image,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from 'src/modules/auth';
import { Button } from '../atoms';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';

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
      <Image
        position={'absolute'}
        left={'10px'}
        top={'10px'}
        w={'70px'}
        h={'70px'}
        src="/Logo.svg"
        cursor={'pointer'}
        onClick={() => navigate('/')}
      />

      <Flex
        w={'100%'}
        justifyContent={'flex-end'}
        alignItems={'center'}
        marginX={'30px'}
        display={{
          base: 'flex',
          md: 'none',
        }}
      >
        <Menu>
          <MenuButton as={HamburgerIcon} color={'white'} cursor={'pointer'} />
          <MenuList>
            <MenuItem>
              <RouterLink to="/" w={'100%'} h={'100%'}>
                Schedule Maker
              </RouterLink>
            </MenuItem>
            <MenuItem>
              <RouterLink to="/tournaments-list" w={'100%'} h={'100%'}>
                Tournaments
              </RouterLink>
            </MenuItem>
            <MenuItem>
              <RouterLink to="/tournament-creator" w={'100%'} h={'100%'}>
                Create Tournament
              </RouterLink>
            </MenuItem>
            {!auth.user ? (
              <>
                <MenuItem>
                  <RouterLink to="/login" w={'100%'} h={'100%'}>
                    Login
                  </RouterLink>
                </MenuItem>
                <MenuItem>
                  <RouterLink to="/sign-up" w={'100%'} h={'100%'}>
                    Sign up
                  </RouterLink>
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={handleSignout}
                w={'100%'}
                h={'100%'}
                color={'blue.600'}
              >
                Sign Out
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Flex>

      <Flex
        paddingLeft={'70px'}
        w={'100%'}
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
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
            <Button
              onClick={handleSignout}
              variant="outline"
              marginRight={'30px'}
              color={'white'}
              _hover={{ color: 'blue.300', bg: 'white' }}
            >
              Sign out
            </Button>
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
                <Button
                  variant="outline"
                  marginX="10px"
                  color={'white'}
                  _hover={{ color: 'blue.300', bg: 'white' }}
                >
                  Sign in
                </Button>
              </RouterLink>
            </Center>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
