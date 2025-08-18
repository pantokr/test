import { ColDef } from "ag-grid-community";

const LoginFailureHistoryColumnDefs: ColDef[] = [
  {
    field: "login_id",
    headerName: "사용자 ID",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "login_time",
    headerName: "로그인 시도 시간",
    flex: 2,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "fail_code",
    headerName: "실패 구분",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "client_ip",
    headerName: "클라이언트 IP",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "server_ip",
    headerName: "서버 IP",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
];

export default LoginFailureHistoryColumnDefs;
