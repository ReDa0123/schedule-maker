import { useScheduleDetail } from '../hooks';
import {
  GridItem,
  Button,
  FormLabel,
  Grid,
  Select,
} from 'src/shared/design-system';
import { isEmpty } from 'ramda';

const BlockFilter = () => {
  const {
    filter: blockFilter,
    setFilter,
    categoriesToFilter,
    sexesToFilter,
    sportsToFilter,
  } = useScheduleDetail();

  return (
    <Grid
      gap={4}
      templateColumns={{
        lg: '250px 250px 250px',
        md: '250px 250px',
        base: '1fr',
      }}
      p={4}
    >
      <GridItem maxW="250px">
        <FormLabel>Category</FormLabel>
        <Select
          value={blockFilter.category}
          onChange={(e) =>
            setFilter({ ...blockFilter, category: e.target.value })
          }
        >
          <option value="">All</option>
          {categoriesToFilter.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
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
        <Select
          value={blockFilter.sportId}
          onChange={(e) =>
            setFilter({
              ...blockFilter,
              sportId: isEmpty(e.target.value) ? '' : Number(e.target.value),
            })
          }
        >
          <option value="">All</option>
          {sportsToFilter.map(({ sportId, name }) => (
            <option key={sportId} value={sportId}>
              {name}
            </option>
          ))}
        </Select>
      </GridItem>
      <Button
        onClick={() => setFilter({ category: '', sex: '', sportId: '' })}
        maxW="100px"
        alignSelf="end"
      >
        Reset filter
      </Button>
    </Grid>
  );
};

export default BlockFilter;
