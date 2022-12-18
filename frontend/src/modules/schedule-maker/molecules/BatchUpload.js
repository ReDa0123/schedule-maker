import {
  Box,
  Input,
  Heading,
  Flex,
  Button,
  useToast,
  WithTooltip,
} from 'src/shared/design-system';
import { useCallback, useRef, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useSelectedVersion, useTournamentSchedule } from '../hooks';
import { partition, propEq } from 'ramda';
import { BatchError, SoftErrorsList } from '../atoms';
import { DownloadIcon } from '@chakra-ui/icons';
import { BatchValidationHelp } from './';

const UPLOAD_BLOCKS_MUTATION = gql`
  mutation BatchUploadBlocks(
    $file: Upload!
    $tournamentId: Int!
    $versionId: Int
  ) {
    batchUploadBlocks(
      file: $file
      tournamentId: $tournamentId
      versionId: $versionId
    ) {
      severity
      message
    }
  }
`;

const DOWNLOAD_TEMPLATE_URL = `${process.env.REACT_APP_SERVER_RESOURCES}/batchTemplate`;

const BatchUpload = () => {
  const { toastFn } = useToast();
  const {
    refetch,
    tournament: { tournamentId },
  } = useTournamentSchedule();
  const versionId = useSelectedVersion();
  const [errors, setErrors] = useState([]);

  const [uploadBlocks, uploadBlocksState] = useMutation(
    UPLOAD_BLOCKS_MUTATION,
    {
      onCompleted: ({ batchUploadBlocks: errors }) => {
        const [hardErrors, softErrors] = partition(
          propEq('severity', 'error'),
          errors
        );
        setErrors(hardErrors);
        if (softErrors.length > 0) {
          toastFn({
            title: 'Blocks with same category found',
            description: <SoftErrorsList errors={softErrors} />,
            status: 'warning',
            duration: null,
            isClosable: true,
          });
        }
        if (hardErrors.length === 0) {
          toastFn({
            title: 'Blocks uploaded',
            status: 'success',
          });
          refetch();
        } else {
          toastFn({
            title: 'Validation errors found in uploaded file',
            description:
              'Take a look at the errors below the upload section, try to fix them and try again. No blocks were created yet.',
            status: 'error',
          });
        }
      },
      onError: ({ message }) => {
        toastFn({
          title: message,
          status: 'error',
        });
      },
    }
  );

  const fileInputRef = useRef(null);

  const onSubmit = useCallback(async () => {
    const currentFiles = fileInputRef.current.files;
    if (currentFiles.length !== 1) {
      return toastFn({
        title: 'Please select a xlsx file',
        status: 'error',
        duration: 2000,
      });
    }
    const file = currentFiles[0];
    await uploadBlocks({
      variables: {
        file,
        tournamentId: Number(tournamentId),
        versionId,
      },
    });
  }, [uploadBlocks, tournamentId, versionId, toastFn]);

  return (
    <Box>
      <Heading fontSize={20} mb={4}>
        Batch Import
      </Heading>
      <Flex gap={4}>
        <Input
          type="file"
          accept=".xlsx"
          borderWidth={2}
          borderColor="blue.500"
          w="320px"
          _hover={{ borderColor: 'blue.700' }}
          ref={fileInputRef}
        />
        <Button onClick={onSubmit} isLoading={uploadBlocksState?.loading}>
          Upload
        </Button>
        <Button
          as="a"
          leftIcon={<DownloadIcon />}
          variant="outline"
          cursor="pointer"
          download
          href={DOWNLOAD_TEMPLATE_URL}
        >
          Download Template
        </Button>
        {<BatchValidationHelp />}
      </Flex>
      {errors.length > 0 && (
        <Flex direction="column" gap={4} mt={4}>
          <WithTooltip
            label="If you need help fixing these errors, take a look at the helper table under the button 'DATA VALIDATION HELP'"
            standalone
          >
            <Heading fontSize={16} color="red.500">
              Validation Errors
            </Heading>
          </WithTooltip>
          {errors.map(({ message }, index) => (
            <BatchError
              message={message}
              key={message}
              hide={() =>
                setErrors((prev) => prev.filter((_, i) => i !== index))
              }
            />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default BatchUpload;
