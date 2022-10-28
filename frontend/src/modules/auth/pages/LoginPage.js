import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { LoginTemplate } from '../templates';

const LoginPage = () => {
  const navigate = useNavigate();
  const onSubmit = useCallback(() => {
    navigate('/');
  }, [navigate]);
  return <LoginTemplate error={undefined} onSubmit={onSubmit} />;
};

export default LoginPage;
