import {
  Flex,
  useToast,
  useDisclosure,
  Button,
} from 'src/shared/design-system';
import { useTournamentSchedule } from '../hooks';
import { FormSelect } from 'src/shared/react-hook-form/molecules';
import { useCallback, useMemo } from 'react';
import { convertValuesToLabelValueObj } from 'src/shared/utils';
import { prop } from 'ramda';
import { isNilOrEmpty } from 'ramda-extension';
import { useFormContext } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { convertBlocksForSending } from '../utils/blocks';
import { Modal } from 'src/shared/design-system/organisms';
import { CreateVersionForm } from '../molecules';

const CREATE_NEW_VERSION_WITH_BLOCKS = gql`
  mutation CreateVersionWithBlocks(
    $name: String!
    $tournamentId: Int!
    $blocks: [BlockInput!]!
    $from: Int
  ) {
    createVersionWithBlocks(
      blocks: $blocks
      tournamentId: $tournamentId
      name: $name
      from: $from
    )
  }
`;

const Versions = () => {
  const {
    versions,
    refetch,
    tournament: { tournamentId },
  } = useTournamentSchedule();
  const { toastFn } = useToast();
  const { getValues } = useFormContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createVersionRequest] = useMutation(CREATE_NEW_VERSION_WITH_BLOCKS, {
    onCompleted: ({ createVersionWithBlocks: title }) => {
      toastFn({
        title,
        status: 'success',
      });
      refetch();
    },
    onError: ({ message }) => {
      toastFn({
        title: message,
        status: 'error',
      });
    },
  });

  const onSubmit = useCallback(
    async ({ name }) => {
      const selectedVersion = getValues('selectedVersion');
      const from = isNilOrEmpty(selectedVersion)
        ? null
        : Number(selectedVersion);
      const blocks = convertBlocksForSending(getValues('schedule'));
      await createVersionRequest({
        variables: {
          name,
          tournamentId: Number(tournamentId),
          from,
          blocks,
        },
      });
    },
    [tournamentId, createVersionRequest, getValues]
  );

  const options = useMemo(
    () =>
      convertValuesToLabelValueObj(prop('versionId'), prop('name'))(versions),
    [versions]
  );
  return (
    <Flex gap={4} alignItems="flex-end" mb={4}>
      {!isNilOrEmpty(versions) && (
        <FormSelect
          name="selectedVersion"
          options={options}
          label="Versions"
          createEmptyOption={false}
        />
      )}
      <Button onClick={onOpen}>Create new version</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        modalBody={<CreateVersionForm onSubmit={onSubmit} />}
      />
    </Flex>
  );
};

export default Versions;
