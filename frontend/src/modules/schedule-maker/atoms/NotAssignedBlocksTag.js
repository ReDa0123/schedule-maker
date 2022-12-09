import { Box } from 'src/shared/design-system';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const NotAssignedBlocksTag = ({ value, ...props }) => {
  const [hasAfter, setHasAfter] = useState(true);
  useEffect(() => {
    setHasAfter(true);
    const timeout = setTimeout(() => {
      setHasAfter(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);
  return (
    <Box
      bg="green.500"
      color="white"
      position="absolute"
      px="0.5em"
      py="0.25em"
      borderRadius="lg"
      fontSize="xs"
      top="-10px"
      right="-10px"
      zIndex={1}
      sx={
        hasAfter
          ? {
              '::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                bg: 'green.500',
                opacity: 0.5,
                zIndex: -1,
                borderRadius: 'lg',
                transform: 'scale(1.5)',
              },
            }
          : undefined
      }
      {...props}
    >
      {value}
    </Box>
  );
};

NotAssignedBlocksTag.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default NotAssignedBlocksTag;
