import { ContentBox, Heading, Text, Button } from 'src/shared/design-system';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../organisms';

const LoginTemplate = ({ onSubmit, error }) => {
  const navigate = useNavigate();
  return (
    <ContentBox w="fit-content">
      <Heading fontSize={24} mb={4}>
        Login
      </Heading>
      <LoginForm onSubmit={onSubmit} errorMessage={error && error.message} />
      <Text mb={2}>Don&apos;t have an account? Sign up now!</Text>
      <Button onClick={() => navigate('/sign-up')} bg="white" color="blue.500">
        Sign Up
      </Button>
    </ContentBox>
  );
};

LoginTemplate.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default LoginTemplate;
