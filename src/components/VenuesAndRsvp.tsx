import { Check, Copy, ExternalLink, Heart, MapPin, Send } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';
import {
  COUPLE,
  INITIAL_BLESSINGS,
  VENUES,
  type BlessingEntry,
} from '../data/weddingData';
import { LotusDivider } from './FloralOrnaments';

const STORAGE_KEY = 'aditya_srishti_blessings_v1';

export function VenuesAndRsvp() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [blessings, setBlessings] = useState<BlessingEntry[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as BlessingEntry[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to initial blessings
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
      // Ignore storage quota errors
    }
  }, [blessings]);

  async function handleCopyAddress(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    }
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

  return (
    <>
      {/* SECTION: VENUES */}
      <section
        id="venues"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-[#F4EFE4]/60 border-t border-[#B08438]/20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-medium text-[#8A1C2E]">दिशा-निर्देश</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-[#2B181A] [text-wrap:balance]">
              प्रमुख आयोजन स्थल
            </h2>
            <p className="mt-3 text-base text-[#68514A]">
              पुणे एवं राँची के सभी समारोह स्थलों का पता एवं मानचित्र मार्गदर्शन।
            </p>
            <LotusDivider className="mt-5" />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {VENUES.map((venue) => {
              const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                venue.mapsQuery,
              )}`;
              const isCopied = copiedId === venue.id;

              return (
                <article
                  key={venue.id}
                  className="bg-[#FFFDF9] border border-[#B08438]/30 rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#8A1C2E]">
                      <span>{venue.city}</span>
                      <MapPin className="w-4 h-4 text-[#B08438]" />
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-[#2B181A]">
                      {venue.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#68514A]">{venue.address}</p>
                    <p className="mt-4 pt-4 border-t border-[#B08438]/20 text-sm text-[#4A3531] leading-relaxed">
                      {venue.eventsSummary}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2.5">
                    <a
                      href={mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-ui font-medium text-[#FFFDF9] bg-[#8A1C2E] hover:bg-[#721524] rounded-md transition-colors whitespace-nowrap"
                    >
                      <span>मानचित्र खोलें</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopyAddress(venue.id, `${venue.name}, ${venue.address}`)
                      }
                      aria-label={`${venue.name} का पता कॉपी करें`}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-ui font-medium text-[#2B181A] bg-[#F4EFE4] hover:bg-[#EAE1CE] border border-[#B08438]/30 rounded-md transition-colors whitespace-nowrap shrink-0"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#2F6844]" />
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
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION: RSVP, BLESSINGS & VINEET */}
      <section id="rsvp" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FBF8F2] border-t border-[#B08438]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-6 bg-[#FFFDF9] border border-[#B08438]/30 rounded-2xl p-6 sm:p-9">
              <p className="text-sm font-medium text-[#8A1C2E]">सस्नेह उपस्थिति एवं आशीर्वाद</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#2B181A]">
                शुभकामनाएँ एवं उपस्थिति संदेश
              </h2>
              <p className="mt-2 text-sm text-[#68514A] leading-relaxed">
                आयुष्मान आदित्य एवं आयुष्मती सृष्टि के लिए अपने आशीर्वचन लिखें और अपनी उपस्थिति की सूचना दें।
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <div>
                  <label
                    htmlFor="guest-name"
                    className="block text-sm font-medium text-[#2B181A] mb-1.5"
                  >
                    आपका शुभ नाम
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="उदा. श्री मोहन शर्मा एवं परिवार"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF8F2] border border-[#B08438]/35 rounded-lg text-[#2B181A] placeholder:text-[#9A857B] focus:outline-none focus:border-[#8A1C2E]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="guest-city"
                      className="block text-sm font-medium text-[#2B181A] mb-1.5"
                    >
                      शहर / परिचय
                    </label>
                    <input
                      id="guest-city"
                      type="text"
                      value={relationOrCity}
                      onChange={(e) => setRelationOrCity(e.target.value)}
                      placeholder="उदा. राँची / मित्र"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FBF8F2] border border-[#B08438]/35 rounded-lg text-[#2B181A] placeholder:text-[#9A857B] focus:outline-none focus:border-[#8A1C2E]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guest-attending"
                      className="block text-sm font-medium text-[#2B181A] mb-1.5"
                    >
                      सम्मिलित होने वाला कार्यक्रम
                    </label>
                    <select
                      id="guest-attending"
                      value={attending}
                      onChange={(e) => setAttending(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FBF8F2] border border-[#B08438]/35 rounded-lg text-[#2B181A] focus:outline-none focus:border-[#8A1C2E]"
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
                </div>

                <div>
                  <label
                    htmlFor="guest-message"
                    className="block text-sm font-medium text-[#2B181A] mb-1.5"
                  >
                    आशीर्वाद / शुभकामना संदेश
                  </label>
                  <textarea
                    id="guest-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="नवदम्पति के सुखद एवं मंगलमय जीवन के लिए अपनी शुभकामनाएँ लिखें..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF8F2] border border-[#B08438]/35 rounded-lg text-[#2B181A] placeholder:text-[#9A857B] focus:outline-none focus:border-[#8A1C2E]"
                    required
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-[#8A1C2E] font-medium">
                    {error}
                  </p>
                )}

                {submitted && (
                  <p
                    role="status"
                    className="text-sm text-[#2F6844] bg-[#2F6844]/10 border border-[#2F6844]/25 rounded-lg px-3.5 py-2.5"
                  >
                    आपका स्नेहमयी आशीर्वाद सफलतापूर्वक दर्ज हो गया है। सादर धन्यवाद।
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-ui font-medium text-[#FFFDF9] bg-[#8A1C2E] hover:bg-[#721524] rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A1C2E]"
                >
                  <Send className="w-4 h-4" />
                  <span>शुभकामना भेजें</span>
                </button>
              </form>
            </div>

            {/* Blessings Wall + Vineet Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-[#FFFDF9] border border-[#B08438]/30 rounded-2xl p-6 sm:p-8 text-center">
                <p className="text-sm font-medium text-[#8A1C2E]">दर्शनाभिलाषी एवं विनीत</p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#2B181A]">
                  {COUPLE.hostFamily}
                </h3>
                <p className="mt-3 text-sm text-[#68514A] leading-relaxed max-w-md mx-auto">
                  कृपया पधारकर वर-वधू को स्नेहाशीष प्रदान करें एवं समारोह की शोभा बढ़ाएँ।
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#2B181A] flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#8A1C2E]" />
                  <span>परिवार एवं स्नेहीजनों के आशीर्वचन</span>
                </h3>

                <div className="space-y-3">
                  {blessings.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#FFFDF9] border border-[#B08438]/25 rounded-xl p-5"
                    >
                      <p className="text-sm sm:text-base text-[#2B181A] leading-relaxed">
                        “{item.message}”
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#68514A]">
                        <span className="font-semibold text-[#8A1C2E]">{item.name}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.relationOrCity}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.attending}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
