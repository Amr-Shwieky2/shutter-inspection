export const DIRS = [
  { id: 'north', he: 'צפון', rot: 0 },
  { id: 'south', he: 'דרום', rot: 180 },
  { id: 'east', he: 'מזרח', rot: 90 },
  { id: 'west', he: 'מערב', rot: 270 },
];
export const DIR_ORDER = DIRS.map((d) => d.id);
export const DIR_LABEL = Object.fromEntries(DIRS.map((d) => [d.id, d.he]));

// Each window can have zero-or-more of the 4 problem statuses selected at
// once, or the single "ok" status - "ok" and problem statuses are mutually
// exclusive (see toggleWindowStatus in domain.js). "not_closing" is a
// deliberately new id, not a reuse of the old single-select "shutter" id -
// the client's corrected wording ("וילון לא יורד עד למטה") is a different
// claim than the old "השטר קצר מדי", so old saved data must not be silently
// reinterpreted under a recycled id.
export const STATUS_ORDER = ['ok', 'not_closing', 'cable', 'motor', 'disconnect'];
export const PROBLEM_STATUS_ORDER = STATUS_ORDER.filter((id) => id !== 'ok');
export const STATUS_META = {
  ok: { title: 'תקין' },
  not_closing: { title: 'וילון לא יורד עד למטה' },
  cable: { title: 'כבל קצר' },
  motor: { title: 'מנוע לא עובד' },
  disconnect: { title: 'לא מתחבר' },
};
// Fallback for any legacy/unrecognized status id found in old saved data.
export const UNKNOWN_STATUS_META = { title: 'לא ידוע' };
export function statusMeta(id) {
  return STATUS_META[id] ?? UNKNOWN_STATUS_META;
}

export const DEFAULT_WINDOW_COUNT = 1;
export const MAX_WINDOWS_PER_DIRECTION = 20;
