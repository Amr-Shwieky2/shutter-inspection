export function formatDateTime(ts) {
  try {
    return new Date(ts).toLocaleString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

const HEBREW_LETTERS = String.fromCharCode(1488) + '-' + String.fromCharCode(1514);
const SAFE_CHARS_RE = new RegExp('[^\\w' + HEBREW_LETTERS + '-]+', 'g');

export function fileBaseName(site) {
  const datePart = new Date().toISOString().slice(0, 10);
  const trimmed = site.trim();
  const sanitized = trimmed ? '-' + trimmed.replace(SAFE_CHARS_RE, '_') : '';
  return `דוח-בדיקת-תריסים${sanitized}-${datePart}`;
}
