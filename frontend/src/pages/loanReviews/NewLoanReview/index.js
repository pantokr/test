import React, { useState } from "react";
import { Button, Card, CardContent, Box } from "@mui/material";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import DashboardLayout from "frames/LayoutContainers/DashboardLayout";
import DashboardNavbar from "frames/Navbars/DashboardNavbar";

import LoanReviewBriefDialog from "./components/LoanReviewBriefDialog";

ModuleRegistry.registerModules([AllCommunityModule]);

function NewLoanReview() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <DashboardLayout>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <DashboardNavbar navbarTitle="신규 대출 심사" />

        {/* 카드 영역 */}
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column", m: 3 }}>
          <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ width: "100%", height: 60 }}
              onClick={handleClickOpen}
            >
              큰 버튼
            </Button>
          </CardContent>
        </Card>

        {/* 팝업 다이얼로그 */}
        <LoanReviewBriefDialog
          open={open}
          title="대출 심사 요약"
          onClose={handleClose}
        ></LoanReviewBriefDialog>
      </Box>
    </DashboardLayout>
  );
}

export default NewLoanReview;
