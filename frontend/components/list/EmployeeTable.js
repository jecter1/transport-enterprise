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
    label: 'Страница сотруднка', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'name', 
    label: 'ФИО сотрудника', 
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
    id: 'type', 
    label: 'Специализация', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'chiefId', 
    label: 'Страница начальника', 
    align: 'center',
    minWidth: 50 
  },
  { 
    id: 'chiefName', 
    label: 'ФИО начальника', 
    align: 'center',
    minWidth: 170 
  },
];

function rowToCells(columns, row) {
  const employee_id = row["id"];
  const chief_id = row["chiefId"];

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]}>
      { 
        columns.map((column) => {
          const cell_data = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.id == 'id' && employee_id 
                ?
                <Link href={"/employee/"+employee_id} passHref>
                  <IconButton disableRipple style={{color: "#ffffff"}}>
                    <InsertDriveFileOutlinedIcon/>
                  </IconButton>
                </Link> 
                :
                column.id == 'chiefId' && chief_id 
                ?
                <Link href={"/employee/"+chief_id} passHref>
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

export default function EmployeeTable(props) {
  return (
    <TableTemplate columns={columns} rows={props.rows} rowToCells={rowToCells}/>
  );
}