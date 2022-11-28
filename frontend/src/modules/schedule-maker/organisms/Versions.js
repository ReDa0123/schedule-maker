import { Box, Button, useToast } from 'src/shared/design-system';
import { useTournamentSchedule } from '../hooks';
import { FormSelect } from 'src/shared/react-hook-form/molecules';
import { useCallback, useMemo } from 'react';
import { convertValuesToLabelValueObj } from 'src/shared/utils';
import { prop } from 'ramda';
import { isNilOrEmpty } from 'ramda-extension';
import { useFormContext } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { convertBlocksForSending } from '../utils/blocks';

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

  const [createVersionRequest, createVersionState] = useMutation(
    CREATE_NEW_VERSION_WITH_BLOCKS,
    {
      onCompleted: ({ createVersionWithBlocks: versionId }) => {
        toastFn({
          title: `Version with id ${versionId} created successfully.`,
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
    }
  );

  const onCreateVersion = useCallback(async () => {
    const name = 'TEST2';
    const selectedVersion = getValues('selectedVersion');
    const from = isNilOrEmpty(selectedVersion) ? null : Number(selectedVersion);
    const blocks = convertBlocksForSending(getValues('schedule'));
    await createVersionRequest({
      variables: {
        name,
        tournamentId: Number(tournamentId),
        from,
        blocks,
      },
    });
  }, [tournamentId, createVersionRequest, getValues]);

  const options = useMemo(
    () =>
      convertValuesToLabelValueObj(prop('versionId'), prop('name'))(versions),
    [versions]
  );
  return (
    <Box>
      {!isNilOrEmpty(versions) && (
        <FormSelect
          name="selectedVersion"
          options={options}
          label="Versions"
          createEmptyOption={false}
        />
      )}

      <Button onClick={onCreateVersion} isLoading={createVersionState?.loading}>
        Create version
      </Button>
    </Box>
  );
};

export default Versions;
