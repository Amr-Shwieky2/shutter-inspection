import { countIssues, totalWindowsInspected, allClearFloorsCount } from '../domain';
import SummaryTable from './SummaryTable';
import EmptyHint from './EmptyHint';
import { XlsIcon, PrintIcon, TrashIcon } from '../icons';

export default function SummaryView({ floors, onExportExcel, onExportPrint, onEditFloor, onDeleteFloor, onClearAll }) {
  const issues = countIssues(floors);
  const clear = allClearFloorsCount(floors);

  return (
    <>
      <section className="stats-row">
        <div className="stat-tile">
          <span className="stat-num">{floors.length}</span>
          <span className="stat-label">קומות נבדקו</span>
        </div>
        <div className="stat-tile">
          <span className="stat-num">{totalWindowsInspected(floors)}</span>
          <span className="stat-label">חלונות נבדקו</span>
        </div>
        <div className={`stat-tile${issues > 0 ? ' stat-bad' : ''}`}>
          <span className="stat-num">{issues}</span>
          <span className="stat-label">ליקויים נמצאו</span>
        </div>
        <div className="stat-tile stat-good">
          <span className="stat-num">{clear}</span>
          <span className="stat-label">קומות תקינות</span>
        </div>
      </section>

      <section className="export-bar">
        <button type="button" className="btn-primary" onClick={onExportExcel}>
          <XlsIcon /> ייצוא לאקסל
        </button>
        <button type="button" className="btn-secondary" onClick={onExportPrint}>
          <PrintIcon /> הפקת PDF להדפסה
        </button>
      </section>

      {floors.length ? (
        <>
          <SummaryTable floors={floors} onEdit={onEditFloor} onDelete={onDeleteFloor} />
          <button type="button" className="btn-ghost clear-all" onClick={onClearAll}>
            <TrashIcon /> מחיקת כל הנתונים
          </button>
        </>
      ) : (
        <EmptyHint />
      )}
    </>
  );
}
