import { ColDef } from "ag-grid-community";

const ColumnDefs: ColDef[] = [
  {
    field: "login_id",
    headerName: "사용자 ID",
    flex: 1,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    field: "emp_name",
    headerName: "이름",
    flex: 1,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    field: "login_time",
    headerName: "로그인 시간",
    flex: 2,
    sortable: true,
    filter: 'agDateColumnFilter',
  },
  {
    field: "logout_time",
    headerName: "로그아웃 시간",
    flex: 2,
    sortable: true,
    filter: 'agDateColumnFilter',
  },
  {
    field: "is_external",
    headerName: "외부접속",
    flex: 1,
    cellStyle: { textAlign: 'center' },
    headerClass: 'ag-center-header',
    filter: 'agTextColumnFilter', // SetFilter 대신 TextFilter 사용
    valueFormatter: (params) => {
      return params.value ? 'Y' : 'N';
    },
  },
  {
    field: "client_ip",
    headerName: "클라이언트 IP",
    flex: 2,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    field: "server_ip",
    headerName: "서버 IP",
    flex: 2,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
];

export default ColumnDefs;