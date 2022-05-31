import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { IconButton, Typography } from '@mui/material';
import TableTemplate from '../../../templates/TableTemplate';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const columns = [
  { 
    id: 'id', 
    label: 'Страница транспорта', 
    align: 'center',
    minWidth: 50 
  },
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
    id: 'driverId', 
    label: 'Страница водителя', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'driverName', 
    label: 'ФИО водителя', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'driverBirthDate', 
    label: 'Дата рождения водителя', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'driverPosition', 
    label: 'Должность водителя', 
    align: 'center',
    minWidth: 170 
  },
];

function rowToCells(columns, row) {
  const driver_id = "driverId";
  const transport_id = "id";

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
      { 
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == driver_id && row[driver_id] 
                ?
                <Link href={"/employee/" + row[driver_id]} passHref>
                  <IconButton disableRipple style={{color: "#ffffff"}}>
                    <InsertDriveFileOutlinedIcon/>
                  </IconButton>
                </Link> 
                :
                column.id == transport_id && row[transport_id] 
                ?
                <Link href={"/transport/" + row[transport_id]} passHref>
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

export default function TransportDriversTable(props) {
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}