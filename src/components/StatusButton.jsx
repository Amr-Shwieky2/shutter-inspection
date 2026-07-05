import { STATUS_META } from '../constants';
import { StatusIcon, CheckIcon } from '../icons';

export default function StatusButton({ statusId, selected, onClick }) {
  const meta = STATUS_META[statusId];
  return (
    <button
      type="button"
      className={`status-btn tone-${meta.tone}${selected ? ' selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="status-icon">
        <StatusIcon id={statusId} />
      </span>
      <span className="status-text">
        <span className="status-title">{meta.title}</span>
        <span className="status-desc">{meta.desc}</span>
      </span>
      {selected && (
        <span className="status-check">
          <CheckIcon />
        </span>
      )}
    </button>
  );
}
