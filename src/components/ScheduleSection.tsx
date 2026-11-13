import { Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import { CEREMONY_DAYS, type CeremonyDay } from '../data/weddingData';
import { LotusDivider } from './FloralOrnaments';

type CityFilter = 'all' | 'pune' | 'ranchi';

function DayImageFrame({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="aspect-[4/3] rounded-xl border border-[#B08438]/30 bg-gradient-to-br from-[#FAF3E6] to-[#EFE5D2] flex flex-col items-center justify-center p-6 text-center">
        <span className="text-2xl text-[#8A1C2E] mb-2">❀</span>
        <p className="text-sm text-[#68514A]">{alt}</p>
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#B08438]/35 bg-[#F4EFE4]">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function CeremonyDayBlock({ day }: { day: CeremonyDay }) {
  const hasImage = Boolean(day.imageUrl);

  return (
    <article className="bg-[#FFFDF9] border border-[#B08438]/30 rounded-2xl p-6 sm:p-10">
      {/* Day Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-6 border-b border-[#B08438]/25">
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#8A1C2E] leading-snug">
            {day.dateLabelHi}
          </h3>
          <p className="mt-1 font-display italic text-base text-[#68514A]">
            {day.dateLabelEn}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#68514A] font-medium">
          <MapPin className="w-4 h-4 text-[#B08438] shrink-0" />
          <span>{day.cityDisplay}</span>
        </div>
      </div>

      {/* Events Grid (with optional editorial botanical visual on the right) */}
      <div
        className={`mt-6 ${
          hasImage
            ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'
            : 'grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'
        }`}
      >
        <div className={hasImage ? 'lg:col-span-7 divide-y divide-[#B08438]/20' : 'contents'}>
          {day.events.map((event) => (
            <div
              key={event.id}
              className={
                hasImage
                  ? 'py-5 first:pt-0 last:pb-0'
                  : 'flex flex-col justify-between pt-2 md:pt-0 md:pr-6 md:border-r md:last:border-r-0 border-[#B08438]/20'
              }
            >
              <div>
                <h4 className="text-xl font-semibold text-[#2B181A]">
                  {event.title}
                </h4>
                {event.subtitle && (
                  <p className="font-display italic text-sm text-[#68514A] mt-0.5">
                    {event.subtitle}
                  </p>
                )}

                <div className="mt-3.5 space-y-2 text-sm text-[#4A3531]">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#8A1C2E] mt-0.5 shrink-0" />
                    <span className="font-medium text-[#2B181A] tabular-nums">
                      {event.time}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#B08438] mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{event.venue}</span>
                  </div>
                </div>
              </div>

              {(event.dressCode || event.note) && (
                <div className="mt-4 pt-3 border-t border-[#B08438]/15 space-y-2">
                  {event.dressCode && (
                    <div className="flex items-center gap-2.5 text-sm text-[#2B181A]">
                      <span
                        aria-hidden="true"
                        className="w-3.5 h-3.5 rounded-sm border border-black/15 shrink-0"
                        style={{ backgroundColor: event.dressCode.swatchHex }}
                      />
                      <span>
                        <span className="text-[#68514A]">Dress Code:</span>{' '}
                        <strong className="font-semibold">{event.dressCode.label}</strong>
                      </span>
                    </div>
                  )}

                  {event.note && (
                    <p className="text-sm text-[#8A1C2E] bg-[#FBF6EC] border border-[#B08438]/30 rounded-lg px-3.5 py-2.5 leading-relaxed">
                      {event.note}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {hasImage && day.imageUrl && (
          <div className="lg:col-span-5">
            <DayImageFrame src={day.imageUrl} alt={day.imageAlt ?? day.dateLabelHi} />
          </div>
        )}
      </div>
    </article>
  );
}

export function ScheduleSection() {
  const [filter, setFilter] = useState<CityFilter>('all');

  const filteredDays = CEREMONY_DAYS.filter((day) =>
    filter === 'all' ? true : day.cityTag === filter,
  );

  return (
    <section id="schedule" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#F4EFE4]/60 border-y border-[#B08438]/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-[#8A1C2E]">वैवाहिक उत्सव</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-[#2B181A] [text-wrap:balance]">
            कार्यक्रम विवरण
          </h2>
          <p className="mt-3 text-base text-[#68514A] leading-relaxed">
            पुणे में तिलक, मेहंदी, संगीत, हल्दी एवं शुभ विवाह तथा राँची में स्वागत समारोह (प्रीतिभोज) का विस्तृत समय-सारिणी विवरण।
          </p>
          <LotusDivider className="mt-5" />
        </div>

        {/* Interactive Filter Tabs */}
        <div className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label="शहर के अनुसार कार्यक्रम फ़िल्टर करें"
            className="inline-flex flex-wrap justify-center gap-1 p-1 bg-[#EAE2D3] rounded-lg border border-[#B08438]/25"
          >
            {[
              { id: 'all' as const, label: 'सभी कार्यक्रम' },
              { id: 'pune' as const, label: 'पुणे · 17–18 जनवरी' },
              { id: 'ranchi' as const, label: 'राँची · 21 जनवरी' },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-ui font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8A1C2E] ${
                    active
                      ? 'bg-[#FFFDF9] text-[#8A1C2E] shadow-sm'
                      : 'text-[#68514A] hover:text-[#2B181A]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day Cards */}
        <div className="mt-10 space-y-8">
          {filteredDays.map((day) => (
            <CeremonyDayBlock key={day.id} day={day} />
          ))}
        </div>
      </div>
    </section>
  );
}
