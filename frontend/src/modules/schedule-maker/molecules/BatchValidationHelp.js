import { useTournamentSchedule } from '../hooks';
import { Button, useDisclosure } from 'src/shared/design-system';
import { Modal } from 'src/shared/design-system/organisms';
import BatchValidationHelpModalBody from '../atoms/BatchValidationHelpModalBody';

const BatchValidationHelp = () => {
  const { sports } = useTournamentSchedule();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>DATA VALIDATION HELP</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        headerText="Data Validation Help"
        modalBody={<BatchValidationHelpModalBody sports={sports} />}
        modalProps={{
          size: 'xl',
        }}
      />
    </>
  );
};

export default BatchValidationHelp;
