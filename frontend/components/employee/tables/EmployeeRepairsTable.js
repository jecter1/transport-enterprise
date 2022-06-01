import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import TableTemplate from '../../../templates/TableTemplate';

const columns = [
  { 
    id: 'id', 
    label: 'ID Ремонта', 
    align: 'center',
    minWidth: 170 
  },
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
  const repair_id = row["id"];
  const transport_id = row["transportId"];
  
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
      {
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == 'id' && repair_id 
                ?
                <Link href={"/repair/" + repair_id} passHref>
                  <Button style={{fontSize: 14, height: '4vh', width: '4vw'}}>
                    {cell_data}
                  </Button>
                </Link> 
                :
                column.id == 'transportNumber' && transport_id 
                ?
                <Link href={"/transport/" + transport_id} passHref>
                  <Button style={{fontSize: 14, height: '6vh', width: '6vw'}}>
                    {cell_data}
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

export default function EmployeeRepairsTable(props) {
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}