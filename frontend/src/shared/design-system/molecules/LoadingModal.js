import { BigSpinner } from '../atoms';
import PropTypes from 'prop-types';
import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

const LoadingModal = ({ message }) => (
  <Modal isOpen={true} isCentered onClose={() => {}}>
    <ModalOverlay />
    <ModalContent>
      <ModalBody>
        <Flex justifyContent="center" alignItems="center" flexDir="column">
          <BigSpinner />
          {message && <Text mt={4}>{message}</Text>}
        </Flex>
      </ModalBody>
    </ModalContent>
  </Modal>
);

LoadingModal.propTypes = {
  message: PropTypes.string,
};

export default LoadingModal;
