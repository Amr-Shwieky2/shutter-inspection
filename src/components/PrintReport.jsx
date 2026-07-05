import { DIR_ORDER, DIR_LABEL, STATUS_META } from '../constants';
import { formatDateTime } from '../utils/format';
import { countIssues, totalWindowsInspected } from '../domain';

export default function PrintReport({ floors, site, inspector }) {
  const issues = countIssues(floors);
  const rows = [];
  floors.forEach((f) => {
    DIR_ORDER.forEach((d) => {
      const { count, windows } = f.directions[d];
      windows.forEach((status, i) => {
        rows.push({
          key: `${f.id}-${d}-${i}`,
          floor: f.floorLabel,
          floorSite: f.site,
          floorInspector: f.inspector,
          dir: DIR_LABEL[d],
          win: count > 1 ? i + 1 : '—',
          status,
          when: f.savedAt,
        });
      });
    });
  });

  const siteVal = site.trim();
  const inspectorVal = inspector.trim();

  return (
    <div id="printArea">
      <div className="p-page">
        <div className="p-head">
          <div>
            <h1>דוח בדיקת תריסים</h1>
            {siteVal && <div className="p-site">{siteVal}</div>}
          </div>
          <div className="p-meta">
            <div>תאריך הפקה: {formatDateTime(Date.now())}</div>
            {inspectorVal && <div>בודק: {inspectorVal}</div>}
          </div>
        </div>
        <div className="p-stats">
          <div>
            <b>{floors.length}</b> קומות נבדקו
          </div>
          <div>
            <b>{totalWindowsInspected(floors)}</b> חלונות נבדקו
          </div>
          <div className={issues > 0 ? 'p-bad' : 'p-good'}>
            <b>{issues}</b> ליקויים נמצאו
          </div>
        </div>
        <table className="p-table">
          <thead>
            <tr>
              <th>קומה</th>
              <th>אתר</th>
              <th>בודק</th>
              <th>כיוון</th>
              <th>חלון</th>
              <th>סטטוס</th>
              <th>נבדק בתאריך</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <td className="p-floor">{r.floor}</td>
                <td>{r.floorSite || '—'}</td>
                <td>{r.floorInspector || '—'}</td>
                <td>{r.dir}</td>
                <td>{r.win}</td>
                <td className={`p-cell p-${STATUS_META[r.status].tone}`}>{STATUS_META[r.status].title}</td>
                <td className="p-date">{formatDateTime(r.when)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-sign">
          <div className="p-sign-block">
            <span>שם הבודק: {inspectorVal || '_______________'}</span>
            <span>חתימה: _______________</span>
          </div>
          <div className="p-sign-block">
            <span>אישור מנהל: _______________</span>
            <span>חתימה: _______________</span>
          </div>
        </div>
      </div>
    </div>
  );
}
