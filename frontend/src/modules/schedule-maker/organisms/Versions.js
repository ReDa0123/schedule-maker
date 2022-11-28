import { Flex, useToast, Button } from 'src/shared/design-system';
import { useTournamentSchedule } from '../hooks';
import { FormSelect } from 'src/shared/react-hook-form/molecules';
import { useCallback, useMemo } from 'react';
import { convertValuesToLabelValueObj } from 'src/shared/utils';
import { find, o, prop, propEq } from 'ramda';
import { isNilOrEmpty } from 'ramda-extension';
import { useFormContext, useWatch } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { convertBlocksForSending } from '../utils/blocks';
import { VersionModal } from '../molecules';
import DeleteVersion from '../molecules/DeleteVersion';
import { SCHEDULE_FORM_NAME, SCHEDULE_FORM_VERSION_NAME } from '../constants';

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

const SET_MAIN_VERSION = gql`
  mutation SetMainVersion($tournamentId: Int!, $versionId: Int!) {
    setMainVersion(tournamentId: $tournamentId, versionId: $versionId)
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
    tournament: { tournamentId },
  } = useTournamentSchedule();
  const { toastFn } = useToast();
  const selectedVersion = useWatch({
    name: SCHEDULE_FORM_VERSION_NAME,
  });
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

  const [setMainVersionRequest, setMainVersionState] = useMutation(
    SET_MAIN_VERSION,
    {
      onCompleted: ({ setMainVersion: title }) => {
        toastFn({
          title,
          status: 'success',
        });
      },
      onError: ({ message: title }) => {
        toastFn({
          title,
          status: 'error',
        });
      },
    }
  );

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
    <Flex gap={4} alignItems="flex-end" mb={4}>
      {!isNilOrEmpty(versions) && (
        <>
          <FormSelect
            name="selectedVersion"
            options={options}
            label="Versions"
            createEmptyOption={false}
          />
          <Button
            onClick={async () => {
              const selectedVersion = Number(
                getValues(SCHEDULE_FORM_VERSION_NAME)
              );
              await setMainVersionRequest({
                variables: {
                  versionId: selectedVersion,
                  tournamentId: Number(tournamentId),
                },
              });
            }}
            isLoading={setMainVersionState?.loading}
            variant="outline"
          >
            Set as main version
          </Button>
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
  );
};

export default Versions;
