export function ArrowIcon({ rotate = 0 }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      <path d="M12 4 L19 15 L12 11.3 L5 15 Z" fill="currentColor" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M5 12.5 L10 17.5 L19 7" stroke="currentColor" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatusIcon({ id }) {
  if (id === 'ok') {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7.5 12.5 L10.5 15.5 L16.5 9" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === 'cable') {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M13 3 L6 13 H11 L9.5 21 L18 10 H13 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (id === 'motor') {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 3v2.6M12 18.4V21M21 12h-2.6M5.6 12H3M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8M18.7 18.7l-1.8-1.8M7.1 7.1 5.3 5.3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line x1="3.5" y1="3.5" x2="20.5" y2="20.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (id === 'not_closing') {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M12 4v9M9 9.5l3 3 3-3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="5.5" y1="18" x2="18.5" y2="18" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <rect x="3" y="9" width="6" height="6" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="15" y="9" width="6" height="6" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 9.5 14.5 14.5M9.5 14.5 14.5 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M4 7h16M9 7V4.6c0-.6.4-1 1-1h4c.6 0 1 .4 1 1V7M6.5 7l.8 12.4c0 .6.5 1 1 1h7.4c.5 0 1-.4 1-1L18.5 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M4 20l1-4.2L15.5 5.3c.5-.5 1.3-.5 1.8 0l1.4 1.4c.5.5.5 1.3 0 1.8L8.2 19 4 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function XlsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9.5h16M4 14.5h16M9.5 4v16M14.5 4v16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function PrintIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M6 9V4h12v5M6 18H4.8c-.4 0-.8-.3-.8-.8v-5.4c0-.5.4-.8.8-.8h14.4c.4 0 .8.3.8.8v5.4c0 .5-.4.8-.8.8H18M6 14h12v6H6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 12 15.3 8 12 12 8.7 16Z" fill="currentColor" />
      <path d="M12 12 8.7 8 12 12 15.3 16Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function EmptyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 9h16M12 9v12M8 5.5h1M11 5.5h1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
