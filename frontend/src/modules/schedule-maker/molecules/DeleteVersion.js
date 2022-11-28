import { Button, useDisclosure, useToast } from 'src/shared/design-system';
import { gql, useMutation } from '@apollo/client';
import { useTournamentSchedule } from '../hooks';
import { AlertDialog } from '../../../shared/design-system/organisms';
import { useFormContext } from 'react-hook-form';
import { SCHEDULE_FORM_VERSION_NAME } from '../constants';

const DELETE_VERSION = gql`
  mutation DeleteVersion($versionId: Int!) {
    deleteVersion(versionId: $versionId)
  }
`;

const DeleteVersion = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getValues } = useFormContext();
  const { toastFn } = useToast();
  const { refetch } = useTournamentSchedule();
  const [deleteVersionRequest, deleteVersionState] = useMutation(
    DELETE_VERSION,
    {
      onCompleted: ({ deleteVersion: title }) => {
        toastFn({
          title,
          status: 'success',
        });
        refetch();
      },
      onError: ({ message: title }) => {
        toastFn({
          title,
          status: 'error',
        });
      },
    }
  );

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="red"
        isLoading={deleteVersionState?.loading}
      >
        Delete version
      </Button>
      <AlertDialog
        cancelButtonText="Cancel"
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={async () => {
          await deleteVersionRequest({
            variables: {
              versionId: Number(getValues(SCHEDULE_FORM_VERSION_NAME)),
            },
          });
          onClose();
        }}
        confirmButtonText="Delete"
        headerText="Delete version"
        bodyText={`Are you sure you want to delete this version? 
        Be sure to set a main version, if this version is now currently main.
        (If this is your last version, blocks will be un-versioned.)`}
        confirmButtonProps={{
          colorScheme: 'red',
          isLoading: deleteVersionState?.loading,
        }}
      />
    </>
  );
};

export default DeleteVersion;
