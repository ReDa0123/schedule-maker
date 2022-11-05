import { useEffect, useMemo } from 'react';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Button } from '../../../shared/design-system';
import { useTable, useGlobalFilter } from 'react-table';
import { tournaments } from '../../schedule-maker/utils/mocks';
import TournamentListHeading from '../atoms/TournamentListHeading';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { route } from 'src/Routes';

const columns = [
  {
    Header: 'Table of tournaments',
    columns: [
      {
        Header: 'Tournament name',
        accessor: 'name',
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Start date',
        accessor: 'startDate',
      },
      {
        Header: 'End date',
        accessor: 'endDate',
      },
      {
        Header: 'Details',
        accessor: 'tournamentId',
        Cell: (props) => mockButton(props.row.original.tournamentId),
      },
    ],
  },
];
//stupid mocking solution
const mockButton = (id) => {
  const btn = () => (
    <Button minW="120px" colorScheme="green">
      Details
    </Button>
  );
  if (id === 1) {
    return <Link to={route.scheduleMaker({ id: 1 })}>{btn()}</Link>;
  } else if (id === 2) {
    return <Link to={route.scheduleMakerEdit({ id: 1 })}>{btn()}</Link>;
  } else {
    return btn();
  }
};

function TournamentTable(props) {
  const data = useMemo(() => tournaments, []);

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
    props.setFilter({
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
  setFilter: PropTypes.func,
};

export default TournamentTable;
