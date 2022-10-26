import ContentBox from 'src/shared/design-system/atoms/ContentBox';
import { RouterLink } from 'src/shared/navigation';

const TournamentsListPage = () => {
  return (
    <ContentBox>
      tady bude seznam turnajů...
      <br />
      <RouterLink to="/schedule-maker/1?detailmode=true">
        Tournamnet no. 001
      </RouterLink>
      <br />
      <RouterLink to="/schedule-maker/1?detailmode=false">
        Tournamnet no. 002
      </RouterLink>
    </ContentBox>
  );
};

export default TournamentsListPage;
