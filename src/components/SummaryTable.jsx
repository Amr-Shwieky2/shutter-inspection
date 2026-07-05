import { DIR_ORDER, statusMeta } from '../constants';
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
              <td className="s-floor">
                קומה {f.floorLabel}
                {(f.site || f.inspector) && (
                  <div className="s-floor-meta">{[f.site, f.inspector].filter(Boolean).join(' · ')}</div>
                )}
              </td>
              {DIR_ORDER.map((d) => {
                const { count, windows } = f.directions[d];
                return (
                  <td key={d}>
                    {count === 0 ? (
                      <span className="chip-muted">—</span>
                    ) : (
                      <div className="chip-wrap">
                        {windows.map((statuses, i) => (
                          <span className="window-chip-group" key={i}>
                            {count > 1 && <span className="window-chip-index">{i + 1}.</span>}
                            {statuses.length === 0 ? (
                              <span className="chip-muted">—</span>
                            ) : (
                              statuses.map((s) => (
                                <span key={s} className={`chip tone-${s}`}>
                                  {statusMeta(s).title}
                                </span>
                              ))
                            )}
                          </span>
                        ))}
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
