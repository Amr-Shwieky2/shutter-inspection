import { totalWindows, filledWindows } from '../domain';

export default function SaveBar({ sel, canSave, editing, onSave }) {
  const total = totalWindows(sel);
  const filled = filledWindows(sel);
  const pct = total ? Math.round((filled / total) * 100) : 0;

  return (
    <div className="save-bar">
      <div className="progress-wrap">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="progress-text">
          {filled}/{total} חלונות הוגדרו
        </span>
      </div>
      <button type="button" className="btn-primary btn-save" disabled={!canSave} onClick={onSave}>
        {editing ? 'עדכון קומה' : 'שמירת קומה'}
      </button>
    </div>
  );
}
