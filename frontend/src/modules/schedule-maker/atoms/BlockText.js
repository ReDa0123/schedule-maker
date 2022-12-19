import { Box } from 'src/shared/design-system';

const BlockText = (props) => (
  <Box
    overflow="hidden"
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    {...props}
  />
);

export default BlockText;
