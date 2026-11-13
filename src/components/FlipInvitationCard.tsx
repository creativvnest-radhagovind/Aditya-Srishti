import { Eye, EyeOff, RotateCw } from 'lucide-react';
import { useState } from 'react';
import { COUPLE } from '../data/weddingData';
import { LotusDivider, MandalaCrest } from './FloralOrnaments';

interface FlipInvitationCardProps {
  isFlipped: boolean;
  onToggleFlip: () => void;
}

export function FlipInvitationCard({ isFlipped, onToggleFlip }: FlipInvitationCardProps) {
  const [showFamilyDetails, setShowFamilyDetails] = useState(true);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-full max-w-[440px] mx-auto">
      <div className="perspective-1200">
        <div
          className={`relative w-full aspect-[3/4] preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT FACE — Floral Botanical Framed Invitation */}
          <div
            onClick={onToggleFlip}
            role="button"
            tabIndex={0}
            aria-label="निमंत्रण पत्र पलटें — विनीत एवं कार्यक्रम विवरण देखने के लिए"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggleFlip();
              }
            }}
            className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-[#B08438]/45 bg-[#FFFDF9] shadow-[0_24px_60px_-20px_rgba(43,24,26,0.18)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A1C2E]"
          >
            {/* Background Watercolor Floral Card Art */}
            {!imgError ? (
              <img
                src="/src/assets/images/floral_card_frame_1794565464157.jpg"
                alt="पुष्प सज्जित पारंपरिक शुभ विवाह निमंत्रण पत्र"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5EA] via-[#FFFDF9] to-[#F4EBE0]" />
            )}

            {/* Soft Archival Center Veil for High-Contrast Readability */}
            <div
              aria-hidden="true"
              className="absolute inset-x-[10%] inset-y-[18%] rounded-xl bg-[#FFFDF9]/84 backdrop-blur-[2px] border border-[#B08438]/25"
            />

            {/* Front Card Typography */}
            <div className="relative z-10 h-full flex flex-col items-center justify-between px-8 py-10 text-center">
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center mb-2">
                  <MandalaCrest className="w-12 h-12 text-[#B08438]/75 animate-mandala-slow" />
                  <span className="absolute text-sm font-semibold text-[#8A1C2E]">ॐ</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#8A1C2E] tracking-wide">
                  ॥ श्री गणेशाय नमः ॥
                </p>
              </div>

              <div className="w-full px-3 py-2 flex flex-col items-center">
                <p className="text-sm font-medium text-[#68514A] tracking-wide">
                  शुभ विवाह
                </p>

                <h2 className="mt-2.5 text-2xl sm:text-3xl font-semibold text-[#2B181A] leading-snug">
                  {COUPLE.groomHi}
                </h2>
                <span className="my-1.5 font-display italic text-lg sm:text-xl text-[#8A1C2E]">
                  weds
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#2B181A] leading-snug">
                  {COUPLE.brideHi}
                </h2>

                <LotusDivider className="w-full my-4" />

                <p className="text-sm font-medium text-[#2B181A]">
                  सोमवार, 18 जनवरी 2027
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#68514A]">
                  पुणे · राँची
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-ui font-medium text-[#8A1C2E] bg-[#FFFDF9]/90 px-3.5 py-1.5 rounded-md border border-[#B08438]/35">
                <RotateCw className="w-3.5 h-3.5" />
                <span>कार्ड पलटें · विनीत विवरण</span>
              </div>
            </div>
          </div>

          {/* BACK FACE — Cordial Invitation, Family Details & Quick Overview */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-[#B08438]/45 bg-[#FFFDF9] shadow-[0_24px_60px_-20px_rgba(43,24,26,0.18)]">
            <div
              aria-hidden="true"
              className="absolute inset-3 rounded-xl border border-[#B08438]/35 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-4 rounded-lg border border-[#8A1C2E]/15 pointer-events-none"
            />

            <div className="relative z-10 h-full flex flex-col justify-between p-7 sm:p-9 text-center">
              <div>
                <p className="text-xs font-medium text-[#8A1C2E]">
                  वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
                </p>
                <p className="text-xs text-[#68514A] mt-0.5">
                  निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
                </p>
                <LotusDivider className="w-full my-4" />
                <h3 className="text-xl sm:text-2xl font-semibold text-[#2B181A]">
                  सस्नेह निमंत्रण
                </h3>
                <p className="mt-2.5 text-sm text-[#4A3531] leading-relaxed">
                  ईश्वर की असीम अनुकम्पा से आयुष्मान आदित्य एवं आयुष्मती सृष्टि के पावन परिणय उत्सव पर आपकी स्नेहमयी उपस्थिति एवं आशीर्वाद की सविनय प्रतीक्षा है।
                </p>
              </div>

              {/* Family & Privacy Detail Toggle (inspired by wadding-card) */}
              <div className="my-3 py-4 border-y border-[#B08438]/25">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-ui font-medium text-[#68514A]">
                    विनीत एवं प्रमुख स्थल
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFamilyDetails((prev) => !prev);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-ui font-medium text-[#8A1C2E] hover:underline focus-visible:outline-2 focus-visible:outline-[#8A1C2E]"
                  >
                    {showFamilyDetails ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>छिपाएँ</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>विवरण देखें</span>
                      </>
                    )}
                  </button>
                </div>

                <div
                  className={`transition-all duration-200 ${
                    showFamilyDetails ? 'opacity-100 blur-0' : 'opacity-40 blur-sm select-none'
                  }`}
                >
                  <p className="text-base sm:text-lg font-semibold text-[#8A1C2E]">
                    {COUPLE.hostFamily}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#4A3531]">
                    पुणे · The Altruist Wagholi Hotel एवं Seasons 24 Banquets
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm text-[#4A3531]">
                    राँची · निवास (घर) एवं Hotel Marriott, Kanke Road
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onToggleFlip}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-ui font-medium text-[#FFFDF9] bg-[#8A1C2E] hover:bg-[#721524] rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A1C2E]"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>मुख्य पृष्ठ देखें</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
