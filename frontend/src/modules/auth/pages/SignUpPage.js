import { useNavigate } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import { SignUpTemplate } from '../templates';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../auth-core';
import { useToast } from '@chakra-ui/react';
import { AuthError } from '../atoms';

const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      user {
        userId
        username
        email
      }
      token
    }
  }
`;

const signUpErrorId = 'signUpError';

const SignUpPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const toastErrorRef = useRef();
  const [signUpRequest] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signup: { user, token } }) => {
      auth.login({ token, user });
      toast.isActive(signUpErrorId) && toast.close(signUpErrorId);
      toast({
        title: 'Sign Up successful',
        description: 'You are now logged in',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      navigate('/');
    },
    onError: (error) => {
      const toastOptions = {
        title: 'Sign Up Error',
        description: error.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
        position: 'top-right',
        id: signUpErrorId,
      };
      if (!toastErrorRef.current || !toast.isActive(toastErrorRef.current)) {
        toastErrorRef.current = toast(toastOptions);
      } else {
        toast.update(toastErrorRef.current, toastOptions);
      }
    },
  });

  const onSubmit = useCallback(
    async (variables) => {
      await signUpRequest({ variables });
    },
    [signUpRequest]
  );
  return auth.user ? (
    <AuthError message="You are already logged in." />
  ) : (
    <SignUpTemplate onSubmit={onSubmit} />
  );
};

export default SignUpPage;
