import { useNavigate } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import { LoginTemplate } from '../templates';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../auth-core';
import { useToast } from 'src/shared/design-system';
import { AuthError } from '../atoms';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        userId
        username
        email
      }
      token
    }
  }
`;

const toastLoginId = 'loginError';

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { toast, toastFn } = useToast();
  const toastErrorRef = useRef();
  const [loginRequest] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login: { user, token } }) => {
      auth.login({ token, user });
      toast.isActive(toastLoginId) && toast.close(toastLoginId);
      toastFn({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
      });
      navigate('/');
    },
    onError: (error) => {
      const toastOptions = {
        title: 'Login Error',
        description: error.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
        position: 'top-right',
        id: toastLoginId,
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
      await loginRequest({ variables });
    },
    [loginRequest]
  );
  return auth.user ? (
    <AuthError message="You are already logged in." />
  ) : (
    <LoginTemplate onSubmit={onSubmit} />
  );
};

export default LoginPage;
