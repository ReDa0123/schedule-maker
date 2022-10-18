import { Box, Heading } from 'src/shared/design-system';

import { route } from 'src/Routes';

import { RouterLink } from '../atoms';

export function NotFoundPage() {
  return (
    <Box maxW="30rem" mx="auto" py="12">
      <Heading fontSize="3xl">Error 404</Heading>
      <Box>
        Page not found, please return to{' '}
        <RouterLink to={route.home()}>Home</RouterLink>.
      </Box>
    </Box>
  );
}
