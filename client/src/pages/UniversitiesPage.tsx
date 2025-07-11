import { Box, IconButton } from "@mui/material";
import TableComponent from "../components/TableComponent";
import type ColumnType from "../types/ColumnType";
import { useEffect, useRef, useState } from "react";
import type { University } from "../types/UniversityType";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import MotionDivWrapper from "../components/MotionDivWrapper";
import DeleteDialog from "../components/DeleteDialog";

export default function UniversitiesPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [universities, setUniversities] = useState<University[]>();
    const lastSelectedRow = useRef<University | null>(null);

    const handleClose = (deleteRow?: boolean) => {
        setOpen(false);
        if (deleteRow) removeRow();
    };

    const removeRow = () => {
        if(lastSelectedRow.current) {
            setUniversities(prev => prev?.filter(e => e !== lastSelectedRow.current));
        }
    }

    const openCorpusModal = (row: University) => {
        console.log(row);
    }

    const openDeleteModal = (row: University) => {
        setOpen(true);
        lastSelectedRow.current = row;
    }

    const columns: ColumnType<University>[]  = [
        { key: "name", label: "Name" },
        { key: 'region', label: 'Region' },
        { key: 'yearFounded', label: 'Year Founded' },
        { key: 'corpora', label: 'Corpus',
            render: row => (
                <IconButton onClick={() => openCorpusModal(row)}>
                    <VisibilityIcon />
                </IconButton>
            )
        },
        { key: 'actions', label: 'Actions',
            render: row => (
                <IconButton onClick={() => openDeleteModal(row)}>
                    <DeleteIcon />
                </IconButton>
            )
        }
    ]

    useEffect(() => {
        const fethcUniversities = async () => {
            try{
                setLoading(true);
                const link = "http://localhost:5000/api/universities/";
                const res = await axios.get(link);
                const data = res.data;

                setUniversities(data.universities);

            } catch(e) {
                console.log("Error occurred: " + e);
            }
            finally {
                setLoading(false);
            }
        };

        fethcUniversities();
    }, []);

    return (
        <MotionDivWrapper>
            <Box display={"flex"} alignItems={"center"}>
                <DeleteDialog open={open} handleClose={handleClose} />
                { loading ? "Data is loading please wait" : <TableComponent columns={columns} rows={universities} />}
            </Box>
        </MotionDivWrapper>
    )
}