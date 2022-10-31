import { useNavigate } from 'react-router-dom';
import { Button, ContentBox, Heading, Text } from 'src/shared/design-system';
import PropTypes from 'prop-types';
import { SignUpForm } from '../organisms';

const SignUpTemplate = ({ onSubmit }) => {
  const navigate = useNavigate();
  return (
    <ContentBox w="fit-content">
      <Heading fontSize={24} mb={4}>
        Sign up
      </Heading>
      <SignUpForm onSubmit={onSubmit} />
      <Text mb={2}>Already have an account?</Text>
      <Button
        onClick={() => navigate('/login')}
        bg="white"
        color="blue.500"
        _hover={{
          color: 'white',
          bg: 'blue.400',
        }}
      >
        Login
      </Button>
    </ContentBox>
  );
};

SignUpTemplate.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpTemplate;
