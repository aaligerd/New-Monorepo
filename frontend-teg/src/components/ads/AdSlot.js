"use client";

import { useState, useEffect } from "react";

export default function AdSlot({ type = "leaderboard", id }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeStyles = {
    leaderboard: "w-full max-w-[728px] min-h-[70px] sm:min-h-[80px] md:min-h-[110px] py-4",
    rectangle: "w-[300px] min-h-[270px] py-4",
    sidebar: "w-[300px] min-h-[270px] lg:min-h-[620px] py-4",
    skyscraper: "w-[160px] min-h-[620px] py-4",
  };

  const adBoxStyles = {
    leaderboard: "h-[50px] sm:h-[60px] md:h-[90px] w-full",
    rectangle: "h-[250px] w-[300px]",
    sidebar: "h-[250px] lg:h-[600px] w-[300px]",
    skyscraper: "h-[600px] w-[160px]",
  };

  const currentBoxStyle = adBoxStyles[type] || adBoxStyles.leaderboard;
  const currentWrapperStyle = sizeStyles[type] || sizeStyles.leaderboard;

  return (
    <div
      className={`mx-auto flex flex-col items-center justify-center font-sans ${currentWrapperStyle}`}
      id={`ad-slot-${id || type}`}
    >
      {/* Label */}
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brutal-black/40 mb-1.5 select-none">
        Advertisement
      </span>

      {/* Box layout container */}
      <div
        className={`bg-white border-[3px] border-dashed border-brutal-black rounded-[12px] flex items-center justify-center transition-opacity duration-300 shadow-brutal ${
          mounted ? "opacity-100" : "opacity-0"
        } ${currentBoxStyle}`}
      >
        <span className="text-[10px] font-black uppercase tracking-wider text-brutal-black select-none">
          {type === "leaderboard" ? "728x90 Banner" : type === "rectangle" ? "300x250 Box" : "300x600 Tower"}
        </span>
      </div>
    </div>
  );
}
