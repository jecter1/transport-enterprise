import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { IconButton, Typography } from '@mui/material';
import TableTemplate from '../../../templates/TableTemplate';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const common_columns = [
  { 
    id: 'id', 
    label: 'Страница водителя', 
    align: 'center',
    minWidth: 50 
  },
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
];

const transport_columns = [
  { 
    id: 'transportId', 
    label: 'Страница транспорта', 
    align: 'center',
    minWidth: 50 
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
]

function rowToCells(columns, row) {
  const employee_id = "id";
  const transport_id = "transportId";

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
      { 
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == employee_id && row[employee_id] 
                ?
                <Link href={"/employee/"+row[column.id]} passHref>
                  <IconButton disableRipple style={{color: "#ffffff"}}>
                    <InsertDriveFileOutlinedIcon/>
                  </IconButton>
                </Link> 
                :
                column.id == transport_id && row[transport_id] 
                ?
                <Link href={"/transport/"+row[transport_id]} passHref>
                  <IconButton disableRipple style={{color: "#ffffff"}}>
                    <InsertDriveFileOutlinedIcon/>
                  </IconButton>
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

export default function DriversTransportTable(props) {
  const columns = props.params.transportSelected ? common_columns : common_columns.concat(transport_columns);
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}