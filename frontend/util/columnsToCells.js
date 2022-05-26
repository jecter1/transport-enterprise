import { TableCell } from "@mui/material";

export default function columnsToCells(columns) {
  return (
    columns.map((column) => (
      <TableCell
        key={column.id}
        align={column.align}
        style={{ minWidth: column.minWidth, backgroundColor: '#222533', color: '#ffffff' }}
      >
        {column.label}
      </TableCell>
    ))
  );
}