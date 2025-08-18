import { ColDef } from "ag-grid-community";

const LoginResetHistoryColumnDefs: ColDef[] = [
  {
    field: "login_id",
    headerName: "사용자 ID",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "reset_time",
    headerName: "초기화 시간",
    flex: 2,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "reset_code",
    headerName: "초기화 구분",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "reset_id",
    headerName: "초기화 ID",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "reset_reason",
    headerName: "초기화 사유",
    flex: 2,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "prev_login_ip",
    headerName: "이전 로그인 IP",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
];

export default LoginResetHistoryColumnDefs;
