import { Flex, Text, Box } from 'src/shared/design-system';

const Footer = () => {
  return (
    <Box marginTop={'auto'}>
      <Flex
        color={'white'}
        bg={'blue.500'}
        minH={'50px'}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        fontSize={{
          base: '10pt',
          sm: '13pt',
        }}
      >
        <Text>© Scheduler Maker s.r.o. - všechna práva vyhrazena</Text>
        <Text>code © Kluci z agilního vývoje</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
