import { Flex, Text, Box } from 'src/shared/design-system';

const Footer = () => {
  return (
    <Box marginTop={'auto'}>
      <Flex
        bg={'blue.500'}
        minH={'50px'}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        fontSize={{
          base: '11pt',
          sm: '13pt',
        }}
      >
        <Box color="white">
          <Text>© Scheduler Maker s.r.o. - všechna práva vyhrazena</Text>
        </Box>
        <Text color="white">code © Kluci z agilního vývoje</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
