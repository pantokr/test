import { ColDef } from "ag-grid-community";

const ColumnDefs: ColDef[] = [
  {
    field: "loginId",
    headerName: "사용자 ID",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "empName",
    headerName: "이름",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "loginTime",
    headerName: "로그인 시간",
    flex: 2,
    sortable: true,
    filter: "agDateColumnFilter",
  },
  {
    field: "logoutTime",
    headerName: "로그아웃 시간",
    flex: 2,
    sortable: true,
    filter: "agDateColumnFilter",
  },
  {
    field: "isExternal",
    headerName: "외부접속",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "clientIp",
    headerName: "클라이언트 IP",
    flex: 2,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "serverIp",
    headerName: "서버 IP",
    flex: 2,
    sortable: true,
    filter: "agTextColumnFilter",
  },
];

export default ColumnDefs;
