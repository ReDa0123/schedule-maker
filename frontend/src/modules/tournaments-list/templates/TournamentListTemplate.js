import SubHeader from 'src/shared/design-system/molecules/SubHeader';
import { BigSpinner, ContentBox, ErrorText } from 'src/shared/design-system';
import { TournamentList } from '../organisms';
import PropTypes from 'prop-types';

const TournamentListTemplate = ({ tournaments, error, isLoading }) => (
  <>
    <SubHeader title="Tournaments" />
    {isLoading ? (
      <BigSpinner />
    ) : (
      <ContentBox>
        {error ? (
          <ErrorText text={error.message} />
        ) : (
          <TournamentList tournaments={tournaments} />
        )}
      </ContentBox>
    )}
  </>
);

TournamentListTemplate.propTypes = {
  tournaments: PropTypes.array,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default TournamentListTemplate;
