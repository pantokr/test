import { GridColDef } from "@mui/x-data-grid";

// flex 기반 컬럼 정의
const ColumnDefs: GridColDef[] = [
  {
    field: "login_id",
    headerName: "사용자 ID",
    flex: 1,
    sortable: true,
  },
  {
    field: "emp_name",
    headerName: "이름",
    flex: 1,
    sortable: true,
  },
  {
    field: "login_time",
    headerName: "로그인 시간",
    flex: 2,
  },
  {
    field: "logout_time",
    headerName: "로그아웃 시간",
    flex: 2,
  },
  {
    field: "is_external",
    headerName: "외부접속",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "client_ip",
    headerName: "클라이언트 IP",
    flex: 2,
    sortable: true,
  },
  {
    field: "server_ip",
    headerName: "서버 IP",
    flex: 2,
    sortable: true,
  },
];

export default ColumnDefs;
