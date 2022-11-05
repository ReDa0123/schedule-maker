import { Modal } from 'src/shared/design-system/organisms';
import { BlockForm } from '../molecules';
import PropTypes from 'prop-types';

const EditBlockModal = ({ isOpen, onClose, onOpen, editBlock, block }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    onOpen={onOpen}
    headerText="Edit block"
    modalBody={<BlockForm onSubmit={editBlock} defaultValues={block} />}
    contentProps={{ w: 'fit-content', maxW: 'fit-content' }}
  />
);

EditBlockModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  editBlock: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
};

export default EditBlockModal;
