/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import axios from "axios";

// 상태 → 뱃지 색상 매핑
const statusColor = {
  접수완료: "info",
  심사중: "warning",
  승인완료: "success",
  반려: "error",
};

export default function ListTableData() {
  const [rows, setRows] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/loans").then((res) => {
      setRawData(res.data); // 원본 저장

      const mapped = res.data.map((item) => ({
        debtor: (
          <MDTypography variant="button" fontWeight="medium">
            {item.debtor}
          </MDTypography>
        ),
        loan_amount: (
          <MDTypography variant="caption" fontWeight="regular" color="text">
            ₩{Number(item.loan_amount).toLocaleString()}
          </MDTypography>
        ),
        property_address: (
          <MDTypography variant="caption" fontWeight="regular" color="text">
            {item.property_address}
          </MDTypography>
        ),
        application_date: (
          <MDTypography variant="caption" fontWeight="regular" color="text">
            {item.application_date}
          </MDTypography>
        ),
        status: (
          <MDBadge
            badgeContent={item.status}
            color={statusColor[item.status] || "secondary"}
            variant="gradient"
            size="sm"
          />
        ),
      }));
      setRows(mapped);
    });
  }, []);

  // 행 클릭 핸들러
  const handleRowClick = (index) => {
    setSelectedLoan(rawData[index]);
    setModalOpen(true);
    console.log("Selected Loan:", rawData[index]);
  };

  const columns = [
    { Header: "채무자", accessor: "debtor", align: "left" },
    { Header: "요청대출금액", accessor: "loan_amount", align: "right" },
    { Header: "물건주소", accessor: "property_address", align: "left" },
    { Header: "접수일자", accessor: "application_date", align: "center" },
    { Header: "처리현황", accessor: "status", align: "center" },
  ];

  return {
    columns,
    rows,
    onRowClick: handleRowClick,
    selectedLoan,
    modalOpen,
    setModalOpen,
  };
}
