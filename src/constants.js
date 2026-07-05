export const DIRS = [
  { id: 'north', he: 'צפון', rot: 0 },
  { id: 'south', he: 'דרום', rot: 180 },
  { id: 'east', he: 'מזרח', rot: 90 },
  { id: 'west', he: 'מערב', rot: 270 },
];
export const DIR_ORDER = DIRS.map((d) => d.id);
export const DIR_LABEL = Object.fromEntries(DIRS.map((d) => [d.id, d.he]));

export const STATUS_ORDER = ['ok', 'cable', 'motor', 'shutter'];
export const STATUS_META = {
  ok: { title: 'תקין', desc: 'השטר עובד ותקין', tone: 'ok' },
  cable: { title: 'כבל קצר', desc: 'הכבל החשמלי קצר מדי', tone: 'cable' },
  motor: { title: 'מנוע תקוע', desc: 'המנוע לא עובד', tone: 'motor' },
  shutter: { title: 'שטר קצר', desc: 'השטר קצר מדי', tone: 'shutter' },
};

export const DEFAULT_WINDOW_COUNT = 1;
export const MAX_WINDOWS_PER_DIRECTION = 20;
