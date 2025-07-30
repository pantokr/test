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

ModuleRegistry.registerModules([AllCommunityModule]);

function NewLoanReview() {
  const [rowData] = useState([
    { id: 1, make: "Toyota", model: "Celica", price: 35000 },
    { id: 2, make: "Ford", model: "Mondeo", price: 32000 },
    { id: 3, make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const [columnDefs] = useState([
    { field: "make", headerName: "Make", sortable: true, filter: true },
    { field: "model", headerName: "Model", sortable: true, filter: true },
    { field: "price", headerName: "Price", sortable: true, filter: true },
  ]);

  const defaultColDef = {
    resizable: true,
    flex: 1,
    minWidth: 100,
  };

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
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={5}
              />
            </MDBox>
          </CardContent>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

// function NewLoanReview() {
//   const [rows] = useState([
//     { id: 1, make: "Toyota", model: "Celica", price: 35000 },
//     { id: 2, make: "Ford", model: "Mondeo", price: 32000 },
//     { id: 3, make: "Porsche", model: "Boxster", price: 72000 },
//   ]);

//   const [columns] = useState([
//     { field: "make", headerName: "Make", flex: 1 },
//     { field: "model", headerName: "Model", flex: 1 },
//     { field: "price", headerName: "Price", flex: 1, type: "number" },
//   ]);

//   return (
//     <DashboardLayout>
//       <DashboardNavbar navbarTitle="신규 대출 심사" />
//       <MDBox pt={6} pb={3}>
//         <Card>
//           <CardContent>
//             <MDBox pt={6} pb={3}>
//               <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 pageSize={5}
//                 rowsPerPageOptions={[5, 10]}
//                 sx={{
//                   border: 1,
//                   borderColor: "divider",
//                   "& .MuiDataGrid-columnSeparator": {
//                     visibility: "visible",
//                   },
//                   "& .MuiDataGrid-columnHeader": {
//                     borderRight: "1px solid #e0e0e0",
//                   },
//                   "& .MuiDataGrid-cell": {
//                     borderRight: "1px solid #e0e0e0",
//                   },
//                 }}
//               />
//             </MDBox>
//           </CardContent>
//         </Card>
//       </MDBox>
//     </DashboardLayout>
//   );
// }

export default NewLoanReview;
