import { useScheduleDetail } from '../hooks';
import {
  GridItem,
  Button,
  FormLabel,
  Grid,
  Select,
  Heading,
  Combobox,
  Text,
} from 'src/shared/design-system';
import { filterDefaultValues } from '../contexts/ScheduleDetailContext';

const BlockFilter = () => {
  const {
    filter: blockFilter,
    setFilter,
    categoriesToFilter,
    sexesToFilter,
    sportsToFilter,
    agesToFilter,
    customParamsToFilter,
    shouldShowNotFoundMessage,
    shouldShwNoBlocksMessage,
  } = useScheduleDetail();

  return (
    <>
      <Heading fontSize={24} mb={4}>
        Block filter
      </Heading>
      <Grid
        gap={4}
        templateColumns={{
          lg: '250px 250px 250px',
          sm: '250px 250px',
          base: '1fr',
        }}
      >
        <GridItem maxW="250px">
          <FormLabel>Category</FormLabel>
          <Combobox
            options={categoriesToFilter}
            value={blockFilter.category}
            onChange={(values) =>
              setFilter({ ...blockFilter, category: values })
            }
            notFoundText="Category not found"
            placeholder="Select category to filter"
            isNotCreatable
          />
        </GridItem>
        <GridItem maxW="250px">
          <FormLabel>Sex</FormLabel>
          <Select
            value={blockFilter.sex}
            onChange={(e) => setFilter({ ...blockFilter, sex: e.target.value })}
            borderColor="blue.500"
            borderWidth={2}
            _hover={{ borderColor: 'blue.700' }}
          >
            <option value="">Both</option>
            {sexesToFilter.map((sex) => (
              <option key={sex} value={sex}>
                {sex}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem maxW="250px">
          <FormLabel>Sport</FormLabel>
          <Combobox
            options={sportsToFilter}
            value={blockFilter.sportId}
            onChange={(values) =>
              setFilter({ ...blockFilter, sportId: values })
            }
            placeholder="Select sport to filter"
            notFoundText="Sport not found"
            isNotCreatable
          />
        </GridItem>
        <GridItem maxW="250px">
          <FormLabel>Age</FormLabel>
          <Combobox
            options={agesToFilter}
            value={blockFilter.age}
            onChange={(values) => setFilter({ ...blockFilter, age: values })}
            placeholder="Select age to filter"
            notFoundText="Age not found"
            isNotCreatable
          />
        </GridItem>
        <GridItem maxW="250px">
          <FormLabel>Parameter</FormLabel>
          <Combobox
            options={customParamsToFilter}
            value={blockFilter.customParameter}
            onChange={(values) =>
              setFilter({ ...blockFilter, customParameter: values })
            }
            placeholder="Select parameter to filter"
            notFoundText="Parameter not found"
            isNotCreatable
          />
        </GridItem>
        <Button
          onClick={() => setFilter(filterDefaultValues)}
          maxW="100px"
          alignSelf="end"
        >
          Reset filter
        </Button>
      </Grid>
      {shouldShwNoBlocksMessage ? (
        <Text mt={4}>
          (There are no blocks assigned to this tournament yet)
        </Text>
      ) : (
        shouldShowNotFoundMessage && (
          <Text mt={4}>(There are no blocks using this filter)</Text>
        )
      )}
    </>
  );
};

export default BlockFilter;
