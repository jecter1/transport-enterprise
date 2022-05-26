import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import columnsToCells from '../util/columnsToCells';

/*
 * props.rows
 * props.columns
 * props.tableBody
*/
export default function TableTemplate(props) {
  const columns = props.columns;
  const rows = props.rows;
  const rowToCells = props.rowToCells;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ height: '100%', width: '100%', overflow: 'hidden', backgroundColor: '#222533' }}>
      <TableContainer sx={{height: '90%'}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columnsToCells(columns)}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      rowToCells(columns, row)
                    );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{height: '10%'}}
        style={{color: '#ffffff'}}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Число строк на странице:"
      />
    </Paper>
  );
}