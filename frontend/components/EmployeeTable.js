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
import { Button, Typography } from '@mui/material';

const columns = [
  { 
    id: 'name', 
    label: 'ФИО', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'birthDate', 
    label: 'Дата рождения', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'position', 
    label: 'Должность', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'type', 
    label: 'Специализация', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'chiefName', 
    label: 'Начальник ', 
    align: 'center',
    minWidth: 170 
  },
];

export default function EmployeeTable(props) {
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const employee_id = row["id"];
                const chief_id = row["chiefId"];
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
                    { columns.map((column) => {
                      const employee_col_data = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                            column.id == 'name' && employee_id 
                            ?
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
                                          height: '100%',
                                          width: '100%'}}>
                                {employee_col_data}
                              </Button>
                            </Link> 
                            :
                            column.id == 'chiefName' && chief_id 
                            ?
                            <Link href={"/employee/"+chief_id} passHref>
                              <Button variant="text"
                                      style={{textTransform: 'none', 
                                              color: '#ffffff', 
                                              backgroundColor: "#2b2f40", 
                                              fontSize: 14}} 
                                      disableRipple
                                      disableElevation
                                      sx={{textTransform: 'none', 
                                          textColor: 'white',
                                          height: '100%',
                                          width: '100%'}}>
                                {employee_col_data}
                              </Button>
                            </Link> 
                            :
                            <Typography style={{color: '#ffffff', 
                                                backgroundColor: "#222533", 
                                                fontSize: 14}}>
                              {employee_col_data ? employee_col_data : "-"}
                            </Typography>
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }
            )}
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