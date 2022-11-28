import { Button, useDisclosure } from 'src/shared/design-system';
import { Modal } from 'src/shared/design-system/organisms';
import { CreateVersionForm } from './';
import PropTypes from 'prop-types';

const VersionModal = ({ onSubmit, defaultValues, edit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>
        {edit ? 'Edit version name' : 'Create new version'}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        modalBody={
          <CreateVersionForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          />
        }
      />
    </>
  );
};

VersionModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    name: PropTypes.string,
  }),
  edit: PropTypes.bool,
};

export default VersionModal;
