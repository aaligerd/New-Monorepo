"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPostUrl, getHierarchicalCategories, getAuthorName } from "../../lib/util";

export default function HeroCarousel({ posts = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

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
    <div className="bg-canvas border-[3px] border-brutal-black rounded-[20px] p-5 md:p-8 shadow-brutal mb-10 overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
        
        {/* LEFT COLUMN: Image Container */}
        <div className="lg:col-span-7 relative aspect-[16/10] rounded-[12px] overflow-hidden bg-white border-[3px] border-brutal-black shadow-brutal group">
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
                className="object-cover"
                priority
                sizes="(max-w-1024px) 100vw, 60vw"
              />
            ) : (
              <div className="w-full h-full bg-accent-orange/20 flex items-center justify-center text-brutal-black/10 font-bold select-none font-brutal uppercase text-2xl">
                The Eastern Gazette
              </div>
            )}
          </div>

          {/* Neo-brutalist slide indicators */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-canvas border-[2px] border-brutal-black p-1.5 rounded-[8px] shadow-[2px_2px_0px_#000]">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-6 h-6 border-[2px] border-brutal-black rounded-[4px] text-[10px] font-black flex items-center justify-center transition-all cursor-pointer ${
                  index === activeIndex
                    ? "bg-accent-coral text-white scale-110 shadow-[1px_1px_0px_#000]"
                    : "bg-white text-brutal-black hover:bg-accent-orange/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index + 1}
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
          {/* Category label */}
          {l1 && (
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-white bg-brutal-black border-[2px] border-brutal-black px-2.5 py-1 rounded-[4px] w-fit mb-4 select-none shadow-[2px_2px_0px_#f4a261]">
              {l1.name}
            </span>
          )}

          {/* Headline Title */}
          <Link href={getPostUrl(currentPost)} className="group">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] lg:leading-[1.15] font-black text-brutal-black mb-4 font-brutal uppercase tracking-tight group-hover:text-accent-coral transition-colors decoration-brutal-black decoration-3 group-hover:underline">
              {currentPost.title}
            </h2>
          </Link>

          {/* Excerpt */}
          {currentPost.excerpt && (
            <p className="text-brutal-black/80 text-xs sm:text-sm font-bold leading-relaxed mb-6 line-clamp-3 font-sans">
              {currentPost.excerpt.replace(/<[^>]*>/g, "")}
            </p>
          )}

          {/* Author/Byline */}
          {(() => {
            const authorName = getAuthorName(currentPost.author?.node);
            const initial = authorName ? authorName.charAt(0) : "S";
            return (
              <div className="flex items-center gap-3 pt-4 border-t-[3px] border-brutal-black/10 mt-auto">
                <div className="w-9 h-9 rounded-[8px] bg-accent-orange border-[2px] border-brutal-black flex items-center justify-center text-brutal-black font-black uppercase text-xs shadow-[2px_2px_0px_#111] select-none">
                  {initial}
                </div>
                <div>
                  <span className="text-xs font-black text-brutal-black block leading-tight">
                    {authorName}
                  </span>
                  <span className="text-[10px] text-brutal-black/60 block uppercase font-bold tracking-wider mt-0.5 select-none">
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
