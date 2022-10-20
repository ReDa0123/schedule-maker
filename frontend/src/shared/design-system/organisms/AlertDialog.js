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
import { useRef } from 'react';

const AlertDialog = ({
  onClose,
  isOpen,
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
  const leastDestructiveRef = useRef();

  return (
    <ChakraAlertDialog
      leastDestructiveRef={leastDestructiveRef}
      isOpen={isOpen}
      onClose={onClose}
      {...dialogProps}
    >
      <AlertDialogOverlay {...overlayProps}>
        <AlertDialogContent {...contentProps}>
          {headerText && (
            <AlertDialogHeader {...headerProps}>{headerText}</AlertDialogHeader>
          )}
          {bodyText && (
            <AlertDialogBody {...bodyProps}>{bodyText}</AlertDialogBody>
          )}
          <AlertDialogFooter {...footerProps}>
            <Button
              ref={leastDestructiveRef}
              onClick={onClose}
              {...cancelButtonProps}
            >
              {cancelButtonText}
            </Button>
            <Button onClick={onConfirm} ml={3} {...confirmButtonProps}>
              {confirmButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  );
};

AlertDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
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
