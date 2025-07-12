import { Box } from "@mui/material";
import TableComponent from "../components/TableComponent";
import type ColumnType from "../types/ColumnType";
import { useEffect, useState } from "react";
import axios from "axios";
import MotionDivWrapper from "../components/MotionDivWrapper";
import type { HighSchool } from "../types/HighSchoolType";
import type { FilterField } from "../components/FilterComponent";
import FilterComponent from "../components/FilterComponent";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { PanoramaSharp } from "@mui/icons-material";

export default function HighSchoolsPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [highSchools, setHighSchools] = useState<HighSchool[]>();

    const filters = useSelector((state: RootState) => state.filter);

    const columns: ColumnType<HighSchool>[]  = [
        { key: "name", label: "Name" },
        { key: 'region', label: 'Region' },
        { key: 'yearFounded', label: 'Year Founded' },
        { key: 'programs', label: "Programs" },
    ]

    const highSchoolsFilters: FilterField[] = [
        {type: "select", name: "programs", label: "Programs", options: ['Business', "Science", "Art", "Sports"]}
    ];

    useEffect(() => {
        const fetchHighSchools = async () => {
            try{
                setLoading(true);

                const query = new URLSearchParams();
                Object.entries(filters).forEach(([key, value]) => {
                    if (value) query.append(key, value.toString());
                })

                const link = `http://localhost:5000/api/highSchools/?${query.toString()}`;
                const res = await axios.get(link);
                const data = res.data;

                setHighSchools(data.results);

            } catch(e) {
                console.log("Error occurred: " + e);
            }
            finally {
                setLoading(false);
            }
        };

        fetchHighSchools();
    }, [filters]);

    return (
        <MotionDivWrapper>
            <Box>
                <FilterComponent fields={highSchoolsFilters} />
                { loading ? "Data is loading please wait" : <TableComponent columns={columns} rows={highSchools} />}
            </Box>
        </MotionDivWrapper>
    )
}