import React, { useState } from "react";
import { Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community"; // ← 여기를 추가

import MDBox from "components/MDBox";
import DashboardLayout from "frames/LayoutContainers/DashboardLayout";
import DashboardNavbar from "frames/Navbars/DashboardNavbar";
import { Padding } from "@mui/icons-material";
import AgGridTable from "frames/DataGrid/AgGridTable";
import MuiGridTable from "frames/DataGrid/MuiGridTable";

import { rowData, columnDefs } from "pages/logs/LoginFail/data/loginFailData";

ModuleRegistry.registerModules([AllCommunityModule]);

const defaultColDef = {
  resizable: true,
  flex: 1,
  minWidth: 100,
};
function LoginFail() {
  return (
    <DashboardLayout>
      <MDBox sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <DashboardNavbar navbarTitle="신규 대출 심사" />

        {/* 이 영역만 남은 높이를 채움 */}
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column", m: 3 }}>
          <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <MDBox
              sx={{
                flexGrow: 1,
                height: "100%", // Card 내부 꽉 채우기
                width: "100%",
                overflow: "auto", // 필요 시 내부 스크롤만
              }}
              className="ag-theme-alpine"
            >
              <AgGridTable rows={rowData} columns={columnDefs} />
              {/* <MuiGridTable rows={rowData} columns={columnDefs}></MuiGridTable> */}
            </MDBox>
          </CardContent>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default LoginFail;
