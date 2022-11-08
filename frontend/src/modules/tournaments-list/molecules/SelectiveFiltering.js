import { Flex, Input, Select, Grid } from 'src/shared/design-system';
import PropTypes from 'prop-types';

const SelectiveFiltering = ({ selectRef, setFilter, locations, ...props }) => {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        md: '215px 1fr',
      }}
      gap={4}
      {...props}
    >
      <Select
        placeholder="Select location"
        maxW="190px"
        ref={selectRef}
        onChange={(e) => setFilter(e.target.value)}
      >
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </Select>

      <Flex wrap="wrap" alignItems="center" gap={4}>
        <Input placeholder="Select date" maxW="190px" type="date" />
        -
        <Input placeholder="Select date" maxW="190px" type="date" />
      </Flex>
    </Grid>
  );
};

SelectiveFiltering.propTypes = {
  selectRef: PropTypes.object,
  setFilter: PropTypes.func,
  locations: PropTypes.array,
};

export default SelectiveFiltering;
