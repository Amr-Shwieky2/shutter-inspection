import { DIR_ORDER, DEFAULT_WINDOW_COUNT } from './constants';

export function makeEmptyDirections(counts = {}) {
  const result = {};
  DIR_ORDER.forEach((id) => {
    const count = counts[id] ?? DEFAULT_WINDOW_COUNT;
    result[id] = { count, windows: Array(count).fill(null) };
  });
  return result;
}

export function cloneDirections(directions) {
  const result = {};
  DIR_ORDER.forEach((id) => {
    result[id] = { count: directions[id].count, windows: directions[id].windows.slice() };
  });
  return result;
}

export function isFloorComplete(directions) {
  return DIR_ORDER.every((id) => directions[id].windows.every((w) => w !== null));
}

export function totalWindows(directions) {
  return DIR_ORDER.reduce((sum, id) => sum + directions[id].count, 0);
}

export function filledWindows(directions) {
  return DIR_ORDER.reduce((sum, id) => sum + directions[id].windows.filter((w) => w !== null).length, 0);
}

export function countIssues(floors) {
  let n = 0;
  floors.forEach((f) => {
    DIR_ORDER.forEach((d) => {
      f.directions[d].windows.forEach((w) => {
        if (w && w !== 'ok') n++;
      });
    });
  });
  return n;
}

export function totalWindowsInspected(floors) {
  return floors.reduce((sum, f) => sum + totalWindows(f.directions), 0);
}

export function allClearFloorsCount(floors) {
  return floors.filter((f) => DIR_ORDER.every((d) => f.directions[d].windows.every((w) => w === 'ok'))).length;
}
