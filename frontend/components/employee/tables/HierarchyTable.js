import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { Button } from '@mui/material';
import TableTemplate from '../../../templates/TableTemplate';

const columns = [
  { 
    id: 'workerName', 
    label: 'Рабочий', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'brigadeLeaderName', 
    label: 'Бригадир', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'masterName', 
    label: 'Мастер', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'headOfSectionName', 
    label: 'Начальник участка', 
    align: 'center',
    minWidth: 170 
  },
  { 
    id: 'foremanName', 
    label: 'Начальник цеха', 
    align: 'center',
    minWidth: 170 
  },
];

function rowToCells(columns, row) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
      {
        columns.map((column) => {
          const employee = row[column.id];
          const employee_id = row[column.id.substring(0, column.id.length - 4) + "Id"];
          return (
            <TableCell key={column.id} align={column.align}>
              <Link href={"/employee/"+employee_id} passHref>
                <Button variant="text"
                        style={{textTransform: 'none', 
                                color: '#ffffff', 
                                backgroundColor: "#2b2f40", 
                                fontSize: 14}} 
                        disableRipple
                        disableElevation
                        sx={{textTransform: 'none', 
                              textColor: 'white',
                              height: '100%',
                              width: '100%'}}>
                  {employee}
                </Button>
              </Link>
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