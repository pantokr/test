import { ColDef } from "ag-grid-community";

const LoginResetHistoryColumnDefs: ColDef[] = [
  {
    field: "loginId",
    headerName: "사용자 ID",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "resetTime",
    headerName: "초기화 시간",
    flex: 2,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "resetCode",
    headerName: "초기화 구분",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "resetId",
    headerName: "초기화 ID",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "resetReason",
    headerName: "초기화 사유",
    flex: 2,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "prevLoginIp",
    headerName: "이전 로그인 IP",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
];

export default LoginResetHistoryColumnDefs;
