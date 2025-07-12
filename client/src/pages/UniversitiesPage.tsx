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
import CorpusDialog from "../components/CorpusDialog";
import FilterComponent, { type FilterField } from "../components/FilterComponent";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function UniversitiesPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [universities, setUniversities] = useState<University[]>();
    const [selectedCorpusRow, setSelectedCorpusRow] = useState<University | null>();
    const lastSelectedRow = useRef<University | null>(null);
    const filters = useSelector((state: RootState) => state.filter);

    useEffect(() => {
        const fethcUniversities = async () => {
            try{
                setLoading(true);

                const params = new URLSearchParams();
                Object.entries(filters).forEach(([key, value]) => {
                    if (value) params.append(key, value.toString());
                });

                
                const link = `http://localhost:5000/api/universities/?${params.toString()}`;
                console.log(link);
                const res = await axios.get(link);
                const data = res.data;

                setUniversities(data.results);

            } catch(e) {
                console.log("Error occurred: " + e);
            }
            finally {
                setLoading(false);
            }
        };

        fethcUniversities();
    }, [filters]);

    const universityFilters: FilterField[] = [
        { type: 'select', name: 'region', label: 'Region', options: ['North', 'South', 'East', 'West'] },
        { type: 'number', name: 'yearFounded', label: 'Year Founded' },
    ];

    const handleClose = (deleteRow?: boolean) => {
        setOpen(false);
        if (deleteRow) removeRow();
    };

    const openCorpusModal = (row: University) => {
        setSelectedCorpusRow(row);
    }

    const removeRow = () => {
        if(lastSelectedRow.current) {
            setUniversities(prev => prev?.filter(e => e !== lastSelectedRow.current));
        }
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


    return (
        <MotionDivWrapper>
            <Box>
                <FilterComponent fields={universityFilters} />
                <CorpusDialog open={!!selectedCorpusRow}
                        corpuses={selectedCorpusRow?.corpora}
                        uniName={selectedCorpusRow?.name}
                        handleClose={() => setSelectedCorpusRow(null)} />
                <DeleteDialog open={open} handleClose={handleClose} />
                { loading ? "Data is loading please wait" : <TableComponent columns={columns} rows={universities} />}
            </Box>
        </MotionDivWrapper>
    )
}