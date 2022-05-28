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
    id: 'type', 
    label: 'Тип', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'brand', 
    label: 'Марка', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'model', 
    label: 'Модель', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'color', 
    label: 'Цвет', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'routeNumber', 
    label: 'Номер маршрута', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'routeStart', 
    label: 'Начало маршрута', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'routeFinish', 
    label: 'Конец маршрута', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'capacity', 
    label: 'Вместимость, чел.', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'fare', 
    label: 'Стоимость проезда, руб.', 
    align: 'center',
    minWidth: 170 
  },
];

function rowToCells(columns, row) {
  const transport_id = row["id"];
  const route_id = row["routeId"];

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
                    {cell_data ? cell_data : "-"}
                  </Button>
                </Link> 
                :
                column.id == 'routeNumber' && route_id 
                ?
                <Link href={"/route/" + route_id} passHref>
                  <Button style={{fontSize: 14, height: '4vh', width: '4vw'}}>
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

export default function RouteTable(props) {
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}