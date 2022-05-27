import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import TableTemplate from '../../../templates/TableTemplate';

const columns = [
  { 
    id: 'location', 
    label: 'Местоположение', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'description', 
    label: 'Описание', 
    align: 'center',
    minWidth: 170 
  },
];

function rowToCells(columns, row) {
  const garage_id = row["id"];

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
      { 
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == 'location' && garage_id 
                ?
                <Link href={"/garage/"+garage_id} passHref>
                  <Button style={{fontSize: 14, height: '8vh', width: '12vw'}}>
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

export default function GarageTable(props) {
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}