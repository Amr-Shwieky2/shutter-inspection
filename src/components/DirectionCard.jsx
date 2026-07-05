import { STATUS_ORDER, MAX_WINDOWS_PER_DIRECTION } from '../constants';
import StatusButton from './StatusButton';
import { ArrowIcon } from '../icons';

export default function DirectionCard({ dir, data, onCountChange, onToggleStatus }) {
  const { count, windows } = data;

  return (
    <div className="dir-card">
      <div className="dir-head">
        <div className="dir-head-label">
          <span className="dir-icon">
            <ArrowIcon rotate={dir.rot} />
          </span>
          <span className="dir-label">{dir.he}</span>
        </div>
        <div className="win-count-stepper">
          <button
            type="button"
            className="mini-btn"
            onClick={() => onCountChange(Math.max(0, count - 1))}
            aria-label={`פחות חלונות בכיוון ${dir.he}`}
          >
            −
          </button>
          <span className="win-count-num">{count}</span>
          <button
            type="button"
            className="mini-btn"
            onClick={() => onCountChange(Math.min(MAX_WINDOWS_PER_DIRECTION, count + 1))}
            aria-label={`עוד חלון בכיוון ${dir.he}`}
          >
            +
          </button>
        </div>
      </div>

      {count === 0 && <p className="no-windows">אין חלונות בכיוון זה בקומה זו</p>}

      {windows.map((selectedStatuses, index) => (
        <div className="window-block" key={index}>
          {count > 1 && <div className="window-label">חלון {index + 1}</div>}
          <div className="status-grid">
            {STATUS_ORDER.map((statusId) => (
              <StatusButton
                key={statusId}
                statusId={statusId}
                selected={selectedStatuses.includes(statusId)}
                onClick={() => onToggleStatus(index, statusId)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
