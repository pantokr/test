import { ColDef } from "ag-grid-community";

const dateComparator = (
  filterLocalDateAtMidnight: Date,
  cellValue: string
): number => {
  if (!cellValue) return -1;
  const cellDate = new Date(cellValue); // string → Date
  if (isNaN(cellDate.getTime())) return -1;
  if (cellDate < filterLocalDateAtMidnight) return -1;
  if (cellDate > filterLocalDateAtMidnight) return 1;
  return 0;
};

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
    field: "dptName",
    headerName: "부서명",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "officeTel",
    headerName: "사무실 전화번호",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "mobileTel",
    headerName: "핸드폰 번호",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "recentConnDate",
    headerName: "최근 접속일",
    flex: 1.5,
    sortable: true,
    filter: "agDateColumnFilter",
    filterParams: { comparator: dateComparator },
  },
  {
    field: "passwdUpdateDate",
    headerName: "비밀번호 변경일",
    flex: 1.5,
    sortable: true,
    filter: "agDateColumnFilter",
    filterParams: { comparator: dateComparator },
  },
  {
    field: "clientIp",
    headerName: "클라이언트 IP",
    flex: 1.5,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "regEmpId",
    headerName: "등록자 ID",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "regDate",
    headerName: "등록일",
    flex: 1.5,
    sortable: true,
    filter: "agDateColumnFilter",
    filterParams: { comparator: dateComparator },
  },
  {
    field: "updEmpId",
    headerName: "수정자 ID",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "updDate",
    headerName: "수정일",
    flex: 1.5,
    sortable: true,
    filter: "agDateColumnFilter",
    filterParams: { comparator: dateComparator },
  },
];

export default ColumnDefs;
