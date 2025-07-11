import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type ColumnType from '../types/ColumnType';

interface TableComponentProps<T> {
    columns: ColumnType<T>[],
    rows?: T[],
}

export default function TableComponent<T>( { columns, rows }: TableComponentProps<T> ) {
    return (
        <TableContainer sx={{ maxWidth: "100vw" }} component={Paper}>
            <Table sx={{ minWidth: "950px" }} stickyHeader size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        { columns.map( col => <TableCell sx={{ fontWeight: "bold" }} 
                            key={col.key.toString()} align="left"> {col.label}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map( (row, idx) => (
                        <TableRow key={idx}>
                            {columns.map( (col, colIdx) => (
                                <TableCell key={colIdx}>
                                    { col.render ? col.render(row) : String(row[col.key as keyof T]) }
                                </TableCell>
                            ))}
                        </TableRow>
                    ) )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}