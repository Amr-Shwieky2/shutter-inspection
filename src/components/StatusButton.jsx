import { statusMeta } from '../constants';
import { StatusIcon, CheckIcon } from '../icons';

export default function StatusButton({ statusId, selected, onClick }) {
  const meta = statusMeta(statusId);
  return (
    <button
      type="button"
      className={`status-btn tone-${statusId}${selected ? ' selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="status-icon">
        <StatusIcon id={statusId} />
      </span>
      <span className="status-text">
        <span className="status-title">{meta.title}</span>
      </span>
      {selected && (
        <span className="status-check">
          <CheckIcon />
        </span>
      )}
    </button>
  );
}
