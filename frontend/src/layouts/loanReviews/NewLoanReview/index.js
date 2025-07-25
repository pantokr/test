/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import ListTableData from "layouts/loanReviews/NewLoanReview/data/ListTableData";
import LoanDetailModal from "./components/LoanDetailModal";

function NewLoanReview() {
  const { columns, rows, onRowClick, selectedLoan, modalOpen, setModalOpen } = ListTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar navbarTitle="신규 대출 심사" />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  대출 신청 목록
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                  onRowClick={onRowClick} // 행 클릭 이벤트 연결
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* LoanDetailModal 띄우기 */}
      <LoanDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedLoan={selectedLoan}
      />
    </DashboardLayout>
  );
}
export default NewLoanReview;
