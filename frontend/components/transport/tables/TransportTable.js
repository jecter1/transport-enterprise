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
  { 
    id: 'garageId', 
    label: 'Страница гаража', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'garageLocation', 
    label: 'Гараж', 
    align: 'center',
    minWidth: 160 
  },
];

function rowToCells(columns, row) {
  const transport_id = row["id"];
  const garage_id = row["garageId"];

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
      { 
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == 'id' && transport_id 
                ?
                <Link href={"/transport/" + transport_id} passHref>
                  <IconButton disableRipple style={{color: "#ffffff"}}>
                    <InsertDriveFileOutlinedIcon/>
                  </IconButton>
                </Link> 
                :
                column.id == 'garageId' && garage_id 
                ?
                <Link href={"/transport/" + transport_id} passHref>
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

export default function TransportTable(props) {
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}