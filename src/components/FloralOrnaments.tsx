import type { CSSProperties } from 'react';

export function MandalaCrest({ className = 'w-14 h-14' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.85">
        <circle cx="60" cy="60" r="52" strokeDasharray="3 4" />
        <circle cx="60" cy="60" r="42" />
        <circle cx="60" cy="60" r="14" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 60 + Math.cos(angle) * 16;
          const y1 = 60 + Math.sin(angle) * 16;
          const x2 = 60 + Math.cos(angle) * 40;
          const y2 = 60 + Math.sin(angle) * 40;
          const cx1 = 60 + Math.cos(angle - 0.18) * 30;
          const cy1 = 60 + Math.sin(angle - 0.18) * 30;
          const cx2 = 60 + Math.cos(angle + 0.18) * 30;
          const cy2 = 60 + Math.sin(angle + 0.18) * 30;
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2} Q ${cx2} ${cy2} ${x1} ${y1}`}
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const px = 60 + Math.cos(angle) * 47;
          const py = 60 + Math.sin(angle) * 47;
          return <circle key={`dot-${i}`} cx={px} cy={py} r="1.6" fill="currentColor" />;
        })}
      </g>
    </svg>
  );
}

export function LotusDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#B08438]/55" />
      <svg viewBox="0 0 48 24" className="w-10 h-5 text-[#8A1C2E]/80" fill="none">
        <path
          d="M24 3C26.5 8 27.5 13 24 19C20.5 13 21.5 8 24 3Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path
          d="M24 19C18 17 13 13 11 7C16 8.5 20.5 12 24 19Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M24 19C30 17 35 13 37 7C32 8.5 27.5 12 24 19Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M24 19C16 19.5 9 17.5 5 13.5C10.5 13.5 16.5 15 24 19Z"
          stroke="#B08438"
          strokeWidth="1"
        />
        <path
          d="M24 19C32 19.5 39 17.5 43 13.5C37.5 13.5 31.5 15 24 19Z"
          stroke="#B08438"
          strokeWidth="1"
        />
      </svg>
      <span className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#B08438]/55" />
    </div>
  );
}

const PETALS = [
  { left: '8%', duration: '17s', delay: '0s', color: '#E8B4BC', size: 12 },
  { left: '22%', duration: '21s', delay: '3s', color: '#F3C778', size: 10 },
  { left: '38%', duration: '19s', delay: '6s', color: '#E2A3AE', size: 11 },
  { left: '54%', duration: '23s', delay: '1.5s', color: '#F3C778', size: 9 },
  { left: '71%', duration: '18s', delay: '4.5s', color: '#E8B4BC', size: 12 },
  { left: '88%', duration: '20s', delay: '7s', color: '#DF9AA7', size: 10 },
];

export function FloatingPetals() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-10"
      aria-hidden="true"
    >
      {PETALS.map((petal, idx) => (
        <div
          key={idx}
          className="animate-petal absolute -top-6 opacity-0"
          style={
            {
              left: petal.left,
              '--petal-duration': petal.duration,
              '--petal-delay': petal.delay,
            } as CSSProperties
          }
        >
          <svg
            width={petal.size}
            height={petal.size * 1.35}
            viewBox="0 0 16 22"
            fill="none"
          >
            <path
              d="M8 1C12.5 5.5 15 11.5 12 17C10.2 20.2 5.8 20.2 4 17C1 11.5 3.5 5.5 8 1Z"
              fill={petal.color}
              fillOpacity="0.48"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
