import { Button } from 'src/shared/design-system';
import { useNavigate } from 'react-router-dom';

const CreateNewButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate('/tournament-creator')}>Create new</Button>
  );
};

export default CreateNewButton;
