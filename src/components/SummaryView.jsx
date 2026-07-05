import { countIssueWindows, countIssuesByType, totalWindowsInspected, allClearFloorsCount } from '../domain';
import { PROBLEM_STATUS_ORDER, statusMeta } from '../constants';
import SummaryTable from './SummaryTable';
import EmptyHint from './EmptyHint';
import { XlsIcon, PrintIcon, TrashIcon } from '../icons';

export default function SummaryView({ floors, onExportExcel, onExportPrint, onEditFloor, onDeleteFloor, onClearAll }) {
  const issueWindows = countIssueWindows(floors);
  const issuesByType = countIssuesByType(floors);
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
        <div className={`stat-tile${issueWindows > 0 ? ' stat-bad' : ''}`}>
          <span className="stat-num">{issueWindows}</span>
          <span className="stat-label">חלונות עם ליקוי</span>
        </div>
        <div className="stat-tile stat-good">
          <span className="stat-num">{clear}</span>
          <span className="stat-label">קומות תקינות</span>
        </div>
      </section>

      {issueWindows > 0 && (
        <section className="issue-breakdown">
          {PROBLEM_STATUS_ORDER.map((id) => (
            <div key={id} className={`issue-tile tone-${id}`}>
              <span className="issue-tile-num">{issuesByType[id]}</span>
              <span className="issue-tile-label">{statusMeta(id).title}</span>
            </div>
          ))}
        </section>
      )}

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
