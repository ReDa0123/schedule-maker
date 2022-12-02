import { Button, useToast } from 'src/shared/design-system';
import { useMemo, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

const SET_MAIN_VERSION = gql`
  mutation SetMainVersion($tournamentId: Int!, $versionId: Int!) {
    setMainVersion(tournamentId: $tournamentId, versionId: $versionId)
  }
`;

const SetMainVersionButton = ({ selectedVersion, versionId, tournamentId }) => {
  const { toastFn } = useToast();
  const [mainVersionId, setMainVersionId] = useState(versionId);
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

  const mainVersionSelected = useMemo(
    () => selectedVersion === mainVersionId,
    [selectedVersion, mainVersionId]
  );

  return (
    <Button
      onClick={async () => {
        await setMainVersionRequest({
          variables: {
            versionId: selectedVersion,
            tournamentId,
          },
        });
        setMainVersionId(selectedVersion);
      }}
      minW="205px"
      isLoading={setMainVersionState?.loading}
      variant="outline"
      disabled={mainVersionSelected}
    >
      {mainVersionSelected ? 'Already main version' : 'Set as main version'}
    </Button>
  );
};

SetMainVersionButton.propTypes = {
  selectedVersion: PropTypes.number.isRequired,
  versionId: PropTypes.number,
  tournamentId: PropTypes.number.isRequired,
};

export default SetMainVersionButton;
