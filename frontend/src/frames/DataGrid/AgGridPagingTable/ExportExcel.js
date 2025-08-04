// exportExcel.js
export function exportExcel(gridApi, fileName) {
  if (!gridApi) {
    console.warn("Grid API가 없습니다.");
    return;
  }

  if (!fileName) {
    fileName = "exported_data.xlsx"; // 기본 파일 이름 설정
  }

  gridApi.exportDataAsExcel({
    fileName,
  });
}
