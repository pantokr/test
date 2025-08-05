// exportExcel.js
export default function exportExcel({ gridApi, fileName }) {
  gridApi.exportDataAsExcel({
    fileName,
  });
}
