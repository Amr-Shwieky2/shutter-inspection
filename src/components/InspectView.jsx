import { DIRS } from '../constants';
import DirectionCard from './DirectionCard';
import SaveBar from './SaveBar';
import RecentFloorList from './RecentFloorList';
import EmptyHint from './EmptyHint';

export default function InspectView({
  site,
  onSiteChange,
  inspector,
  onInspectorChange,
  floorInput,
  onFloorInputChange,
  onStepFloor,
  sel,
  onCountChange,
  onStatusChange,
  editingId,
  onCancelEdit,
  canSave,
  onSave,
  floors,
  onEditFloor,
  onDeleteFloor,
}) {
  return (
    <>
      <section className="card">
        <label className="field">
          <span className="field-label">
            שם / כתובת הבניין <em>(אופציונלי)</em>
          </span>
          <input
            type="text"
            maxLength={60}
            placeholder="לדוגמה: מגדל הרצל 12, תל אביב"
            value={site}
            onChange={(e) => onSiteChange(e.target.value)}
            autoComplete="off"
          />
        </label>
        <label className="field">
          <span className="field-label">
            שם הבודק <em>(אופציונלי)</em>
          </span>
          <input
            type="text"
            maxLength={60}
            placeholder="שם מלא"
            value={inspector}
            onChange={(e) => onInspectorChange(e.target.value)}
            autoComplete="off"
          />
        </label>
        <div className="floor-picker">
          <span className="field-label">קומה נבדקת</span>
          <div className="floor-stepper">
            <button type="button" className="stepper-btn" onClick={() => onStepFloor(-1)} aria-label="קומה קודמת">
              −
            </button>
            <input
              className="floor-input"
              type="text"
              inputMode="numeric"
              maxLength={20}
              placeholder="לדוגמה: 3, קרקע"
              value={floorInput}
              onChange={(e) => onFloorInputChange(e.target.value)}
            />
            <button type="button" className="stepper-btn" onClick={() => onStepFloor(1)} aria-label="קומה הבאה">
              +
            </button>
          </div>
        </div>
        {editingId && (
          <div className="editing-flag">
            <span>✏️ עריכת קומה קיימת</span>
            <button type="button" className="link-btn" onClick={onCancelEdit}>
              ביטול עריכה
            </button>
          </div>
        )}
      </section>

      <section className="dir-grid">
        {DIRS.map((d) => (
          <DirectionCard
            key={d.id}
            dir={d}
            data={sel[d.id]}
            onCountChange={(n) => onCountChange(d.id, n)}
            onStatusChange={(i, statusId) => onStatusChange(d.id, i, statusId)}
          />
        ))}
      </section>

      <SaveBar sel={sel} canSave={canSave} editing={!!editingId} onSave={onSave} />

      {floors.length ? (
        <RecentFloorList floors={floors} editingId={editingId} onEdit={onEditFloor} onDelete={onDeleteFloor} />
      ) : (
        <EmptyHint />
      )}
    </>
  );
}
