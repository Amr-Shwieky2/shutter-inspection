import { DIR_ORDER, DIR_LABEL } from '../constants';
import { TrashIcon } from '../icons';

export default function RecentFloorList({ floors, editingId, onEdit, onDelete }) {
  const ordered = [...floors].reverse();

  return (
    <section>
      <h2 className="section-title">קומות שנשמרו ({floors.length})</h2>
      <ul className="floor-list">
        {ordered.map((f) => (
          <li className={`floor-row${editingId === f.id ? ' floor-row-editing' : ''}`} key={f.id}>
            <button type="button" className="floor-row-main" onClick={() => onEdit(f.id)}>
              <span className="floor-row-text">
                <span className="floor-row-label">קומה {f.floorLabel}</span>
                {(f.site || f.inspector) && (
                  <span className="floor-row-meta">
                    {[f.site, f.inspector].filter(Boolean).join(' · ')}
                  </span>
                )}
              </span>
              <span className="floor-row-dots">
                {DIR_ORDER.map((d) => {
                  const { count, windows } = f.directions[d];
                  return (
                    <span key={d} className="dir-dot-group" title={DIR_LABEL[d]}>
                      {count === 0 ? (
                        <span className="dot dot-empty" />
                      ) : (
                        windows.map((statuses, i) => (
                          <span key={i} className="window-dot-group">
                            {statuses.length === 0 ? (
                              <span className="dot dot-ok" title="תקין" />
                            ) : (
                              statuses.map((s, j) => <span key={j} className={`dot dot-${s}`} />)
                            )}
                          </span>
                        ))
                      )}
                    </span>
                  );
                })}
              </span>
            </button>
            <button type="button" className="icon-btn danger" aria-label="מחיקת קומה" onClick={() => onDelete(f.id)}>
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
