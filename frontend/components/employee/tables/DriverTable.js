import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import TableTemplate from '../../../templates/TableTemplate';

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
    id: 'chiefName', 
    label: 'Начальник', 
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
  { 
    id: 'transportType', 
    label: 'Тип транспорта', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'transportReceiveDate', 
    label: 'Дата получения транспорта', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'transportDecommissioningDate', 
    label: 'Дата списания транспорта', 
    align: 'center',
    minWidth: 170 
  },
];

function rowToCells(columns, row) {
  const employee_id = row["id"];
  const chief_id = row["chiefId"];
  const transport_id = row["transportId"];

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
      { 
        columns.map((column) => {
          const employee_col_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == 'name' && employee_id 
                ?
                <Link href={"/employee/"+employee_id} passHref>
                  <Button style={{fontSize: 14, height: '8vh', width: '10vw'}}>
                    {employee_col_data}
                  </Button>
                </Link> 
                :
                column.id == 'chiefName' && chief_id 
                ?
                <Link href={"/employee/"+chief_id} passHref>
                  <Button style={{fontSize: 14, height: '8vh', width: '10vw'}}>
                    {employee_col_data}
                  </Button>
                </Link> 
                :
                column.id == 'transportNumber' && transport_id 
                ?
                <Link href={"/transport/"+transport_id} passHref>
                  <Button style={{fontSize: 14, height: '8vh', width: '10vw'}}>
                    {employee_col_data}
                  </Button>
                </Link> 
                :
                <Typography>
                  {employee_col_data ? employee_col_data : "-"}
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