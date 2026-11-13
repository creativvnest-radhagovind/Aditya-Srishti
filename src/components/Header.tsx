import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '#invitation', label: 'निमंत्रण' },
  { href: '#ceremonies', label: 'कार्यक्रम' },
  { href: '#timeline', label: 'समय-सारिणी' },
  { href: '#manglik', label: 'मांगलिक' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FCFBF8]/92 backdrop-blur-md border-b border-[#4D5736]/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line wordmark */}
        <a
          href="#invitation"
          className="font-devanagari text-lg font-semibold tracking-tight text-[#2C3126] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4D5736]"
        >
          आदित्य · सृष्टि
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav
          aria-label="मुख्य नेविगेशन"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5F6655]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#4D5736] hover:text-[#2C3126] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4D5736]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#rsvp"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-ui font-medium text-[#FCFBF8] bg-[#4D5736] hover:bg-[#3D462A] rounded transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4D5736]"
          >
            RSVP एवं शुभकामनाएँ
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded text-[#2C3126] hover:bg-[#4D5736]/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#4D5736]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#4D5736]/15 bg-[#FCFBF8] px-4 py-4">
          <nav aria-label="मोबाइल नेविगेशन" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-[#2C3126] hover:text-[#4D5736] hover:bg-[#E2EBE3]/50 rounded transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#rsvp"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-4 py-2.5 text-sm font-ui font-medium text-[#FCFBF8] bg-[#4D5736] rounded"
            >
              RSVP एवं शुभकामनाएँ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
