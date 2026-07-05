import ExcelJS from 'exceljs';
import { DIR_ORDER, DIR_LABEL, statusMeta } from '../constants';
import { formatDateTime, fileBaseName } from '../utils/format';

const CELL_FILL = { ok: 'FFDCFCE7', issue: 'FFFEE2E2', empty: 'FFF1F5F9' };
const FONT_COLOR = {
  ok: 'FF14532D',
  not_closing: 'FFC2410C',
  cable: 'FF78350F',
  motor: 'FF7F1D1D',
  disconnect: 'FF4C1D95',
};
const SEPARATOR_COLOR = 'FF475569';
const THIN_BORDER = { style: 'thin', color: { argb: 'FFCBD5E1' } };
const CELL_BORDER = { top: THIN_BORDER, bottom: THIN_BORDER, left: THIN_BORDER, right: THIN_BORDER };

function statusCellValue(statuses) {
  if (statuses.length === 0) {
    return { value: 'לא צוין', fill: CELL_FILL.empty };
  }
  if (statuses.length === 1 && statuses[0] === 'ok') {
    return { value: 'תקין', fill: CELL_FILL.ok };
  }
  const richText = [];
  statuses.forEach((s, i) => {
    if (i > 0) richText.push({ font: { color: { argb: SEPARATOR_COLOR } }, text: ', ' });
    richText.push({ font: { bold: true, color: { argb: FONT_COLOR[s] ?? SEPARATOR_COLOR } }, text: statusMeta(s).title });
  });
  return { value: { richText }, fill: CELL_FILL.issue };
}

export async function exportExcel(floors, site) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'בקרת תריסים';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('דוח בדיקת תריסים', {
    views: [{ rightToLeft: true, state: 'frozen', ySplit: 1 }],
  });

  sheet.columns = [
    { header: 'קומה', key: 'floor', width: 12 },
    { header: 'אתר', key: 'site', width: 22 },
    { header: 'בודק', key: 'inspector', width: 18 },
    { header: 'כיוון', key: 'dir', width: 14 },
    { header: 'חלון מס׳', key: 'win', width: 10 },
    { header: 'סטטוס', key: 'status', width: 40 },
    { header: 'תאריך ושעה', key: 'when', width: 20 },
  ];

  sheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7490' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = CELL_BORDER;
  });

  floors.forEach((floor) => {
    DIR_ORDER.forEach((dirId) => {
      const { count, windows } = floor.directions[dirId];
      windows.forEach((statuses, index) => {
        const { value, fill } = statusCellValue(statuses);
        const row = sheet.addRow({
          floor: floor.floorLabel,
          site: floor.site || '—',
          inspector: floor.inspector || '—',
          dir: DIR_LABEL[dirId],
          win: count > 1 ? index + 1 : '—',
          status: value,
          when: formatDateTime(floor.savedAt),
        });
        row.eachCell((cell) => {
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
          cell.border = CELL_BORDER;
        });
        row.getCell('floor').font = { bold: true };
        row.getCell('status').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } };
      });
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  downloadBlob(blob, `${fileBaseName(site)}.xlsx`);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
