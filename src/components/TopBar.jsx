import { CompassIcon } from '../icons';

export default function TopBar({ tab, onTabChange, floorsCount }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">
          <CompassIcon />
        </span>
        <div className="brand-text">
          <strong>בקרת תריסים</strong>
          <span>דוח בדיקה בשטח לפי קומות</span>
        </div>
      </div>
      <nav className="tabs">
        <button type="button" className={`tab${tab === 'inspect' ? ' active' : ''}`} onClick={() => onTabChange('inspect')}>
          בדיקה
        </button>
        <button type="button" className={`tab${tab === 'summary' ? ' active' : ''}`} onClick={() => onTabChange('summary')}>
          סיכום
          {floorsCount > 0 && <span className="tab-badge">{floorsCount}</span>}
        </button>
      </nav>
    </header>
  );
}
