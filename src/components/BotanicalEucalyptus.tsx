export function EucalyptusCornerSprig({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 220"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Main curving stem */}
      <path
        d="M14 14C62 42 118 92 178 164C200 190 226 204 248 210"
        stroke="#5E6E4E"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M84 62C118 44 166 36 218 44"
        stroke="#6B7B5A"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M126 106C106 138 96 172 102 206"
        stroke="#6B7B5A"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Watercolor Eucalyptus Leaves */}
      <g opacity="0.88">
        <ellipse cx="42" cy="40" rx="22" ry="15" transform="rotate(-32 42 40)" fill="#9CAF8E" />
        <ellipse cx="42" cy="40" rx="22" ry="15" transform="rotate(-32 42 40)" stroke="#627353" strokeWidth="0.8" opacity="0.5" />

        <ellipse cx="82" cy="30" rx="20" ry="14" transform="rotate(12 82 30)" fill="#B5C5A7" />
        <ellipse cx="74" cy="78" rx="23" ry="16" transform="rotate(-55 74 78)" fill="#8FA37F" />

        <ellipse cx="132" cy="52" rx="24" ry="16" transform="rotate(-18 132 52)" fill="#9EB18F" />
        <ellipse cx="168" cy="32" rx="19" ry="13" transform="rotate(8 168 32)" fill="#B9C9AB" />
        <ellipse cx="206" cy="46" rx="22" ry="14" transform="rotate(24 206 46)" fill="#94A885" />

        <ellipse cx="144" cy="96" rx="21" ry="15" transform="rotate(30 144 96)" fill="#A9BA9A" />
        <ellipse cx="108" cy="144" rx="22" ry="15" transform="rotate(-68 108 144)" fill="#8CA07C" />
        <ellipse cx="106" cy="186" rx="17" ry="12" transform="rotate(-40 106 186)" fill="#B3C3A5" />

        <ellipse cx="192" cy="140" rx="23" ry="15" transform="rotate(-22 192 140)" fill="#9BB08D" />
        <ellipse cx="222" cy="184" rx="20" ry="13" transform="rotate(14 222 184)" fill="#879C78" />
        <ellipse cx="166" cy="176" rx="18" ry="12" transform="rotate(42 166 176)" fill="#B5C6A8" />
      </g>
    </svg>
  );
}

export function EucalyptusSideSprig({
  className = '',
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 150"
      fill="none"
      aria-hidden="true"
      className={`${flip ? '-scale-x-100' : ''} ${className}`}
    >
      <path
        d="M12 136C36 96 64 56 106 18"
        stroke="#637353"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <ellipse cx="36" cy="108" rx="16" ry="10" transform="rotate(-48 36 108)" fill="#96AA87" opacity="0.86" />
      <ellipse cx="64" cy="94" rx="15" ry="10" transform="rotate(16 64 94)" fill="#B1C2A3" opacity="0.88" />
      <ellipse cx="56" cy="64" rx="17" ry="11" transform="rotate(-58 56 64)" fill="#8DA27E" opacity="0.86" />
      <ellipse cx="88" cy="54" rx="15" ry="10" transform="rotate(10 88 54)" fill="#A8BA9B" opacity="0.88" />
      <ellipse cx="86" cy="28" rx="14" ry="9" transform="rotate(-34 86 28)" fill="#9EB18F" opacity="0.86" />
    </svg>
  );
}

export function EucalyptusHorizontalSprig({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 70" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 42C68 32 142 28 206 34"
        stroke="#627252"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.68"
      />
      <ellipse cx="42" cy="28" rx="15" ry="9" transform="rotate(-24 42 28)" fill="#9DB08E" opacity="0.85" />
      <ellipse cx="66" cy="48" rx="14" ry="8.5" transform="rotate(18 66 48)" fill="#B5C5A7" opacity="0.85" />
      <ellipse cx="102" cy="22" rx="16" ry="9.5" transform="rotate(-14 102 22)" fill="#8FA37F" opacity="0.88" />
      <ellipse cx="132" cy="44" rx="15" ry="9" transform="rotate(14 132 44)" fill="#A7B99A" opacity="0.86" />
      <ellipse cx="164" cy="24" rx="15" ry="9" transform="rotate(-10 164 24)" fill="#96A987" opacity="0.86" />
      <ellipse cx="192" cy="36" rx="13" ry="8" transform="rotate(8 192 36)" fill="#B3C3A5" opacity="0.88" />
    </svg>
  );
}

export function TornPaperEdge({
  position = 'bottom',
  fill = '#FCFBF8',
  className = '',
}: {
  position?: 'top' | 'bottom';
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1200 44"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`w-full h-6 sm:h-8 block pointer-events-none ${
        position === 'top' ? 'rotate-180' : ''
      } ${className}`}
    >
      <path
        d="M0,44 L0,20 C45,12 88,28 142,22 C196,16 244,6 306,18 C368,30 412,14 474,10 C536,6 584,26 648,20 C712,14 764,4 824,18 C884,32 940,12 1004,16 C1068,20 1138,8 1200,22 L1200,44 Z"
        fill={fill}
      />
    </svg>
  );
}

/* Delicate Line-Art Ceremony Icons for the Vertical Timeline */
export function TimelineIcon({ type }: { type: 'tilak' | 'mehendi' | 'sangeet' | 'haldi' | 'vivah' | 'reception' }) {
  const common = 'w-6 h-6 text-[#4D5736] stroke-[1.35]';
  switch (type) {
    case 'tilak':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <path d="M8 9h8l-1.5 9.5a2 2 0 0 1-2 1.5h-1a2 2 0 0 1-2-1.5L8 9Z" stroke="currentColor" />
          <path d="M9.5 6.5C9.5 5 11 4 12 4s2.5 1 2.5 2.5" stroke="currentColor" />
          <path d="M7 9h10" stroke="currentColor" strokeLinecap="round" />
          <path d="M12 12v4" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    case 'mehendi':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <path d="M12 4c2.8 3.2 4 6.4 4 9.5a4 4 0 1 1-8 0C8 10.4 9.2 7.2 12 4Z" stroke="currentColor" />
          <path d="M12 9v8M9.5 13.5 12 15l2.5-1.5" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    case 'sangeet':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <circle cx="9.5" cy="14" r="4.5" stroke="currentColor" />
          <circle cx="14.5" cy="14" r="4.5" stroke="currentColor" />
          <path d="M12 5.5 13.5 7 12 8.5 10.5 7 12 5.5Z" stroke="currentColor" />
        </svg>
      );
    case 'haldi':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <path d="M5 13h14a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6Z" stroke="currentColor" />
          <path d="M9 10c0-1.5 1.5-2.5 3-4 1.5 1.5 3 2.5 3 4" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    case 'vivah':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <path d="M4 20h16M6 20V10l6-5 6 5v10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 20v-5a2 2 0 1 1 4 0v5" stroke="currentColor" />
        </svg>
      );
    case 'reception':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <path d="M12 5a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" stroke="currentColor" />
          <path d="M12 3v2M4 15h16M7 18h10" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
  }
}
