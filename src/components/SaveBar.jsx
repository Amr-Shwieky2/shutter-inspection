import { totalWindows, flaggedWindowsCount } from '../domain';

export default function SaveBar({ sel, canSave, editing, onSave }) {
  const total = totalWindows(sel);
  const flagged = flaggedWindowsCount(sel);
  const pct = total ? Math.round((flagged / total) * 100) : 0;

  return (
    <div className="save-bar">
      <div className="progress-wrap">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="progress-text">
          {flagged}/{total} חלונות עם ליקוי
        </span>
      </div>
      <button type="button" className="btn-primary btn-save" disabled={!canSave} onClick={onSave}>
        {editing ? 'עדכון קומה' : 'שמירת קומה'}
      </button>
    </div>
  );
}
