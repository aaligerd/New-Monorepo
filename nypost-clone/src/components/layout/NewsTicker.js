"use client";

import Link from "next/link";

const TICKER_ITEMS = [
  { label: "Japan bans Indian mango imports after 20 years over pest-control concerns", href: "/business/japan-bans-indian-mango-imports-after-20-years-over-pest-control-concerns" },
  { label: "Iran trolls Donald Trump with Minions-style video over Hormuz, sparks buzz", href: "/world/iran-trolls-donald-trump-with-minions-style-video-over-hormuz-sparks-global-buzz" },
  { label: "Canada makes immigration easier but costlier - key changes explained", href: "/world/canada-makes-immigration-easier-but-costlier-key-changes-explained" },
  { label: "West Bengal raises age ceiling for Group A, B, C and D state posts", href: "/west-bengal/west-bengal-raises-age-ceiling-for-group-a-b-c-and-d-state-posts" },
  { label: "Annapurna Yojana form fill-up begins June 1: What beneficiaries must know", href: "/west-bengal/annapurna-yojana-form-fill-up-begins-june-1-heres-what-lakshmir-bhandar-beneficiaries-must-know" },
];

export default function NewsTicker() {
  return (
    <div className="bg-white border-b border-zinc-200 flex items-stretch overflow-hidden h-9 font-sans select-none">
      {/* Label */}
      <div className="flex-shrink-0 bg-[#f99d1b] text-black flex items-center px-4 font-black text-xs uppercase tracking-widest">
        BREAKING
      </div>

      {/* Scrolling track */}
      <div className="relative flex-1 overflow-hidden flex items-center bg-zinc-50">
        <div className="ticker-track flex items-center gap-8">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-2.5 text-xs font-bold text-zinc-800">
              <span className="text-[#f99d1b] select-none">*</span>
              <Link
                href={item.href}
                className="hover:text-[#f99d1b] hover:underline transition-colors whitespace-nowrap"
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
