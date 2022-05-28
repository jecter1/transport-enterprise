import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import TableTemplate from '../../../templates/TableTemplate';

const columns = [
  { 
    id: 'transportNumber', 
    label: 'Номер', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'transportType', 
    label: 'Тип', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'transportBrand', 
    label: 'Марка', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'transportModel', 
    label: 'Модель', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'transportColor', 
    label: 'Цвет', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'name', 
    label: 'ФИО водителя', 
    align: 'center',
    minWidth: 170 
  },
];

function rowToCells(columns, row) {
  const driver_id = row["id"];
  const transport_id = row["transportId"];

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
      { 
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == 'name' && driver_id 
                ?
                <Link href={"/employee/" + driver_id} passHref>
                  <Button style={{fontSize: 14, height: '8vh', width: '10vw'}}>
                    {cell_data ? cell_data : "-"}
                  </Button>
                </Link> 
                :
                column.id == 'transportNumber' && transport_id 
                ?
                <Link href={"/transport/"+transport_id} passHref>
                  <Button style={{fontSize: 14, height: '6vh', width: '6vw'}}>
                    {cell_data ? cell_data : "-"}
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

export default function DriverTable(props) {
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}