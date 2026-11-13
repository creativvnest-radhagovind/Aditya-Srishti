import {
  CalendarPlus,
  Check,
  Copy,
  ExternalLink,
  Heart,
  MapPin,
  Send,
} from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';
import {
  CEREMONY_DAYS,
  COUPLE,
  INITIAL_BLESSINGS,
  MANGLIK_RITUALS,
  VENUES,
  downloadWeddingCalendarICS,
  type BlessingEntry,
} from '../data/weddingData';
import {
  EucalyptusCornerSprig,
  EucalyptusHorizontalSprig,
  EucalyptusSideSprig,
  TimelineIcon,
  TornPaperEdge,
} from './BotanicalEucalyptus';
import { CountdownTimer } from './CountdownTimer';

const STORAGE_KEY = 'aditya_srishti_blessings_v1';

type CityFilter = 'all' | 'pune' | 'ranchi';

const TIMELINE_ITEMS: {
  id: string;
  time: string;
  title: string;
  sub: string;
  icon: 'tilak' | 'mehendi' | 'sangeet' | 'haldi' | 'vivah' | 'reception';
}[] = [
  {
    id: 'tl-tilak',
    time: '11:00 AM · 17 जनवरी',
    title: 'शुभ तिलक',
    sub: 'The Altruist Wagholi Hotel, पुणे',
    icon: 'tilak',
  },
  {
    id: 'tl-mehendi',
    time: '11:30 AM · 17 जनवरी',
    title: 'मेहंदी (Dress Code: Green)',
    sub: 'The Altruist Wagholi Hotel, पुणे',
    icon: 'mehendi',
  },
  {
    id: 'tl-sangeet',
    time: '6:30 PM · 17 जनवरी',
    title: 'Ring Ceremony एवं संगीत',
    sub: 'Seasons 24 Banquets, Wagholi, Pune',
    icon: 'sangeet',
  },
  {
    id: 'tl-haldi',
    time: '11:00 AM · 18 जनवरी',
    title: 'हल्दी (Dress Code: पीला)',
    sub: 'The Altruist Wagholi Hotel, पुणे',
    icon: 'haldi',
  },
  {
    id: 'tl-vivah',
    time: '7:00 PM · 18 जनवरी',
    title: 'बारात एवं शुभ विवाह',
    sub: 'The Altruist Wagholi Hotel से प्रस्थान',
    icon: 'vivah',
  },
  {
    id: 'tl-reception',
    time: '7:30 PM · 21 जनवरी',
    title: 'स्वागत समारोह (प्रीतिभोज)',
    sub: 'Hotel Marriott, Kanke Road, Ranchi',
    icon: 'reception',
  },
];

function PhotoBand({
  src,
  alt,
  bottomEdgeFill = '#FCFBF8',
  topEdgeFill = '#FCFBF8',
  hideTopEdge = false,
  hideBottomEdge = false,
}: {
  src: string;
  alt: string;
  bottomEdgeFill?: string;
  topEdgeFill?: string;
  hideTopEdge?: boolean;
  hideBottomEdge?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-full overflow-hidden bg-[#E2EBE3]">
      {!hideTopEdge && (
        <div className="relative z-10 -mb-px">
          <TornPaperEdge position="top" fill={topEdgeFill} />
        </div>
      )}

      <div className="aspect-[16/10] w-full overflow-hidden">
        {!failed ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#DCE6DC] to-[#C8D5C6] flex items-center justify-center p-6 text-center text-sm text-[#4D5736]">
            {alt}
          </div>
        )}
      </div>

      {!hideBottomEdge && (
        <div className="relative z-10 -mt-6 sm:-mt-8">
          <TornPaperEdge position="bottom" fill={bottomEdgeFill} />
        </div>
      )}
    </div>
  );
}

