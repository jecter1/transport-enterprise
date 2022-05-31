import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { IconButton, Typography } from '@mui/material';
import TableTemplate from '../../../templates/TableTemplate';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const columns = [
  { 
    id: 'workerId', 
    label: 'Страница рабочего', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'workerName', 
    label: 'Рабочий', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'brigadeLeaderId', 
    label: 'Страница бригадира', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'brigadeLeaderName', 
    label: 'Бригадир', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'masterId', 
    label: 'Страница мастера', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'masterName', 
    label: 'Мастер', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'sectionHeadId', 
    label: 'Страница начальника участка', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'sectionHeadName', 
    label: 'Начальник участка', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'foremanId', 
    label: 'Страница начальника цеха', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'foremanName', 
    label: 'Начальник цеха', 
    align: 'center',
    minWidth: 170 
  },
];

function rowToCells(columns, row) {
  const worker_id = "workerId";
  const brigadeLeader_id = "brigadeLeaderId";
  const master_id = "masterId";
  const sectionHead_id = "sectionHeadId";
  const foreman_id = "foremanId";
  
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
      {
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == worker_id && cell_data
                ?
                <Link href={"/employee/" + cell_data} passHref>
                  <IconButton disableRipple style={{color: "#ffffff"}}>
                    <InsertDriveFileOutlinedIcon/>
                  </IconButton>
                </Link>
                :
                column.id == brigadeLeader_id && cell_data
                ?
                <Link href={"/employee/" + cell_data} passHref>
                  <IconButton disableRipple style={{color: "#ffffff"}}>
                    <InsertDriveFileOutlinedIcon/>
                  </IconButton>
                </Link>
                :
                column.id == master_id && cell_data
                ?
                <Link href={"/employee/" + cell_data} passHref>
                  <IconButton disableRipple style={{color: "#ffffff"}}>
                    <InsertDriveFileOutlinedIcon/>
                  </IconButton>
                </Link>
                :
                column.id == sectionHead_id && cell_data
                ?
                <Link href={"/employee/" + cell_data} passHref>
                  <IconButton disableRipple style={{color: "#ffffff"}}>
                    <InsertDriveFileOutlinedIcon/>
                  </IconButton>
                </Link>
                :
                column.id == foreman_id && cell_data
                ?
                <Link href={"/employee/" + cell_data} passHref>
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

export default function HierarchyTable(props) {
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}