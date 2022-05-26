import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { Button } from '@mui/material';

const columns = [
  { 
    id: 'workerName', 
    label: 'Рабочий', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'brigadeLeaderName', 
    label: 'Бригадир', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'masterName', 
    label: 'Мастер', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'headOfSectionName', 
    label: 'Начальник участка', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'foremanName', 
    label: 'Начальник цеха', 
    align: 'center',
    minWidth: 170 
  },
];

export default function HierarchyTable(props) {
  const rows = props.rows;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ height: '100%', width: '100%', overflow: 'hidden', backgroundColor: '#222533' }}>
      <TableContainer sx={{height: '90%'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#222533', color: '#ffffff' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const employee = row[column.id];
                      const employee_id = row[column.id.substring(0, column.id.length - 4) + "Id"];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Link href={"/employee/"+employee_id} passHref>
                            <Button variant="text"
                                    style={{textTransform: 'none', 
                                            color: '#ffffff', 
                                            backgroundColor: "#2b2f40", 
                                            fontSize: 14}} 
                                    disableRipple
                                    disableElevation
                                    sx={{textTransform: 'none', 
                                         textColor: 'white',
                                         height: '8vh',
                                         width: '10vw'}}>
                              {employee}
                            </Button>
                          </Link>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{color: '#ffffff'}}
        rowsPerPageOptions={100}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}