export function BotanicalScrollCard() {
  const [cityFilter, setCityFilter] = useState<CityFilter>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [blessings, setBlessings] = useState<BlessingEntry[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as BlessingEntry[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to curated blessings
    }
    return INITIAL_BLESSINGS;
  });

  const [name, setName] = useState('');
  const [relationOrCity, setRelationOrCity] = useState('');
  const [attending, setAttending] = useState('पुणे कार्यक्रम (17–18 जनवरी)');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(blessings));
    } catch {
      // Ignore quota errors
    }
  }, [blessings]);

  async function handleCopyAddress(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Ignore clipboard failures
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2000);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    if (name.trim().length < 2) {
      setError('कृपया अपना शुभ नाम दर्ज करें।');
      return;
    }

    if (message.trim().length < 4) {
      setError('कृपया वर-वधू के लिए अपना आशीर्वाद या शुभकामना संदेश लिखें।');
      return;
    }

    const newEntry: BlessingEntry = {
      id: `b-${Date.now()}`,
      name: name.trim(),
      relationOrCity: relationOrCity.trim() || 'स्नेही अतिथि',
      attending,
      message: message.trim(),
      createdAt: 'अभी प्रेषित',
    };

    setBlessings((prev) => [newEntry, ...prev]);
    setName('');
    setRelationOrCity('');
    setMessage('');
    setSubmitted(true);
  }

  const filteredDays = CEREMONY_DAYS.filter((day) =>
    cityFilter === 'all' ? true : day.cityTag === cityFilter,
  );

  return (
    <div className="max-w-[640px] mx-auto bg-[#FCFBF8] text-[#2C3126] shadow-[0_32px_90px_-24px_rgba(32,38,22,0.42)] overflow-hidden relative">
      {/* 1. TOP INVITATION COVER & MONOGRAM */}
      <section id="invitation" className="relative pt-14 sm:pt-20 pb-10 px-6 sm:px-12 text-center">
        {/* Top-Right Cascading Watercolor Eucalyptus Sprig */}
        <EucalyptusCornerSprig className="absolute -top-2 -right-3 w-44 sm:w-56 h-auto pointer-events-none select-none" />

        <div className="relative z-10 max-w-md mx-auto">
          <p className="text-xs sm:text-sm font-medium text-[#5F6655] tracking-wide">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <p className="mt-2 text-xs sm:text-sm text-[#5F6655] leading-relaxed">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
            <br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
          </p>

          {/* Split Monogram A | S */}
          <div className="mt-8 mb-3 flex items-center justify-center gap-4">
            <span className="font-display text-5xl sm:text-6xl font-normal text-[#4D5736] leading-none">
              A
            </span>
            <span
              aria-hidden="true"
              className="h-12 w-px bg-[#A6884E]/75"
            />
            <span className="font-display text-5xl sm:text-6xl font-normal text-[#A6884E] leading-none">
              S
            </span>
          </div>

          <p className="font-ui text-xs sm:text-sm tracking-[0.22em] text-[#5F6655] uppercase">
            शुभ विवाह · SHUBH VIVAH
          </p>
        </div>
      </section>

      {/* 2. TORN-PAPER EDITORIAL BOTANICAL PHOTO BAND */}
      <PhotoBand
        src="/src/assets/images/floral_wedding_backdrop_1794565464689.jpg"
        alt="पुष्पों एवं मोहर से सज्जित शुभ विवाह निमंत्रण"
      />

      {/* 3. FAMILY BLESSINGS, COUPLE LOCKUP & ARCHITECTURAL DATE */}
      <section className="relative px-6 sm:px-12 pt-6 pb-12 text-center">
        {/* Side Eucalyptus Sprigs flanking Couple Names */}
        <EucalyptusSideSprig className="hidden sm:block absolute right-0 top-40 w-24 h-auto pointer-events-none opacity-90" />
        <EucalyptusSideSprig
          flip
          className="hidden sm:block absolute left-0 top-56 w-24 h-auto pointer-events-none opacity-90"
        />

        <div className="relative z-10 max-w-md mx-auto">
          <p className="text-xs sm:text-sm text-[#5F6655] leading-relaxed">
            परमपिता परमेश्वर की असीम कृपा एवं हमारे बड़ों के स्नेहमयी आशीर्वाद से
          </p>

          <div className="mt-4">
            <p className="text-xs font-ui tracking-wider text-[#5F6655]">विनीत</p>
            <p className="mt-0.5 text-base sm:text-lg font-semibold text-[#4D5736]">
              {COUPLE.hostFamily}
            </p>
          </div>

          {/* Couple Names in Graceful Calligraphic Hierarchy */}
          <div className="my-8 space-y-1">
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#2C3126] leading-tight">
              {COUPLE.groomHi}
            </h1>
            <p className="font-display italic text-xl text-[#A6884E] py-1">
              weds
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#2C3126] leading-tight">
              {COUPLE.brideHi}
            </h2>
            <p className="pt-2 font-display italic text-lg text-[#5F6655]">
              {COUPLE.groomEn} &amp; {COUPLE.brideEn}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#5F6655]">
            आपको इस पावन परिणय उत्सव में सपरिवार सादर आमंत्रित करते हैं
          </p>

          {/* Architectural Date Lockup (Mirroring Reference Layout) */}
          <div className="mt-8 mb-7">
            <p className="text-sm font-medium tracking-[0.2em] text-[#5F6655]">
              जनवरी · JANUARY
            </p>
            <div className="mt-2 flex items-center justify-center gap-4 sm:gap-6">
              <div className="flex-1 border-y border-[#4D5736]/30 py-1.5 text-xs sm:text-sm font-medium tracking-wider text-[#2C3126]">
                सोमवार
              </div>
              <div className="font-display text-5xl sm:text-6xl font-medium text-[#4D5736] tabular-nums leading-none px-1">
                18
              </div>
              <div className="flex-1 border-y border-[#4D5736]/30 py-1.5 font-display text-base sm:text-lg font-medium tracking-widest text-[#2C3126] tabular-nums">
                2027
              </div>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm text-[#5F6655]">
              15 से 21 जनवरी 2027 · पुणे एवं राँची
            </p>
          </div>

          <CountdownTimer />

          <div className="mt-5">
            <button
              type="button"
              onClick={downloadWeddingCalendarICS}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 text-xs sm:text-sm font-ui font-medium text-[#4D5736] border border-[#4D5736]/35 hover:bg-[#E2EBE3]/55 rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#4D5736]"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>कैलेंडर में जोड़ें (.ics)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. CEREMONY & VENUE DETAILS (DARK OLIVE ACTION BUTTONS) */}
      <section
        id="ceremonies"
        className="px-6 sm:px-12 py-10 border-t border-[#4D5736]/15 text-center"
      >
        <p className="text-xs font-ui tracking-[0.18em] text-[#5F6655] uppercase">
          कार्यक्रम एवं आयोजन स्थल
        </p>

        {/* Filter Tabs */}
        <div className="mt-4 inline-flex flex-wrap justify-center gap-1 p-1 bg-[#E2EBE3]/70 rounded border border-[#4D5736]/15">
          {[
            { id: 'all' as const, label: 'सभी कार्यक्रम' },
            { id: 'pune' as const, label: 'पुणे · 17–18 जनवरी' },
            { id: 'ranchi' as const, label: 'राँची · 21 जनवरी' },
          ].map((tab) => {
            const active = cityFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCityFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-ui font-medium rounded transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-[#4D5736] text-[#FCFBF8]'
                    : 'text-[#5F6655] hover:text-[#2C3126]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Day-by-Day Centered Editorial Blocks */}
        <div className="mt-8 space-y-10">
          {filteredDays.map((day) => (
            <div
              key={day.id}
              className="pb-8 border-b border-[#4D5736]/15 last:border-b-0 last:pb-0"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-[#4D5736]">
                {day.dateLabelHi}
              </h3>
              <p className="font-display italic text-sm text-[#5F6655] mt-0.5">
                {day.dateLabelEn}
              </p>

              <div className="mt-6 space-y-6 max-w-md mx-auto">
                {day.events.map((ev) => {
                  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    ev.venue,
                  )}`;
                  return (
                    <div key={ev.id} className="space-y-1.5">
                      <p className="text-xs font-ui font-semibold tracking-wide text-[#5F6655] tabular-nums">
                        {ev.time}
                      </p>
                      <h4 className="text-lg sm:text-xl font-semibold text-[#2C3126]">
                        {ev.title}
                      </h4>
                      <p className="text-sm text-[#5F6655]">{ev.venue}</p>

                      {ev.dressCode && (
                        <div className="pt-1 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#2C3126]">
                          <span
                            aria-hidden="true"
                            className="w-3 h-3 rounded-xs border border-black/20 shrink-0"
                            style={{ backgroundColor: ev.dressCode.swatchHex }}
                          />
                          <span>
                            Dress Code: <strong>{ev.dressCode.label}</strong>
                          </span>
                        </div>
                      )}

                      {ev.note && (
                        <p className="mt-2 text-xs sm:text-sm text-[#4D5736] bg-[#E2EBE3]/55 border border-[#4D5736]/20 rounded px-3.5 py-2 leading-relaxed">
                          {ev.note}
                        </p>
                      )}

                      <div className="pt-2">
                        <a
                          href={mapHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-2 text-xs font-ui font-medium tracking-wider text-[#FCFBF8] bg-[#4D5736] hover:bg-[#3D462A] rounded transition-colors"
                        >
                          <span>स्थान देखें</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SIGNATURE SAGE WATERCOLOR WASH VERTICAL TIMELINE */}
      <section id="timeline" className="relative">
        <div className="relative z-10 -mb-px">
          <TornPaperEdge position="top" fill="#FCFBF8" />
        </div>

        <div className="bg-sage-watercolor px-6 sm:px-12 py-10 sm:py-12">
          <h3 className="text-center text-sm sm:text-base font-ui font-medium tracking-[0.2em] text-[#2C3126] mb-8">
            कार्यक्रम समय-सारिणी
          </h3>

          <div className="relative max-w-md mx-auto">
            {/* Vertical Center Axis */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-[#4D5736]/35"
            />

            <div className="space-y-6">
              {TIMELINE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="relative grid grid-cols-[1fr_20px_1fr] items-center gap-3"
                >
                  {/* Left: Delicate Line Icon */}
                  <div className="flex justify-end pr-3">
                    <TimelineIcon type={item.icon} />
                  </div>

                  {/* Center Axis Dot */}
                  <div className="flex justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#4D5736]" />
                  </div>

                  {/* Right: Time & Ceremony Title */}
                  <div className="pl-3 text-left">
                    <p className="text-[11px] font-ui font-medium text-[#5F6655] tabular-nums">
                      {item.time}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-[#2C3126] leading-snug">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-[#5F6655] leading-snug mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-6 sm:-mt-8">
          <TornPaperEdge position="bottom" fill="#FCFBF8" />
        </div>
      </section>

      {/* 6. MANGLIK KARYAKRAM (RANCHI) — FRAMED HIGHLIGHT BLOCK */}
      <section id="manglik" className="relative px-6 sm:px-12 py-10 text-center">
        <EucalyptusSideSprig className="hidden sm:block absolute -right-2 top-8 w-20 h-auto pointer-events-none opacity-80" />

        <div className="relative z-10 max-w-md mx-auto">
          <p className="text-xs font-ui tracking-[0.18em] text-[#5F6655]">
            पारिवारिक मांगलिक अनुष्ठान
          </p>
          <h3 className="mt-1.5 text-2xl sm:text-3xl font-semibold text-[#2C3126]">
            {MANGLIK_RITUALS.heading}
          </h3>

          {/* Framed Date Box echoing the Reference Card */}
          <div className="mt-5 inline-block border border-[#4D5736]/35 rounded px-6 py-3 bg-[#FCFBF8]">
            <p className="text-base sm:text-lg font-semibold text-[#4D5736]">
              {MANGLIK_RITUALS.dates}
            </p>
            <p className="mt-0.5 text-xs sm:text-sm text-[#5F6655]">
              स्थान: {MANGLIK_RITUALS.venue}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-left">
            {MANGLIK_RITUALS.rituals.map((ritual) => (
              <div
                key={ritual.name}
                className="border border-[#4D5736]/20 rounded p-3.5 bg-[#FCFBF8]"
              >
                <p className="text-base font-semibold text-[#2C3126]">
                  {ritual.name}
                </p>
                <p className="mt-1 text-xs text-[#5F6655] leading-relaxed">
                  {ritual.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Haldi Marigold Floral Detail Photo */}
          <div className="mt-7 rounded-lg overflow-hidden border border-[#4D5736]/20 aspect-[4/3]">
            <img
              src="/src/assets/images/haldi_marigold_floral_1794565465321.jpg"
              alt="मांगलिक हल्दी, ताजे गेंदे के फूल और पारंपरिक पूजन सामग्री"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 7. QUICK VENUE DIRECTORY WITH COPY ADDRESS */}
      <section className="px-6 sm:px-12 py-8 border-t border-[#4D5736]/15 text-center">
        <p className="text-xs font-ui tracking-[0.18em] text-[#5F6655]">
          प्रमुख आयोजन स्थलों के पते
        </p>

        <div className="mt-5 space-y-3 max-w-md mx-auto text-left">
          {VENUES.map((venue) => {
            const isCopied = copiedId === venue.id;
            return (
              <div
                key={venue.id}
                className="flex items-center justify-between gap-3 border border-[#4D5736]/20 rounded p-3.5 bg-[#FCFBF8]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#4D5736]">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{venue.city}</span>
                  </div>
                  <p className="mt-0.5 text-sm font-semibold text-[#2C3126] truncate">
                    {venue.name}
                  </p>
                  <p className="text-xs text-[#5F6655] truncate">{venue.address}</p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopyAddress(venue.id, `${venue.name}, ${venue.address}`)
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-ui font-medium text-[#4D5736] bg-[#E2EBE3]/70 hover:bg-[#E2EBE3] rounded transition-colors whitespace-nowrap shrink-0"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>कॉपी हुआ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>पता कॉपी</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. RSVP, BLESSINGS & VINEET SIGNATURE */}
      <section
        id="rsvp"
        className="px-6 sm:px-12 pt-8 pb-10 border-t border-[#4D5736]/15 text-center"
      >
        <div className="max-w-md mx-auto">
          <p className="text-xs font-ui tracking-[0.18em] text-[#5F6655]">
            सस्नेह पुष्टि एवं आशीर्वाद
          </p>
          <h3 className="mt-1.5 text-2xl font-semibold text-[#2C3126]">
            शुभकामनाएँ एवं उपस्थिति संदेश
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#5F6655] leading-relaxed">
            कृपया अपनी उपस्थिति की सूचना एवं वर-वधू के लिए स्नेहमयी आशीर्वाद प्रेषित करें।
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3 text-left" noValidate>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="आपका शुभ नाम (उदा. श्री मोहन शर्मा एवं परिवार)"
              aria-label="आपका शुभ नाम"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FCFBF8] border border-[#4D5736]/30 rounded text-[#2C3126] placeholder:text-[#8E9584] focus:outline-none focus:border-[#4D5736]"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={relationOrCity}
                onChange={(e) => setRelationOrCity(e.target.value)}
                placeholder="शहर / परिचय"
                aria-label="शहर या परिचय"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FCFBF8] border border-[#4D5736]/30 rounded text-[#2C3126] placeholder:text-[#8E9584] focus:outline-none focus:border-[#4D5736]"
              />
              <select
                value={attending}
                onChange={(e) => setAttending(e.target.value)}
                aria-label="सम्मिलित होने वाला कार्यक्रम"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FCFBF8] border border-[#4D5736]/30 rounded text-[#2C3126] focus:outline-none focus:border-[#4D5736]"
              >
                <option value="पुणे कार्यक्रम (17–18 जनवरी)">
                  पुणे कार्यक्रम (17–18 जनवरी)
                </option>
                <option value="राँची प्रीतिभोज (21 जनवरी)">
                  राँची प्रीतिभोज (21 जनवरी)
                </option>
                <option value="पुणे एवं राँची दोनों कार्यक्रम">
                  पुणे एवं राँची दोनों कार्यक्रम
                </option>
                <option value="सस्नेह शुभकामनाएँ प्रेषित">
                  सस्नेह शुभकामनाएँ प्रेषित
                </option>
              </select>
            </div>

            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="आयुष्मान आदित्य एवं आयुष्मती सृष्टि के लिए शुभकामना संदेश लिखें..."
              aria-label="शुभकामना संदेश"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FCFBF8] border border-[#4D5736]/30 rounded text-[#2C3126] placeholder:text-[#8E9584] focus:outline-none focus:border-[#4D5736]"
              required
            />

            {error && (
              <p role="alert" className="text-xs text-[#8A1C2E] font-medium">
                {error}
              </p>
            )}

            {submitted && (
              <p
                role="status"
                className="text-xs text-[#2F6844] bg-[#E2EBE3] border border-[#4D5736]/25 rounded px-3 py-2"
              >
                आपका आशीर्वाद सफलतापूर्वक दर्ज हो गया है। सादर धन्यवाद।
              </p>
            )}

            <div className="pt-1 text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-8 py-2.5 text-xs sm:text-sm font-ui font-medium tracking-wider text-[#FCFBF8] bg-[#4D5736] hover:bg-[#3D462A] rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4D5736]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>शुभकामना भेजें</span>
              </button>
            </div>
          </form>

          {/* Recent Blessings */}
          <div className="mt-8 pt-6 border-t border-[#4D5736]/15 text-left space-y-3">
            <p className="text-xs font-ui font-medium text-[#5F6655] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#4D5736]" />
              <span>स्नेहीजनों के आशीर्वचन</span>
            </p>
            {blessings.slice(0, 4).map((b) => (
              <div
                key={b.id}
                className="border border-[#4D5736]/15 rounded p-3.5 bg-[#FCFBF8]"
              >
                <p className="text-xs sm:text-sm text-[#2C3126] leading-relaxed">
                  “{b.message}”
                </p>
                <p className="mt-1.5 text-[11px] text-[#5F6655]">
                  <strong className="text-[#4D5736]">{b.name}</strong> ·{' '}
                  {b.relationOrCity} · {b.attending}
                </p>
              </div>
            ))}
          </div>

          {/* Horizontal Eucalyptus Sprig & Closing Host Family Signature */}
          <div className="mt-8 flex flex-col items-center">
            <EucalyptusHorizontalSprig className="w-44 h-auto mb-3" />
            <p className="text-xs text-[#5F6655]">आपकी उपस्थिति की प्रतीक्षा में</p>
            <p className="mt-1 text-lg sm:text-xl font-semibold text-[#4D5736]">
              विनीत: {COUPLE.hostFamily}
            </p>
            <p className="mt-1 text-xs text-[#5F6655]">सस्नेह धन्यवाद</p>
          </div>
        </div>
      </section>

      {/* 9. CLOSING DECKLED-EDGE FLORAL RECEPTION IMAGE */}
      <PhotoBand
        src="/src/assets/images/reception_floral_candlelight_1794565465749.jpg"
        alt="पुष्प एवं दीपों से सज्जित स्वागत समारोह"
        hideBottomEdge
      />
    </div>
  );
}
