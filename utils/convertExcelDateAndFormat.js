function convertExcelDateAndFormat(excelDate) {
  const millisPerDay = 24 * 60 * 60 * 1000;
  const daysBetweenExcelAndJS = 25569;
  const excelDateNum = parseInt(excelDate, 10);
  const jsDate = new Date(
    (excelDateNum - daysBetweenExcelAndJS) * millisPerDay
  );
  return jsDate.toISOString();
}

module.exports = convertExcelDateAndFormat;
