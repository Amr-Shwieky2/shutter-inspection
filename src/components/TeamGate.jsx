import { useState } from 'react';
import { CompassIcon } from '../icons';

export default function TeamGate({ onSubmit }) {
  const [code, setCode] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = code.trim();
    if (trimmed) onSubmit(trimmed);
  }

  return (
    <div className="gate-screen">
      <div className="gate-card">
        <span className="gate-mark">
          <CompassIcon />
        </span>
        <h1 className="gate-title">בקרת תריסים</h1>
        <p className="gate-desc">
          הזינו קוד צוות כדי להתחבר לנתונים המשותפים. כל מי שמזין את אותו קוד רואה ומעדכן
          את אותן קומות — כולל המנהל.
        </p>
        <form onSubmit={handleSubmit} className="gate-form">
          <input
            type="text"
            className="gate-input"
            placeholder="לדוגמה: הרצל-12-2026"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="off"
            autoFocus
          />
          <button type="submit" className="btn-primary gate-submit" disabled={!code.trim()}>
            כניסה
          </button>
        </form>
        <p className="gate-hint">
          פעם ראשונה? בחרו קוד כלשהו וייחודי לפרויקט הזה, ושתפו אותו עם שאר הצוות והמנהל.
        </p>
      </div>
    </div>
  );
}
