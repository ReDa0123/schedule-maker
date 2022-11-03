import { HStack, Input, Select, Text } from '@chakra-ui/react';
import { tournaments } from '../../schedule-maker/utils/mocks';
import PropTypes from 'prop-types';

const SelectiveFiltering = ({ selectRef, setFilter, ...props }) => {
  const tournamentLocations = Array.from(
    new Set(tournaments.map((o) => o.location))
  );
  return (
    <HStack spacing={10} {...props}>
      <Select
        placeholder="Select location"
        maxW="190px"
        ref={selectRef}
        onChange={(e) => setFilter(e.target.value)}
      >
        {tournamentLocations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </Select>

      <HStack>
        <Input placeholder="Select date" maxW="190px" type="date" />
        <Text as="label"> - </Text>
        <Input placeholder="Select date" maxW="190px" type="date" />
      </HStack>
    </HStack>
  );
};

SelectiveFiltering.propTypes = {
  selectRef: PropTypes.object,
  setFilter: PropTypes.func,
};

export default SelectiveFiltering;
