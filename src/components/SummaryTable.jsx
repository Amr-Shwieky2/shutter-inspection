import { DIR_ORDER, STATUS_META } from '../constants';
import { EditIcon, TrashIcon } from '../icons';

export default function SummaryTable({ floors, onEdit, onDelete }) {
  return (
    <section className="summary-table-wrap">
      <table className="summary-table">
        <thead>
          <tr>
            <th>קומה</th>
            <th>צפון</th>
            <th>דרום</th>
            <th>מזרח</th>
            <th>מערב</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {floors.map((f) => (
            <tr key={f.id}>
              <td className="s-floor">קומה {f.floorLabel}</td>
              {DIR_ORDER.map((d) => {
                const { count, windows } = f.directions[d];
                return (
                  <td key={d}>
                    {count === 0 ? (
                      <span className="chip-muted">—</span>
                    ) : (
                      <div className="chip-wrap">
                        {windows.map((w, i) => {
                          const meta = STATUS_META[w];
                          return (
                            <span key={i} className={`chip tone-${meta.tone}`} title={meta.desc}>
                              {count > 1 ? `${i + 1}. ${meta.title}` : meta.title}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </td>
                );
              })}
              <td className="s-actions">
                <button type="button" className="icon-btn" aria-label="עריכה" onClick={() => onEdit(f.id)}>
                  <EditIcon />
                </button>
                <button type="button" className="icon-btn danger" aria-label="מחיקה" onClick={() => onDelete(f.id)}>
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
