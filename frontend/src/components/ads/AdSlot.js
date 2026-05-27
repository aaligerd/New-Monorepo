"use client";

import { useState, useEffect } from "react";

export default function AdSlot({ type = "leaderboard", id }) {
  const [mounted, setMounted] = useState(false);

  // Defer mounting slightly to ensure First Contentful Paint is not blocked
  useEffect(() => {
    setMounted(true);
  }, []);

  // Responsive padding/margin wrapper styles
  const sizeStyles = {
    // Leaderboard (desktop 728x90, mobile 320x50, tablet 468x60)
    leaderboard: "w-full max-w-[728px] min-h-[70px] sm:min-h-[80px] md:min-h-[110px] py-4",
    // Medium Rectangle (300x250)
    rectangle: "w-[300px] min-h-[270px] py-4",
    // Sidebar Banner (300x600 or 300x250)
    sidebar: "w-[300px] min-h-[270px] lg:min-h-[620px] py-4",
    // Vertical Gutter Skyscraper (160x600)
    skyscraper: "w-[160px] min-h-[620px] py-4",
  };

  // Dimensions of the actual iframe box area to prevent Cumulative Layout Shift
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
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-1 select-none">
        Advertisement
      </span>

      {/* Box layout container */}
      <div
        className={`bg-gray-50/60 border border-dashed border-gray-200 rounded-2xl flex items-center justify-center transition-opacity duration-300 ${
          mounted ? "opacity-100" : "opacity-0"
        } ${currentBoxStyle}`}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300 select-none">
          Ad Slot ({type === "leaderboard" ? "728x90" : type === "rectangle" ? "300x250" : "300x600"})
        </span>
      </div>
    </div>
  );
}
