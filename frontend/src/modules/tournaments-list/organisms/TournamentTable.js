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
import { useTable, useGlobalFilter } from 'react-table';
import { TournamentListHeading } from '../atoms';
import PropTypes from 'prop-types';
import { ActionLinksCell } from '../molecules';
import { format } from 'date-fns';
import { convertStringToDate } from '../../../shared/utils';
import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';

const columns = [
  {
    Header: 'Table of tournaments',
    columns: [
      {
        Header: 'Tournament name',
        accessor: ({ name, tournamentId }) => (
          <RouterLink to={route.scheduleMaker({ id: tournamentId })}>
            {name}
          </RouterLink>
        ),
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
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);
  const { globalFilter } = state;

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
        <Table variant="simple" {...getTableProps()}>
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
            {rows.map((row) => {
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
    </>
  );
}

TournamentTable.propTypes = {
  setFilter: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default TournamentTable;
