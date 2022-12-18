import { Box, Text } from 'src/shared/design-system';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import { tournamentStyles } from '../constants';
import PropTypes from 'prop-types';

const ColumnSection = ({ header, children }) => (
  <Box marginY={4}>
    <Text fontWeight="bold" fontSize="md" mb={2}>
      {header}
    </Text>
    {children}
  </Box>
);

const BatchValidationHelpModalBody = ({ sports }) => (
  <Box>
    <Text>
      The uploaded excel file must have the following columns (in the same order
      with the header names):
    </Text>
    <ColumnSection header="Category">
      <Text>
        The name/category of the block. It must be a string with max length of
        50 or empty.
      </Text>
    </ColumnSection>
    <ColumnSection header="Persons">
      <Text>
        The number of participants in the block. It must be a positive integer.
      </Text>
    </ColumnSection>
    <ColumnSection header="Style">
      <Text>
        The style of the block. It must be one of the following:
        <UnorderedList>
          {tournamentStyles.map((style) => (
            <ListItem key={style}>{style}</ListItem>
          ))}
        </UnorderedList>
      </Text>
    </ColumnSection>
    <ColumnSection header="Sport">
      <Text>
        The sport of the block. It must be one of the sports in this tournament:
        <UnorderedList>
          {sports.map(({ name, sportId }) => (
            <ListItem key={sportId}>{name}</ListItem>
          ))}
        </UnorderedList>
      </Text>
    </ColumnSection>
    <ColumnSection header="Sex">
      <Text>
        The sex of the participants in the block. It must be empty or one of the
        following:
        <UnorderedList>
          <ListItem>M</ListItem>
          <ListItem>F</ListItem>
        </UnorderedList>
      </Text>
    </ColumnSection>
    <ColumnSection header="Age">
      <Text>
        The age group of the participants in the block. It must be a string with
        max length of 50.
      </Text>
    </ColumnSection>
    <ColumnSection header="Custom parameter">
      <Text>
        The custom parameter of the block used to find collisions between
        blocks. It must be a string with max length of 50 or empty.
      </Text>
    </ColumnSection>
    <ColumnSection header="Match duration">
      <Text>
        The duration of a single match. It must be a positive integer (seconds)
        or in a format of {'mm:ss'}.
      </Text>
    </ColumnSection>
  </Box>
);

ColumnSection.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

BatchValidationHelpModalBody.propTypes = {
  sports: PropTypes.array,
};

export default BatchValidationHelpModalBody;
