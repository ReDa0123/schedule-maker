import { Flex, Heading, useToast } from 'src/shared/design-system';
import { useSelectedVersion, useTournamentSchedule } from '../hooks';
import { FormSelect } from 'src/shared/react-hook-form/molecules';
import { useCallback, useMemo } from 'react';
import { convertValuesToLabelValueObj } from 'src/shared/utils';
import { find, o, prop, propEq } from 'ramda';
import { isNilOrEmpty } from 'ramda-extension';
import { useFormContext } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { convertBlocksForSending } from '../utils/blocks';
import { SetMainVersionButton, VersionModal } from '../molecules';
import DeleteVersion from '../molecules/DeleteVersion';
import { SCHEDULE_FORM_NAME } from '../constants';

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

const EDIT_VERSION = gql`
  mutation EditVersion($name: String!, $versionId: Int!) {
    editVersion(name: $name, versionId: $versionId)
  }
`;

const Versions = () => {
  const {
    versions,
    refetch,
    tournament: { tournamentId, versionId },
  } = useTournamentSchedule();
  const { toastFn } = useToast();
  const selectedVersion = useSelectedVersion();
  const { getValues } = useFormContext();

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

  const [editVersionRequest] = useMutation(EDIT_VERSION, {
    onCompleted: ({ editVersion: title }) => {
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
  const onNewSubmit = useCallback(
    async ({ name }) => {
      const from = isNilOrEmpty(selectedVersion)
        ? null
        : Number(selectedVersion);
      const blocks = convertBlocksForSending(getValues(SCHEDULE_FORM_NAME));
      await createVersionRequest({
        variables: {
          name,
          tournamentId: Number(tournamentId),
          from,
          blocks,
        },
      });
    },
    [tournamentId, createVersionRequest, getValues, selectedVersion]
  );

  const onEditSubmit = useCallback(
    async ({ name }) => {
      await editVersionRequest({
        variables: { name, versionId: Number(selectedVersion) },
      });
    },
    [editVersionRequest, selectedVersion]
  );

  const options = useMemo(
    () =>
      convertValuesToLabelValueObj(prop('versionId'), prop('name'))(versions),
    [versions]
  );

  const versionName = useMemo(
    () => o(prop('name'), find(propEq('versionId', selectedVersion)))(versions),
    [versions, selectedVersion]
  );

  return (
    <>
      <Heading fontSize="24px" mb={4}>
        Versions
      </Heading>
      <Flex gap={4} alignItems="flex-end" mb={4}>
        {!isNilOrEmpty(versions) && (
          <>
            <FormSelect
              name="selectedVersion"
              options={options}
              label="Versions"
              createEmptyOption={false}
            />
            <SetMainVersionButton
              tournamentId={Number(tournamentId)}
              selectedVersion={selectedVersion}
              versionId={versionId}
            />
            <VersionModal
              onSubmit={onEditSubmit}
              edit
              defaultValues={{
                name: versionName,
              }}
            />
            <DeleteVersion />
          </>
        )}
        <VersionModal onSubmit={onNewSubmit} />
      </Flex>
    </>
  );
};

export default Versions;
