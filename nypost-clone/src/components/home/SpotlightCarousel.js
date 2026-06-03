"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SpotlightCarousel({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto transition slides every 5 seconds
  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (!items || items.length === 0) return null;

  const currentItem = items[activeIndex];
  const targetLink = currentItem.link || "#";

  return (
    <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000000] mb-10 overflow-hidden relative font-sans">
      <div className="flex flex-col gap-4">
        {/* Section title */}
        <div className="flex items-center justify-between border-b-2 border-black pb-1.5">
          <span className="text-xs font-black uppercase tracking-widest text-[#f99d1b] font-display" style={{ fontFamily: "var(--font-oswald)" }}>
            EDITORIAL FOCUS
          </span>
          <span className="text-[9px] font-black uppercase tracking-wider text-white bg-black px-2 py-0.5 select-none font-sans">
            SPOTLIGHT {activeIndex + 1} OF {items.length}
          </span>
        </div>

        {/* Card Body Link */}
        <Link href={targetLink} className="group block">
          {/* Image slide area */}
          <div className="relative aspect-[16/10] bg-zinc-100 border border-zinc-200 overflow-hidden mb-4">
            <div
              key={activeIndex}
              className="absolute inset-0 w-full h-full"
              style={{
                animation: "spotlightFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards"
              }}
            >
              {currentItem.image ? (
                <Image
                  src={currentItem.image}
                  alt={currentItem.text || "Spotlight Image"}
                  fill
                  className="object-cover"
                  sizes="(max-w-640px) 100vw, 400px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold text-xs uppercase tracking-widest">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Headline Text */}
          <div
            key={`text-${activeIndex}`}
            style={{
              animation: "spotlightTextUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}
          >
            {currentItem.text && (
              <h3
                className="text-base font-black text-black group-hover:text-[#f99d1b] transition-colors leading-snug line-clamp-3 uppercase mb-3 font-display"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {currentItem.text}
              </h3>
            )}
            <span className="text-[#f99d1b] font-black uppercase tracking-wider text-xs block group-hover:underline">
              WATCH NOW &gt;
            </span>
          </div>
        </Link>

        {/* Indicators at the bottom */}
        <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-zinc-100 mt-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === activeIndex ? (
                <div className="w-5 h-2 bg-[#f99d1b]" />
              ) : (
                <div className="w-2 h-2 bg-zinc-350 hover:bg-zinc-800 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes spotlightFade {
          from {
            opacity: 0.4;
            transform: scale(1.02);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes spotlightTextUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
