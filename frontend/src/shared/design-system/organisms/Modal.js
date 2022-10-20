import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '../atoms';
import PropTypes from 'prop-types';

const Modal = ({
  isOpen,
  onClose,
  headerText,
  modalBody,
  footerContent,
  useModalCloseButton = true,
  modalProps,
  overlayProps,
  contentProps,
  headerProps,
  bodyProps,
  footerProps,
  modalCloseButtonProps,
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...modalProps}>
      <ModalOverlay {...overlayProps}>
        <ModalContent {...contentProps}>
          {headerText && (
            <ModalHeader {...headerProps}>{headerText}</ModalHeader>
          )}
          {useModalCloseButton && (
            <ModalCloseButton {...modalCloseButtonProps} />
          )}
          {modalBody && <ModalBody {...bodyProps}>{modalBody}</ModalBody>}
          <ModalFooter {...footerProps}>{footerContent}</ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </ChakraModal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  footerContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  headerText: PropTypes.string,
  modalBody: PropTypes.node,
  footerButtons: PropTypes.arrayOf(PropTypes.element),
  modalProps: PropTypes.object,
  overlayProps: PropTypes.object,
  contentProps: PropTypes.object,
  headerProps: PropTypes.object,
  bodyProps: PropTypes.object,
  footerProps: PropTypes.object,
  useModalCloseButton: PropTypes.bool,
  useModalCloseButtonInFooter: PropTypes.bool,
  modalCloseButtonProps: PropTypes.object,
  modalCloseButtonInFooterProps: PropTypes.object,
};

export default Modal;
