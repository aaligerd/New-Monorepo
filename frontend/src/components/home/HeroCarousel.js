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
    <div className="bg-white rounded-3xl p-5 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100/80 mb-10 overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
        
        {/* LEFT COLUMN: Image & Dot-and-Line Indicators */}
        <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-900 shadow-sm border border-gray-100 group">
          
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
              <div className="w-full h-full bg-gradient-to-tr from-red-800 to-gray-900 flex items-center justify-center text-white/10 font-bold select-none">
                The Eastern Gazette
              </div>
            )}
          </div>

          {/* Dot-and-Line indicators positioned at the image bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/35 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="transition-all duration-300 focus:outline-none cursor-pointer"
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === activeIndex ? (
                  /* Line Indicator for Active */
                  <div className="w-6 h-1.5 bg-red-500 rounded-full" />
                ) : (
                  /* Dot Indicator for Inactive */
                  <div className="w-2 h-2 bg-white/60 hover:bg-white rounded-full" />
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
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-red-650 mb-3 select-none">
              {l1.name}
            </span>
          )}

          {/* Headline Title */}
          <Link href={getPostUrl(currentPost)} className="group">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] lg:leading-[1.2] font-black text-gray-900 mb-4 font-display hover:text-red-750 transition-colors">
              {currentPost.title}
            </h2>
          </Link>

          {/* Excerpt description */}
          {currentPost.excerpt && (
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-sans">
              {currentPost.excerpt.replace(/<[^>]*>/g, "")}
            </p>
          )}

          {/* Byline and metadata */}
          {(() => {
            const authorName = getAuthorName(currentPost.author?.node);
            const initial = authorName ? authorName.charAt(0) : "S";
            return (
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                <div className="w-8 h-8 rounded-full bg-red-50 border border-red-155 flex items-center justify-center text-red-600 font-bold uppercase text-[11px] select-none">
                  {initial}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-700 block leading-tight">
                    {authorName}
                  </span>
                  <span className="text-[9px] text-gray-400 block uppercase tracking-wider mt-0.5 select-none">
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
            transform: scale(1.05);
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
