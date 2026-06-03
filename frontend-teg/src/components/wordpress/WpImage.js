"use client";

import { useState, useEffect } from "react";

export default function WpImage({ src, alt, caption, className }) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isZoomed]);

  if (!src) return null;

  return (
    <>
      <figure className={`my-6 overflow-hidden rounded-[12px] border-[3px] border-brutal-black bg-white shadow-brutal ${className || ""}`}>
        <div
          onClick={() => setIsZoomed(true)}
          className="relative cursor-zoom-in group overflow-hidden"
        >
          <img
            src={src}
            alt={alt || "Article Image"}
            loading="lazy"
            className="w-full h-auto object-cover max-h-[520px] hover:scale-[1.01] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-brutal-black/10 transition-colors duration-300 flex items-center justify-center">
            <span className="bg-white border-[2px] border-brutal-black text-brutal-black text-[10px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-2 rounded-[6px] shadow-brutal opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
              🔍 ZOOM IMAGE
            </span>
          </div>
        </div>
        {caption && (
          <figcaption className="p-3 text-center text-xs font-black uppercase tracking-wider text-brutal-black border-t-[3px] border-brutal-black bg-accent-orange/10 italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox Zoom Overlay */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 bg-brutal-black/90 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          {/* Close button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 w-10 h-10 border-[3px] border-brutal-black bg-white flex items-center justify-center text-brutal-black font-black hover:bg-accent-coral hover:text-white rounded-[8px] shadow-brutal select-none cursor-pointer text-xl"
            aria-label="Close zoomed image"
          >
            ×
          </button>

          <img
            src={src}
            alt={alt || "Zoomed Article Image"}
            className="max-w-full max-h-[85vh] object-contain border-[4px] border-brutal-black rounded-[12px] bg-white shadow-brutal-lg"
          />

          {caption && (
            <p className="mt-4 text-xs sm:text-sm font-black uppercase tracking-wider bg-accent-orange text-brutal-black border-[3px] border-brutal-black px-4 py-2 rounded-[8px] max-w-2xl text-center shadow-brutal">
              {caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
