import { useEffect } from 'react';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { NameCell, TournamentListHeading } from '../atoms';
import PropTypes from 'prop-types';
import { ActionLinksCell } from '../molecules';
import { format } from 'date-fns';
import { convertStringToDate } from 'src/shared/utils';
import { Pagination } from 'src/shared/react-table';

const columns = [
  {
    Header: 'Table of tournaments',
    columns: [
      {
        Header: 'Tournament name',
        accessor: 'name',
        Cell: NameCell,
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Start date',
        accessor: ({ startDate }) =>
          format(convertStringToDate(startDate), 'dd.MM.yyyy'),
      },
      {
        Header: 'End date',
        accessor: ({ endDate }) =>
          format(convertStringToDate(endDate), 'dd.MM.yyyy'),
      },
      {
        Header: 'Actions',
        accessor: 'tournamentId',
        Cell: ActionLinksCell,
      },
    ],
  },
];

function TournamentTable({ data, setFilter }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    prepareRow,
    setGlobalFilter,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useGlobalFilter,
    usePagination
  );

  useEffect(() => {
    setFilter({
      globalFilter,
      setGlobalFilter,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TournamentListHeading mb="10px">
        List of Tournaments
      </TournamentListHeading>

      <TableContainer>
        <Table variant="simple" {...getTableProps()} w="1000px">
          <Thead>
            {headerGroups.map((group, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Tr key={index}>
                {group.headers.map((column) => (
                  <Th key={column.id}>{column.render('Header')}</Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr key={row.id}>
                  {row.cells.map((cell) => {
                    return (
                      <Td key={cell.id} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        {...{
          canPreviousPage,
          canNextPage,
          pageOptions,
          pageCount,
          gotoPage,
          nextPage,
          previousPage,
          pageIndex,
          pageSize,
          setPageSize,
        }}
      />
    </>
  );
}

TournamentTable.propTypes = {
  setFilter: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default TournamentTable;
