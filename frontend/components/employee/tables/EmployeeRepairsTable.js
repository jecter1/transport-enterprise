import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import TableTemplate from '../../../templates/TableTemplate';

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

function rowToCells(columns, row) {
  const transport_id = row["transportId"];
  
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
      {
        columns.map((column) => {
          const repair_col_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == 'transportNumber' && transport_id 
                ?
                <Link href={"/transport/" + transport_id} passHref>
                  <Button style={{fontSize: 14, height: '100%', width: '100%'}}>
                    {repair_col_data}
                  </Button>
                </Link> 
                :
                <Typography>
                  {repair_col_data ? repair_col_data : "-"}
                </Typography>
              }
            </TableCell>
          );
        })
      }
    </TableRow>
  );
}

export default function EmployeeRepairsTable(props) {
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}