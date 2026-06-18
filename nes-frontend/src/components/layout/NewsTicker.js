"use client";

export default function NewsTicker({ newsTicker = "" }) {
  const items = newsTicker
    ? newsTicker.split("|").map(s => s.trim()).filter(Boolean)
    : [
        "Fake News: Trump rejects reports of $300 million payout to Iran",
        "Rain, strong winds sweep Delhi; IMD predicts thunderstorms and showers today",
        "Government raises export tax on diesel and ATF amid Middle East tensions",
        "US Air Force B-52 bomber crashes in California"
      ];

  const repeatCount = Math.max(2, Math.ceil(10 / items.length));
  const baseList = Array(repeatCount).fill(items).flat();

  return (
    <div className="bg-[#b91c1c] flex items-stretch overflow-hidden h-8 font-sans select-none">
      {/* Scrolling track */}
      <div className="relative flex-1 overflow-hidden flex items-center">
        <div 
          className="ticker-track flex items-center"
          style={{ animationDuration: "300s" }}
        >
          {/* First Copy */}
          <div className="flex items-center gap-8 pr-8">
            {baseList.map((item, i) => (
              <span key={`copy1-${i}`} className="flex items-center gap-4 text-[11px] sm:text-xs font-bold text-white">
                <span className="text-[#f99d1b] font-black select-none text-base">|</span>
                <span className="whitespace-nowrap">
                  {item}
                </span>
              </span>
            ))}
          </div>
          {/* Second Copy */}
          <div className="flex items-center gap-8 pr-8">
            {baseList.map((item, i) => (
              <span key={`copy2-${i}`} className="flex items-center gap-4 text-[11px] sm:text-xs font-bold text-white">
                <span className="text-[#f99d1b] font-black select-none text-base">|</span>
                <span className="whitespace-nowrap">
                  {item}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
