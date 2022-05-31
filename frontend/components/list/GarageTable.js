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
    label: 'Страница гаража', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'location', 
    label: 'Местоположение', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'description', 
    label: 'Описание', 
    align: 'center',
    minWidth: 170 
  },
];

function rowToCells(columns, row) {
  const garage_id = row["id"];

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
      { 
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == 'id' && garage_id 
                ?
                <Link href={"/garage/"+garage_id} passHref>
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

export default function GarageTable(props) {
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}