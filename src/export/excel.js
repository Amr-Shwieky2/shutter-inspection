import ExcelJS from 'exceljs';
import { DIR_ORDER, DIR_LABEL, STATUS_META } from '../constants';
import { formatDateTime, fileBaseName } from '../utils/format';

const FILL = { ok: 'FFDCFCE7', cable: 'FFFEF3C7', motor: 'FFFEE2E2', shutter: 'FFFFEDD5' };
const FONT_COLOR = { ok: 'FF14532D', cable: 'FF78350F', motor: 'FF7F1D1D', shutter: 'FF7C2D12' };
const THIN_BORDER = { style: 'thin', color: { argb: 'FFCBD5E1' } };
const CELL_BORDER = { top: THIN_BORDER, bottom: THIN_BORDER, left: THIN_BORDER, right: THIN_BORDER };

export async function exportExcel(floors, site) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'בקרת תריסים';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('דוח בדיקת תריסים', {
    views: [{ rightToLeft: true, state: 'frozen', ySplit: 1 }],
  });

  sheet.columns = [
    { header: 'קומה', key: 'floor', width: 12 },
    { header: 'כיוון', key: 'dir', width: 14 },
    { header: 'חלון מס׳', key: 'win', width: 10 },
    { header: 'סטטוס', key: 'status', width: 36 },
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
      windows.forEach((status, index) => {
        const row = sheet.addRow({
          floor: floor.floorLabel,
          dir: DIR_LABEL[dirId],
          win: count > 1 ? index + 1 : '—',
          status: STATUS_META[status].desc,
          when: formatDateTime(floor.savedAt),
        });
        row.eachCell((cell) => {
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
          cell.border = CELL_BORDER;
        });
        row.getCell('floor').font = { bold: true };
        const statusCell = row.getCell('status');
        statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: FILL[status] } };
        statusCell.font = { bold: true, color: { argb: FONT_COLOR[status] } };
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
