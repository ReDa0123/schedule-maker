import { RouterLink } from 'src/shared/navigation';
import { Text, ContentBox } from 'src/shared/design-system';

const LoginPage = () => {
  return (
    <ContentBox>
      <Text>Tady se uživatel přihlásí</Text>
      <br />
      <RouterLink to="/tournaments-list">Log in</RouterLink>
    </ContentBox>
  );
};

export default LoginPage;
