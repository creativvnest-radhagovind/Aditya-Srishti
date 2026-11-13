import { Calendar, Home } from 'lucide-react';
import { useState } from 'react';
import { MANGLIK_RITUALS } from '../data/weddingData';
import { LotusDivider } from './FloralOrnaments';

export function ManglikSection() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="manglik" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FBF8F2]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left: Botanical Flatlay Photography */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[280px] rounded-2xl overflow-hidden border border-[#B08438]/35 bg-[#F4EFE4]">
              {!imgFailed ? (
                <img
                  src="/src/assets/images/floral_wedding_backdrop_1794565464689.jpg"
                  alt="पुष्पों एवं पारंपरिक मोहर से सज्जित शुभ विवाह निमंत्रण पत्र"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#FBF5EA] to-[#EDE2CF] flex items-center justify-center p-8 text-center">
                  <p className="text-lg font-medium text-[#8A1C2E]">
                    {MANGLIK_RITUALS.heading}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Manglik Rituals Editorial Block */}
          <div className="lg:col-span-7 bg-[#FFFDF9] border border-[#B08438]/30 rounded-2xl p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-[#8A1C2E]">पारिवारिक मांगलिक अनुष्ठान</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-[#2B181A] [text-wrap:balance]">
                {MANGLIK_RITUALS.heading}
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#4A3531]">
                <span className="inline-flex items-center gap-2 font-medium text-[#2B181A]">
                  <Calendar className="w-4 h-4 text-[#8A1C2E] shrink-0" />
                  <span>{MANGLIK_RITUALS.dates}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Home className="w-4 h-4 text-[#B08438] shrink-0" />
                  <span>स्थान: {MANGLIK_RITUALS.venue}</span>
                </span>
              </div>

              <LotusDivider className="my-6 justify-start" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {MANGLIK_RITUALS.rituals.map((ritual, idx) => (
                  <div
                    key={ritual.name}
                    className="pb-4 border-b border-[#B08438]/20 last:border-b-0 sm:last:border-b"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display text-sm font-semibold text-[#B08438] tabular-nums">
                        0{idx + 1}.
                      </span>
                      <h3 className="text-xl font-semibold text-[#2B181A]">
                        {ritual.name}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm text-[#68514A] leading-relaxed">
                      {ritual.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 pt-4 border-t border-[#B08438]/20 text-sm text-[#68514A]">
              समस्त पारिवारिक रस्में घर के पावन आँगन में स्नेहीजनों की उपस्थिति में सम्पन्न होंगी।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
