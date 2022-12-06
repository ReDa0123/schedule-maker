import { Flex } from 'src/shared/design-system';

const AgendaColumn = (props) => {
  return (
    <Flex
      flexDirection="column"
      gap={2}
      marginLeft="auto"
      marginRight="auto"
      w="fit-content"
      {...props}
    />
  );
};

export default AgendaColumn;
