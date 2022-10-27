import { useMemo } from 'react';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useTable } from 'react-table';
import { tournaments } from '../../schedule-maker/utils/mocks';

const columns = [
  {
    Header: 'Tabulka',
    columns: [
      {
        Header: 'Tournament name',
        accessor: 'name',
      },
      {
        Header: 'Tournament location',
        accessor: 'location',
      },
      {
        Header: 'Tournament date',
        accessor: 'startDate',
      },
    ],
  },
];

export default function TournamentTable() {
  const data = useMemo(() => tournaments, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <TableContainer>
      <Table variant="simple" {...getTableProps()}>
        <TableCaption>Tabulka turnajů</TableCaption>
        <Thead>
          {headerGroups.map((group) => (
            <Tr key={group.id}>
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
  );
}
