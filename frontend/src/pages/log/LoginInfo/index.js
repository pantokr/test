import React, { useEffect, useState } from "react";
import { Box, Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community"; // ← 여기를 추가

import MDBox from "components/MDBox";
import DashboardLayout from "frames/LayoutContainers/DashboardLayout";
import DashboardNavbar from "frames/Navbars/DashboardNavbar";
import AgGridPagingTable from "frames/DataGrid/AgGridPagingTable";

import { columnDefs } from "pages/log/LoginInfo/data/loginInfoData";
import { fetchLoginInfo } from "api/data";

ModuleRegistry.registerModules([AllCommunityModule]);

function LoginInfo() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchLoginInfo();
      setRowData(data);
    }
    loadData();
  }, []);

  return (
    <DashboardLayout>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", p: 3 }}>
        <DashboardNavbar navbarTitle="로그인 정보 조회" />
        {/* 이 영역만 남은 높이를 채움 */}
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <MDBox
              sx={{
                flexGrow: 1,
                height: "100%", // Card 내부 꽉 채우기
                width: "100%",
                overflow: "auto", // 필요 시 내부 스크롤만
              }}
            >
              <AgGridPagingTable rows={rowData} columns={columnDefs} pageName="로그인 정보 조회" />
              {/* <MuiGridTable rows={rowData} columns={columnDefs}></MuiGridTable> */}
            </MDBox>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
}

export default LoginInfo;
