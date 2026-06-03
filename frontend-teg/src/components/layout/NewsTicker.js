"use client";

import Link from "next/link";

const TICKER_ITEMS = [
  { label: "India expresses concern after 303 killed in one day in Lebanon", href: "/india/india-lebanon-concern" },
  { label: "Artemis II crew set for space suit obstacle course within hours of return", href: "/technology/artemis-ii-obstacle-course" },
  { label: "Humayun Kabir rejects BJP 'deal' claim, calls sting operation AI-generated", href: "/west-bengal/humayun-kabir-bjp-deal" },
  { label: "PSG beat Liverpool 2-0 to stay on track in Champions League", href: "/sports/psg-liverpool-champions-league" },
  { label: "Ranveer Singh's Dhurandhar 2 OTT debut delayed indefinitely", href: "/entertainment/dhurandhar-2-ott-delay" },
];

export default function NewsTicker() {
  return (
    <div className="bg-canvas border-b-[3px] border-brutal-black flex items-stretch overflow-hidden h-10 select-none">
      {/* Label */}
      <div className="flex-shrink-0 bg-accent-coral text-canvas font-brutal uppercase text-xs font-black flex items-center px-4 border-r-[3px] border-brutal-black">
        BREAKING
      </div>

      {/* Scrolling track */}
      <div className="relative flex-1 overflow-hidden flex items-center bg-accent-orange/10">
        <div className="ticker-track flex items-center gap-12">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-4 text-xs font-bold tracking-tight text-brutal-black/90">
              <span className="text-accent-coral font-black select-none text-base">★</span>
              <Link
                href={item.href}
                className="hover:underline transition-all whitespace-nowrap"
              >
                {item.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
