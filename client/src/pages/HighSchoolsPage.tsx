import { Box } from "@mui/material";
import TableComponent from "../components/TableComponent";
import type ColumnType from "../types/ColumnType";
import { useEffect, useState } from "react";
import axios from "axios";
import MotionDivWrapper from "../components/MotionDivWrapper";
import type { HighSchool } from "../types/HighSchoolType";

export default function HighSchoolsPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [highSchools, setHighSchools] = useState<HighSchool[]>();

    const columns: ColumnType<HighSchool>[]  = [
        { key: "name", label: "Name" },
        { key: 'region', label: 'Region' },
        { key: 'yearFounded', label: 'Year Founded' },
        { key: 'programs', label: "Programs" },
    ]

    useEffect(() => {
        const fetchHighSchools = async () => {
            try{
                setLoading(true);
                const link = "http://localhost:5000/api/highSchools/";
                const res = await axios.get(link);
                const data = res.data;

                setHighSchools(data.highSchools);

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
                { loading ? "Data is loading please wait" : <TableComponent columns={columns} rows={highSchools} />}
            </Box>
        </MotionDivWrapper>
    )
}