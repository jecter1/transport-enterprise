import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { IconButton, Typography } from '@mui/material';
import TableTemplate from '../../templates/TableTemplate';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const columns = [
  { 
    id: 'id', 
    label: 'Страница поездки', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'startDatetime', 
    label: 'Время начала', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'endDatetime', 
    label: 'Время окончания', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'mileage', 
    label: 'Пробег, км', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'transportId', 
    label: 'Страница транспорта', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'transportType', 
    label: 'Тип транспорта', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'transportNumber', 
    label: 'Номер транспорта', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'transportBrand', 
    label: 'Марка транспорта', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'transportModel', 
    label: 'Модель транспорта', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'transportColor', 
    label: 'Цвет транспорта', 
    align: 'center',
    minWidth: 160 
  },
];

function rowToCells(columns, row) {
  const usage_id = "id";
  const transport_id = "transportId";
  const mileage = "mileage";

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
      { 
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == usage_id && row[usage_id] 
                ?
                <Link href={"/usage/" + row[usage_id]} passHref>
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
                column.id == mileage && row[mileage] 
                ?
                <Typography>
                  {cell_data ? parseFloat(cell_data).toFixed(2) : "-"}
                </Typography>
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