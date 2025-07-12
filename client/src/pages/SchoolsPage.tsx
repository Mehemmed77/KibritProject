import { Box } from "@mui/material";
import TableComponent from "../components/TableComponent";
import type ColumnType from "../types/ColumnType";
import { useEffect, useState } from "react";
import axios from "axios";
import MotionDivWrapper from "../components/MotionDivWrapper";
import type { School } from "../types/SchoolType";

export default function SchoolsPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [schools, setSchools] = useState<School[]>();

    const columns: ColumnType<School>[]  = [
        { key: "name", label: "Name" },
        { key: 'type', label: 'Type' },
        { key: 'region', label: 'Region' },
        { key: 'yearFounded', label: "Year Founded" },
        { key: 'studentCount', label: "Student Count" },
    ]

    useEffect(() => {
        const fetchHighSchools = async () => {
            try{
                setLoading(true);
                const link = "http://localhost:5000/api/schools/";
                const res = await axios.get(link);
                const data = res.data;

                setSchools(data.schools);

            } catch(e) {
                console.log("Error occurred: " + e);
            }
            finally {
                setLoading(false);
            }
        };

        fetchHighSchools();
    }, []);

    return (
        <MotionDivWrapper>
            <Box display={"flex"} alignItems={"center"}>
                { loading ? "Data is loading please wait" : <TableComponent columns={columns} rows={schools} />}
            </Box>
        </MotionDivWrapper>
    )
}