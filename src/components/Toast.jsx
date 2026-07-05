export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast-host">
      <div className="toast">{message}</div>
    </div>
  );
}
