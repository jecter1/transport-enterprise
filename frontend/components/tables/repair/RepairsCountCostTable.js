import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { IconButton, Typography } from '@mui/material';
import TableTemplate from '../../../templates/TableTemplate';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const common_columns = [
  { 
    id: 'count', 
    label: 'Число', 
    align: 'center',
    minWidth: 140 
  },
  { 
    id: 'cost', 
    label: 'Стоимость, руб.', 
    align: 'center',
    minWidth: 140 
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
    minWidth: 140 
  },
  { 
    id: 'number', 
    label: 'Номер транспорта', 
    align: 'center',
    minWidth: 140 
  },
  { 
    id: 'brand', 
    label: 'Марка транспорта', 
    align: 'center',
    minWidth: 140 
  },
  { 
    id: 'model', 
    label: 'Модель транспорта', 
    align: 'center',
    minWidth: 140 
  },
  { 
    id: 'color', 
    label: 'Цвет транспорта', 
    align: 'center',
    minWidth: 140 
  },
];

function rowToCells(columns, row) {
  const transport_id = "id";
  const count = "count";
  const cost = "cost";

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
                column.id == cost 
                ?
                <Typography>
                  {cell_data ? parseFloat(cell_data).toFixed(2) : "0.00"}
                </Typography>
                :
                column.id == count 
                ?
                <Typography>
                  {cell_data ? cell_data : "0"}
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

export default function RepairsCountCostTable(props) {
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