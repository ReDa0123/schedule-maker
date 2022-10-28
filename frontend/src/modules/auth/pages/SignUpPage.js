import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { SignUpTemplate } from '../templates';

const SignUpPage = () => {
  const navigate = useNavigate();
  const onSubmit = useCallback(() => {
    navigate('/');
  }, [navigate]);
  return <SignUpTemplate onSubmit={onSubmit} error={undefined} />;
};

export default SignUpPage;
