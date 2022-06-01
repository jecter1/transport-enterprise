import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { IconButton, Typography } from '@mui/material';
import TableTemplate from '../../../templates/TableTemplate';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const common_columns = [
  { 
    id: 'mileage', 
    label: 'Пробег, км', 
    align: 'center',
    minWidth: 160 
  },
];

const transport_columns = [
  { 
    id: 'id', 
    label: 'Страница транспорта', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'type', 
    label: 'Тип транспорта', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'number', 
    label: 'Номер транспорта', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'brand', 
    label: 'Марка транспорта', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'model', 
    label: 'Модель транспорта', 
    align: 'center',
    minWidth: 160 
  },
  { 
    id: 'color', 
    label: 'Цвет транспорта', 
    align: 'center',
    minWidth: 160 
  },
];

function rowToCells(columns, row) {
  const transport_id = "id";
  const mileage = "mileage";

  if (row[mileage] == 0 && columns.length != common_columns.length) {
    return (<></>);
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
      { 
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == transport_id && row[transport_id] 
                ?
                <Link href={"/transport/" + row[transport_id]} passHref>
                  <IconButton disableRipple style={{color: "#ffffff"}}>
                    <InsertDriveFileOutlinedIcon/>
                  </IconButton>
                </Link> 
                :
                column.id == mileage 
                ?
                <Typography>
                  {cell_data ? parseFloat(cell_data).toFixed(2) : "0.00"}
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

export default function MileageTable(props) {
  console.log(props);
  const columns = 
    props.params.transportSelected 
    ? 
    common_columns
    : 
    common_columns.concat(transport_columns);
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}