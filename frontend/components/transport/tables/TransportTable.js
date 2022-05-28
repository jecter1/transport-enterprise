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
    minWidth: 160 
  },
  { 
    id: 'type', 
    label: 'Тип', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'brand', 
    label: 'Марка', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'model', 
    label: 'Модель', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'color', 
    label: 'Цвет', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'receiveDate', 
    label: 'Дата получения', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'decommissioningDate', 
    label: 'Дата списания', 
    align: 'center',
    minWidth: 160 
  },
];

function rowToCells(columns, row) {
  const transport_id = row["id"];

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
      { 
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == 'number' && transport_id 
                ?
                <Link href={"/transport/" + transport_id} passHref>
                  <Button style={{fontSize: 14, height: '6vh', width: '6vw'}}>
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

export default function TransportTable(props) {
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}