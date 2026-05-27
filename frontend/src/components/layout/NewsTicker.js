"use client";
// src/components/layout/NewsTicker.js
// Scrolls latest headlines. In production, fetch from your BFF.

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
    <div className="bg-white border-b border-gray-200 flex items-stretch overflow-hidden h-9">
      {/* Label */}
      <div className="flex-shrink-0 bg-red-700 text-white flex items-center px-4">
        <span className="section-label text-white tracking-widest whitespace-nowrap">
          Latest
        </span>
      </div>

      {/* Scrolling track */}
      <div className="relative flex-1 overflow-hidden flex items-center">
        <div className="ticker-track flex items-center gap-8">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-sm text-gray-700">
              <span className="text-red-600 font-bold select-none">◆</span>
              <Link
                href={item.href}
                className="hover:text-red-700 hover:underline transition-colors whitespace-nowrap"
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