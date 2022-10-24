import { useScheduleDetail } from '../hooks';
import { Box, Button, FormLabel, Grid, Select } from 'src/shared/design-system';

const BlockFilter = () => {
  const {
    filter: blockFilter,
    setFilter,
    categoriesToFilter,
    sexesToFilter,
  } = useScheduleDetail();

  return (
    <Grid gap={2} templateColumns={{ md: '1fr 1fr', base: '1fr' }}>
      <Box>
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
      </Box>
      <Box>
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
      </Box>
      <Button onClick={() => setFilter({ category: '', sex: '' })} maxW="100px">
        Reset filter
      </Button>
    </Grid>
  );
};

export default BlockFilter;
