const xlsx = require("xlsx");

function getFileFromExcel(req) {
  const file = req.file;
  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
}

module.exports = getFileFromExcel;
