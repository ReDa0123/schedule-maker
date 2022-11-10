import { Heading, Flex } from 'src/shared/design-system';

const AddedDaysHeader = () => {
  return (
    <Flex
      gap={4}
      p="18px"
      mb={4}
      pr={8}
      borderBottom="2px solid"
      borderColor="blue.500"
    >
      <Heading size="sm" w="min(40%, 50ch)">
        Description
      </Heading>
      <Heading size="sm" w="120px">
        Date
      </Heading>
      <Heading size="sm" w="80px">
        Start Time
      </Heading>
      <Heading size="sm">End Time</Heading>
    </Flex>
  );
};

export default AddedDaysHeader;
