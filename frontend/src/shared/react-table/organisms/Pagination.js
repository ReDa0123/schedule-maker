import { Button, Flex, Select, Text } from 'src/shared/design-system';
import PropTypes from 'prop-types';

const Pagination = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  pageIndex,
  pageSize,
}) => {
  return (
    <Flex
      flexDirection={{
        md: 'row',
        base: 'column',
      }}
      justifyContent="center"
      alignItems="center"
      width="100%"
      paddingY={2}
      gap={2}
    >
      <Flex gap={2} justifyContent="flex-start" alignItems="center" flex={1}>
        <Text>Items per page: </Text>
        <Select
          borderWidth={2}
          borderColor="blue.500"
          _hover={{ borderColor: 'blue.700' }}
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          w={20}
        >
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex gap={4} justifyContent="center" alignItems="center">
        <Button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          minW={5}
          w={5}
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          minW={5}
          w={5}
        >
          {'<'}
        </Button>
        <Flex gap={1} justifyContent="center" alignItems="center">
          <Text>Page</Text>
          <Text fontWeight={600}>
            {pageIndex + 1} of {pageOptions.length}
          </Text>
        </Flex>
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          minW={5}
          w={5}
        >
          {'>'}
        </Button>
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          minW={5}
          w={5}
        >
          {'>>'}
        </Button>
      </Flex>
      <Flex
        flex={1}
        display={{
          md: 'flex',
          base: 'none',
        }}
      />
    </Flex>
  );
};

Pagination.propTypes = {
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  pageOptions: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
  gotoPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Pagination;
