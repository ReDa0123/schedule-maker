import PropTypes from 'prop-types';
import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  Button,
  AlertDialogBody,
  AlertDialogFooter,
} from '../atoms';
import { useDisclosure } from '../hooks';
import { useCallback, useRef, cloneElement } from 'react';

const AlertDialog = ({
  openingElement,
  onDialogOpen,
  onDialogClose,
  onConfirm,
  headerText,
  bodyText,
  confirmButtonText,
  cancelButtonText,
  dialogProps,
  overlayProps,
  contentProps,
  headerProps,
  bodyProps,
  footerProps,
  confirmButtonProps,
  cancelButtonProps,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const leastDestructiveRef = useRef();

  const onOpenDialog = useCallback(() => {
    onDialogOpen && onDialogOpen();
    onOpen();
  }, [onDialogOpen, onOpen]);

  const onCloseDialog = useCallback(() => {
    onDialogClose && onDialogClose();
    onClose();
  }, [onDialogClose, onClose]);

  const onConfirmDialog = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  const OpeningElement = cloneElement(openingElement, {
    ...openingElement.props,
    onClick: (e) => {
      openingElement.props.onClick && openingElement.props.onClick(e);
      onOpenDialog();
    },
    onContextMenu: (e) => {
      e.preventDefault();
      openingElement.props.onContextMenu &&
        openingElement.props.onContextMenu(e);
      onOpenDialog();
    },
  });

  return (
    <>
      {OpeningElement}

      <ChakraAlertDialog
        leastDestructiveRef={leastDestructiveRef}
        isOpen={isOpen}
        onClose={onCloseDialog}
        {...dialogProps}
      >
        <AlertDialogOverlay {...overlayProps}>
          <AlertDialogContent {...contentProps}>
            {headerText && (
              <AlertDialogHeader {...headerProps}>
                {headerText}
              </AlertDialogHeader>
            )}
            {bodyText && (
              <AlertDialogBody {...bodyProps}>{bodyText}</AlertDialogBody>
            )}
            <AlertDialogFooter {...footerProps}>
              <Button
                ref={leastDestructiveRef}
                onClick={onCloseDialog}
                {...cancelButtonProps}
              >
                {cancelButtonText}
              </Button>
              <Button onClick={onConfirmDialog} ml={3} {...confirmButtonProps}>
                {confirmButtonText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </ChakraAlertDialog>
    </>
  );
};

AlertDialog.propTypes = {
  openingElement: PropTypes.node.isRequired,
  onDialogOpen: PropTypes.func,
  onDialogClose: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  headerText: PropTypes.string,
  bodyText: PropTypes.string,
  confirmButtonText: PropTypes.string.isRequired,
  cancelButtonText: PropTypes.string.isRequired,
  dialogProps: PropTypes.object,
  overlayProps: PropTypes.object,
  contentProps: PropTypes.object,
  headerProps: PropTypes.object,
  bodyProps: PropTypes.object,
  footerProps: PropTypes.object,
  confirmButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
};

export default AlertDialog;
