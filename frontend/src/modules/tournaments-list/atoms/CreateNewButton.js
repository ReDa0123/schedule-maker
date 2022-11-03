import { Button } from '../../../shared/design-system';

const CreateNewClicked = () => {
  alert('Altmanova práce');
};

const CreateNewButton = () => {
  return <Button onClick={CreateNewClicked}>Create new</Button>;
};

export default CreateNewButton;
