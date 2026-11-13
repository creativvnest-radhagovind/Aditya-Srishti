import { useEffect, useState } from 'react';
import { COUPLE } from '../data/weddingData';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function getTimeRemaining(targetIso: string): TimeRemaining {
  const target = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

export function CountdownTimer() {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    getTimeRemaining(COUPLE.weddingIsoDate),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getTimeRemaining(COUPLE.weddingIsoDate));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (remaining.isPast) {
    return (
      <p className="text-xs font-ui tracking-wider text-[#5F6655]">
        शुभ विवाह सम्पन्न · 18 जनवरी 2027 · पुणे
      </p>
    );
  }

  const units = [
    { value: remaining.days, label: 'दिन' },
    { value: remaining.hours, label: 'घंटे' },
    { value: remaining.minutes, label: 'मिनट' },
    { value: remaining.seconds, label: 'सेकंड' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="border border-[#4D5736]/25 bg-[#FCFBF8] rounded py-2 px-1 text-center"
        >
          <div className="font-display text-2xl sm:text-3xl font-medium text-[#4D5736] tabular-nums leading-none">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[11px] text-[#5F6655]">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}
