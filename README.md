# בקרת תריסים — Shutter Inspection

Mobile-friendly Hebrew (RTL) field app for inspecting window shutters
floor-by-floor in a building. Built with React + Vite.

## What it does

- Enter the floor currently being inspected (free text — numbers or labels
  like "קרקע").
- For each of the 4 compass directions (צפון / דרום / מזרח / מערב), set how
  many windows/shutters face that direction on this floor, then record a
  status for each one:
  1. תקין — השטר עובד ותקין
  2. הכבל החשמלי קצר מדי
  3. המנוע לא עובד
  4. השטר קצר מדי
- Save as many floors as needed in one session; edit or delete any of them.
- Review a live summary dashboard (floors inspected, windows inspected,
  issues found, all-clear floors) with a full color-coded table.
- Export the full report as a real **.xlsx** file (styled, RTL, colored by
  status), or produce a **PDF** via the browser's print dialog — includes
  sign-off lines for both the inspector and the manager (מנהל).
- Data is kept in the browser's local storage, so an accidental refresh
  mid-inspection doesn't lose work.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build     # production build to dist/
npm run lint       # oxlint
```

## Project structure

```
src/
  constants.js        direction/status definitions (labels, colors, order)
  domain.js            pure helpers over the floors/directions data model
  icons.jsx            inline SVG icon components
  utils/
    format.js          date formatting, export filename helper
    storage.js          localStorage persistence
    id.js                id generator for saved floors
  export/
    excel.js            .xlsx generation (ExcelJS), lazy-loaded on export
  components/
    TopBar, InspectView, DirectionCard, StatusButton, SaveBar,
    RecentFloorList, SummaryView, SummaryTable, EmptyHint,
    Toast, ConfirmModal, PrintReport
  App.jsx              app state + wiring
```
