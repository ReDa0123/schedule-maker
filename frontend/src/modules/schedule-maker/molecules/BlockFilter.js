import { useScheduleDetail } from '../hooks';
import {
  GridItem,
  Button,
  FormLabel,
  Grid,
  Select,
  Heading,
  Combobox,
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
            result={blockFilter.category}
            setResult={(values) =>
              setFilter({ ...blockFilter, category: values })
            }
            allowCreation={false}
            notFoundText="Category not found"
            placeholder="Type a category to filter"
          />
        </GridItem>
        <GridItem maxW="250px">
          <FormLabel>Sex</FormLabel>
          <Select
            value={blockFilter.sex}
            onChange={(e) => setFilter({ ...blockFilter, sex: e.target.value })}
          >
            <option value="">All</option>
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
            result={blockFilter.sportId}
            setResult={(values) =>
              setFilter({ ...blockFilter, sportId: values })
            }
            placeholder="Type a sport to filter"
            allowCreation={false}
            notFoundText="Sport not found"
          />
        </GridItem>
        <GridItem maxW="250px">
          <FormLabel>Age</FormLabel>
          <Combobox
            options={agesToFilter}
            result={blockFilter.age}
            setResult={(values) => setFilter({ ...blockFilter, age: values })}
            placeholder="Type an age to filter"
            allowCreation={false}
            notFoundText="Age not found"
          />
        </GridItem>
        <GridItem maxW="250px">
          <FormLabel>Parameter</FormLabel>
          <Combobox
            options={customParamsToFilter}
            result={blockFilter.customParameter}
            setResult={(values) =>
              setFilter({ ...blockFilter, customParameter: values })
            }
            placeholder="Type a parameter to filter"
            allowCreation={false}
            notFoundText="Parameter not found"
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
    </>
  );
};

export default BlockFilter;
