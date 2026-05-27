"use client";

import { useState, useEffect } from "react";

export default function WpImage({ src, alt, caption, className }) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Disable scroll when lightbox is active
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
      <figure className={`my-6 overflow-hidden rounded-xl border border-gray-150/50 bg-white ${className || ""}`}>
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
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
            <span className="bg-white/90 text-gray-800 text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
              🔍 Click to zoom
            </span>
          </div>
        </div>
        {caption && (
          <figcaption className="p-3 text-center text-[11px] text-gray-400 border-t border-gray-50 bg-gray-50/30 italic font-sans font-medium">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox Zoom Overlay */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-4 cursor-zoom-out"
          style={{
            animation: "fadeIn 0.2s ease-out forwards"
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 text-white text-3xl font-light hover:text-red-500 transition-colors select-none cursor-pointer"
            aria-label="Close zoomed image"
          >
            ×
          </button>

          <img
            src={src}
            alt={alt || "Zoomed Article Image"}
            className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
            style={{
              animation: "scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}
          />

          {caption && (
            <p className="mt-4 text-xs sm:text-sm text-gray-300 max-w-2xl text-center font-sans font-medium px-4 select-none">
              {caption}
            </p>
          )}

          <style jsx global>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleUp {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
