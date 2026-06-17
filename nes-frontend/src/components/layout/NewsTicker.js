"use client";

import Link from "next/link";

const TICKER_ITEMS = [
  { label: "Fake News: Trump rejects reports of $300 million payout to Iran", href: "/world/fake-news-trump-rejects-reports" },
  { label: "Rain, strong winds sweep Delhi; IMD predicts thunderstorms and showers today", href: "/india/rain-strong-winds-sweep-delhi" },
  { label: "Government raises export tax on diesel and ATF amid Middle East tensions", href: "/business/government-raises-export-tax" },
  { label: "US Air Force B-52 bomber crashes in California", href: "/world/us-air-force-b52-bomber-crashes" },
];

export default function NewsTicker() {
  return (
    <div className="bg-[#b91c1c] flex items-stretch overflow-hidden h-8 font-sans select-none">
      {/* Scrolling track */}
      <div className="relative flex-1 overflow-hidden flex items-center">
        <div className="ticker-track flex items-center gap-8">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-4 text-[11px] sm:text-xs font-bold text-white">
              <span className="text-[#f99d1b] font-black select-none text-base">|</span>
              <Link
                href={item.href}
                className="hover:text-zinc-200 transition-colors whitespace-nowrap"
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
