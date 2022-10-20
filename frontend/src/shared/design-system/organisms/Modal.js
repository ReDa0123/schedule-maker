import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '../atoms';
import { useDisclosure } from '../hooks';
import { cloneElement, useCallback } from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  openingElement,
  onOpen: onModalOpen,
  onClose: onModalClose,
  headerText,
  modalBody,
  footerButtons,
  modalProps,
  overlayProps,
  contentProps,
  headerProps,
  bodyProps,
  footerProps,
  useModalCloseButton = true,
  useModalCloseButtonInFooter = true,
  modalCloseButtonProps,
  modalCloseButtonInFooterProps,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onOpenModal = useCallback(() => {
    onModalOpen && onModalOpen();
    onOpen();
  }, [onModalOpen, onOpen]);

  const onCloseModal = useCallback(() => {
    onModalClose && onModalClose();
    onClose();
  }, [onModalClose, onClose]);

  const OpeningElement = cloneElement(openingElement, {
    ...openingElement.props,
    onClick: (e) => {
      openingElement.props.onClick && openingElement.props.onClick(e);
      onOpenModal();
    },
  });

  return (
    <>
      {OpeningElement}

      <ChakraModal isOpen={isOpen} onClose={onCloseModal} {...modalProps}>
        <ModalOverlay {...overlayProps}>
          <ModalContent {...contentProps}>
            {headerText && (
              <ModalHeader {...headerProps}>{headerText}</ModalHeader>
            )}
            {useModalCloseButton && (
              <ModalCloseButton {...modalCloseButtonProps} />
            )}
            {modalBody && <ModalBody {...bodyProps}>{modalBody}</ModalBody>}
            <ModalFooter {...footerProps}>
              {useModalCloseButtonInFooter && (
                <Button
                  onClick={onCloseModal}
                  {...modalCloseButtonInFooterProps}
                >
                  Zavřít
                </Button>
              )}
              {footerButtons.map((button) => (
                <Button
                  ml={3}
                  {...button.props}
                  key={button.props.children}
                  onClick={() => {
                    button.props.onClick && button.props.onClick();
                    button.props.dontCloseAfterClick || onCloseModal();
                  }}
                />
              ))}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </ChakraModal>
    </>
  );
};

Modal.propTypes = {
  openingElement: PropTypes.element.isRequired,
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
