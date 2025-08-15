import DashboardLayout from "@/layouts/DashboardLayout";
import { Box, CircularProgress } from "@mui/material";

export default function LoadingPage(title: string = "") {
    return (
        <DashboardLayout title={title}>
            <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                <CircularProgress />
            </Box>
        </DashboardLayout>
    );
}