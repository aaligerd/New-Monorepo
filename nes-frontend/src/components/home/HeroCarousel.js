"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { getPostUrl, getHierarchicalCategories } from "../../lib/util";

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

  const handlePrev = (e) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev + 1) % posts.length);
  };

  return (
    <div className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden bg-zinc-950 font-sans shadow-sm group">
      
      {/* 1. Slides Track (Horizontal Slider) */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {posts.map((post, index) => {
          const { l1 } = getHierarchicalCategories(post.categories?.nodes);
          return (
            <div key={post.slug || index} className="w-full h-full shrink-0 relative">
              {post.featuredImage?.node?.sourceUrl ? (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-650 font-black text-xl select-none uppercase tracking-widest" style={{ fontFamily: "var(--font-oswald)" }}>
                  News Eisamay
                </div>
              )}
              
              {/* Gradient overlay text block (Slides along with the image) */}
              <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10 pb-8 z-10 select-none">
                {/* Date and Category Kicker */}
                <div className="flex items-center gap-3 text-[#f99d1b] font-bold text-[11px] sm:text-xs uppercase tracking-wider mb-1">
                  {l1 && <span className="border-r border-[#f99d1b]/45 pr-3">{l1.name}</span>}
                  <span>
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Headline Title */}
                <Link href={getPostUrl(post)} className="group/link max-w-5xl">
                  <h2
                    className="text-white text-base sm:text-2xl md:text-3xl lg:text-[34px] leading-tight font-black uppercase tracking-tight group-hover/link:text-[#f99d1b] transition-colors line-clamp-2 font-sans"
                    style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
                  >
                    {post.title}
                  </h2>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Left Arrow Overlay */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-25 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 flex items-center justify-center text-white transition-opacity duration-200 shadow-md cursor-pointer select-none opacity-75 hover:opacity-100 focus:outline-none"
        aria-label="Previous slide"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
      </button>

      {/* 3. Right Arrow Overlay */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-25 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 flex items-center justify-center text-white transition-opacity duration-200 shadow-md cursor-pointer select-none opacity-75 hover:opacity-100 focus:outline-none"
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
      </button>


      {/* 4. Slides dot indicators */}
      <div className="absolute bottom-4 right-6 z-20 flex items-center gap-1.5 select-none">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="transition-all duration-300 focus:outline-none cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === activeIndex ? (
              <div className="w-5 h-1.5 bg-[#f99d1b]" />
            ) : (
              <div className="w-1.5 h-1.5 bg-white/45 hover:bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
