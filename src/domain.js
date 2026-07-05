import { DIR_ORDER, DEFAULT_WINDOW_COUNT, PROBLEM_STATUS_ORDER } from './constants';

// A window's value is an array of selected problem status ids: [] means no
// problem was flagged for that window (implicitly fine - there is no
// selectable "ok" button), or one-or-more problem ids (e.g. ['cable',
// 'disconnect']).
//
// Firestore rejects arrays that directly contain other arrays, so a window's
// array can't be stored as a bare array-of-arrays under `windows`. On the way
// to Firestore each window is wrapped as {statuses: [...]} (array-of-maps,
// which Firestore allows); normalizeWindowEntry unwraps that (and legacy
// pre-multi-select formats, including a possible old explicit "ok") back
// into a plain array for in-app use.
export function normalizeWindowEntry(w) {
  if (Array.isArray(w)) return w.filter((s) => s !== 'ok');
  if (w && Array.isArray(w.statuses)) return w.statuses.filter((s) => s !== 'ok');
  if (w === null || w === undefined || w === 'ok') return [];
  return [w]; // legacy single-status documents saved before multi-select
}

export function normalizeDirections(directions) {
  const result = {};
  DIR_ORDER.forEach((id) => {
    const dir = directions[id] ?? { count: 0, windows: [] };
    result[id] = { count: dir.count, windows: (dir.windows ?? []).map(normalizeWindowEntry) };
  });
  return result;
}

export function toFirestoreDirections(directions) {
  const result = {};
  DIR_ORDER.forEach((id) => {
    result[id] = { count: directions[id].count, windows: directions[id].windows.map((w) => ({ statuses: w })) };
  });
  return result;
}

export function toggleWindowStatus(current, statusId) {
  return current.includes(statusId) ? current.filter((s) => s !== statusId) : [...current, statusId];
}

export function makeEmptyDirections(counts = {}) {
  const result = {};
  DIR_ORDER.forEach((id) => {
    const count = counts[id] ?? DEFAULT_WINDOW_COUNT;
    result[id] = { count, windows: Array.from({ length: count }, () => []) };
  });
  return result;
}

export function cloneDirections(directions) {
  const result = {};
  DIR_ORDER.forEach((id) => {
    result[id] = { count: directions[id].count, windows: directions[id].windows.map((w) => w.slice()) };
  });
  return result;
}

export function totalWindows(directions) {
  return DIR_ORDER.reduce((sum, id) => sum + directions[id].count, 0);
}

// How many windows currently have at least one problem flagged - used for
// live feedback in the save bar while filling out a floor (there's no
// "completion" requirement anymore since a blank window is valid/fine).
export function flaggedWindowsCount(directions) {
  return DIR_ORDER.reduce((sum, id) => sum + directions[id].windows.filter((w) => w.length > 0).length, 0);
}

// Counts windows that have at least one problem - a window with 3 problems
// still only counts once here (this is "does this window need attention",
// not "how many problems exist"). See countIssuesByType for the breakdown.
export function countIssueWindows(floors) {
  let n = 0;
  floors.forEach((f) => {
    DIR_ORDER.forEach((d) => {
      f.directions[d].windows.forEach((w) => {
        if (w.length > 0) n++;
      });
    });
  });
  return n;
}

export function countIssuesByType(floors) {
  const counts = Object.fromEntries(PROBLEM_STATUS_ORDER.map((id) => [id, 0]));
  floors.forEach((f) => {
    DIR_ORDER.forEach((d) => {
      f.directions[d].windows.forEach((w) => {
        w.forEach((s) => {
          if (s in counts) counts[s]++;
        });
      });
    });
  });
  return counts;
}

export function totalWindowsInspected(floors) {
  return floors.reduce((sum, f) => sum + totalWindows(f.directions), 0);
}

export function allClearFloorsCount(floors) {
  return floors.filter((f) => DIR_ORDER.every((d) => f.directions[d].windows.every((w) => w.length === 0))).length;
}
