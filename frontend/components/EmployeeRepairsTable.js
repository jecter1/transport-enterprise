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
    id: 'assembly', 
    label: 'Узел', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'cost', 
    label: 'Стоимость', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'description', 
    label: 'Описание', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'garageLocation', 
    label: 'Место', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'transportNumber', 
    label: 'Номер транспорта', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'startDatetime', 
    label: 'Время начала', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'endDatetime', 
    label: 'Время окончания', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'transportType', 
    label: 'Тип транспорта', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'transportBrand', 
    label: 'Марка транспорта', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'transportModel', 
    label: 'Модель транспорта', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'transportColor', 
    label: 'Цвет транспорта', 
    align: 'center',
    minWidth: 170 
  },
];

export default function EmployeeRepairsTable(props) {
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
                const transport_id = row["transportId"];
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
                    { columns.map((column) => {
                      const repair_col_data = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                            column.id == 'transportNumber' && transport_id 
                            ?
                            <Link href={"/transport/" + transport_id} passHref>
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
                                {repair_col_data}
                              </Button>
                            </Link> 
                            :
                            <Typography style={{color: '#ffffff', 
                                                backgroundColor: "#222533", 
                                                fontSize: 14}}>
                              {repair_col_data ? repair_col_data : "-"}
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