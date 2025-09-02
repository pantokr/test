import { ColDef } from "ag-grid-community";

const LoginFailureHistoryColumnDefs: ColDef[] = [
  {
    field: "loginId",
    headerName: "사용자 ID",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "loginTime",
    headerName: "로그인 시도 시간",
    flex: 2,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "failCode",
    headerName: "실패 구분",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "clientIp",
    headerName: "클라이언트 IP",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "serverIp",
    headerName: "서버 IP",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
];

export default LoginFailureHistoryColumnDefs;
