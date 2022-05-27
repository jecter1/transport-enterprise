import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import TableTemplate from '../../../templates/TableTemplate';

const columns = [
  { 
    id: 'number', 
    label: 'Номер', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'startPoint', 
    label: 'Начало', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'finishPoint', 
    label: 'Конец', 
    align: 'center',
    minWidth: 170 
  },
];

function rowToCells(columns, row) {
  const route_id = row["id"];

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
      { 
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == 'number' && route_id 
                ?
                <Link href={"/route/"+route_id} passHref>
                  <Button style={{fontSize: 14, height: '4vh', width: '4vw'}}>
                    {cell_data ? cell_data : '-'}
                  </Button>
                </Link> 
                :
                <Typography>
                  {cell_data ? cell_data : "-"}
                </Typography>
              }
            </TableCell>
          );
        })
      }
    </TableRow>
  );
}

export default function RouteTable(props) {
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}