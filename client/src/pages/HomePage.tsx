import { Box, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import MotionDivWrapper from "../components/MotionDivWrapper";

export default function HomePage() {
    const isDesktop = useMediaQuery("(min-width: 940px)")

    return (
        <MotionDivWrapper>
            <Box height={"100vh"} 
                display={"flex"} justifyContent={"center"} alignItems={"center"}>

                <Paper sx={{ mx: 2, boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.5);" }}>
                    <Stack spacing={2} padding={3} borderRadius={2}>

                        <Typography textAlign={"center"}
                            variant={ isDesktop ? "h4" : "h5" } fontWeight={"bold"}>
                            Welcome to Education Explorer
                        </Typography>

                        <Typography textAlign={"center"} variant={ isDesktop ? "h5" : "h6" }>
                            Navigate from our Menu on the left.
                        </Typography>

                    </Stack>
                </Paper>
            </Box>
        </MotionDivWrapper>
    )
}