export default function ConfirmModal({ message, onConfirm, onCancel }) {
  if (!message) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-box" role="alertdialog" aria-modal="true">
        <p>{message}</p>
        <div className="modal-actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>
            ביטול
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm}>
            אישור מחיקה
          </button>
        </div>
      </div>
    </div>
  );
}
