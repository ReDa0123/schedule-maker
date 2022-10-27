import { Box } from 'src/shared/design-system';

export const ContentBox = (props) => {
  return (
    <Box maxW="min(1032px, 100%)" marginX="auto" w="100%" p={4} {...props} />
  );
};
