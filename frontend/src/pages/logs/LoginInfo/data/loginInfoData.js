import { fetchLoginInfoHistory } from "api/data";

export const rowData = await fetchLoginInfoHistory();

export const columnDefs = [
  { field: "login_id", headerName: "Login ID", flex: 1 },
  { field: "emp_name", headerName: "Name", flex: 1 },
  { field: "login_time", headerName: "Login Time", flex: 2 },
  { field: "logout_time", headerName: "Logout Time", flex: 1 },
  { field: "is_external", headerName: "External", flex: 1 },
  { field: "client_ip", headerName: "User IP", flex: 1 },
  { field: "server_ip", headerName: "Server IP", flex: 1 },
];
