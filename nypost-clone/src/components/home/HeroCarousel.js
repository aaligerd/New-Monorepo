"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPostUrl, getHierarchicalCategories, getAuthorName } from "../../lib/util";

export default function HeroCarousel({ posts = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto transition slides every 6 seconds
  useEffect(() => {
    if (posts.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % posts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [posts.length]);

  if (!posts || posts.length === 0) return null;

  const currentPost = posts[activeIndex];
  const { l1 } = getHierarchicalCategories(currentPost.categories?.nodes);

  return (
    <div className="bg-white border-4 border-black p-5 md:p-6 shadow-[0_6px_30px_rgba(0,0,0,0.06)] mb-10 overflow-hidden relative font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[380px]">
        
        {/* LEFT COLUMN: Image & Indicators */}
        <div className="lg:col-span-7 relative aspect-[16/10] bg-zinc-950 border border-zinc-200 group overflow-hidden">
          
          {/* Keyed container to trigger animation on index switch */}
          <div
            key={activeIndex}
            className="absolute inset-0 w-full h-full"
            style={{
              animation: "carouselImageFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}
          >
            {currentPost.featuredImage?.node?.sourceUrl ? (
              <Image
                src={currentPost.featuredImage.node.sourceUrl}
                alt={currentPost.title}
                fill
                className="object-cover opacity-90"
                priority
                sizes="(max-w-1024px) 100vw, 60vw"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-650 font-black text-xl select-none uppercase tracking-widest font-display" style={{ fontFamily: "var(--font-oswald)" }}>
                News Eisamay
              </div>
            )}
          </div>

          {/* Indicators positioned at the image bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/80 px-4 py-2 border border-zinc-800">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="transition-all duration-300 focus:outline-none cursor-pointer"
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === activeIndex ? (
                  <div className="w-5 h-2 bg-[#f99d1b]" />
                ) : (
                  <div className="w-2 h-2 bg-zinc-500 hover:bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Content Text */}
        <div
          key={`text-${activeIndex}`}
          className="lg:col-span-5 flex flex-col justify-center h-full px-2"
          style={{
            animation: "carouselTextUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          }}
        >
          {/* Section Category label */}
          {l1 && (
            <span className="inline-block text-[11px] font-black uppercase tracking-[0.2em] text-[#f99d1b] mb-2 select-none">
              {l1.name}
            </span>
          )}

          {/* Headline Title */}
          <Link href={getPostUrl(currentPost)} className="group">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl leading-tight font-black text-black mb-3 hover:text-[#f99d1b] transition-colors uppercase font-display"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {currentPost.title}
            </h2>
          </Link>

          {/* Excerpt description */}
          {currentPost.excerpt && (
            <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
              {currentPost.excerpt.replace(/<[^>]*>/g, "")}
            </p>
          )}

          {/* Byline and metadata */}
          {(() => {
            const authorName = getAuthorName(currentPost.author?.node);
            const initial = authorName ? authorName.charAt(0) : "N";
            return (
              <div className="flex items-center gap-3 pt-4 border-t-2 border-zinc-100 mt-auto">
                <div className="w-8 h-8 rounded-full bg-[#f99d1b] text-black flex items-center justify-center font-black uppercase text-xs select-none">
                  {initial}
                </div>
                <div>
                  <span className="text-xs font-black text-black block leading-tight">
                    {authorName}
                  </span>
                  <span className="text-[10px] text-zinc-550 font-bold block uppercase tracking-wider mt-0.5 select-none">
                    {new Date(currentPost.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <style jsx global>{`
        @keyframes carouselImageFade {
          from {
            opacity: 0.3;
            transform: scale(1.03);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes carouselTextUp {
          from {
            opacity: 0;
            transform: translateY(12px);
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
