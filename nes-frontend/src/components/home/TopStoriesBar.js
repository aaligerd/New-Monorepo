"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { getPostUrl, getCloudFrontUrl } from "../../lib/util";

export default function TopStoriesBar({ posts = [] }) {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll positions to show/hide chevrons
  const updateScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    
    // Resize observer to handle responsiveness checks
    const resizeObserver = new ResizeObserver(() => {
      updateScrollButtons();
    });
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, [posts]);

  if (!posts || posts.length === 0) return null;

  const scroll = (direction) => {
    if (containerRef.current) {
      const offset = direction === "left" ? -360 : 360;
      containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full bg-white dark:bg-black py-4 transition-colors duration-200 select-none">
      {/* Left scroll chevron */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white dark:bg-yellow-900 text-black dark:text-white shadow-md hover:scale-105 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
          aria-label="Scroll Left"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto scrollbar-none flex flex-row items-center gap-6 px-1 py-1.5 scroll-smooth"
      >
        {posts.map((post, index) => {
          const image = post.featuredImage?.node?.sourceUrl;
          const title = post.title || "";
          const link = getPostUrl(post);
          
          return (
            <Link
              key={post.slug || index}
              href={link}
              className="flex flex-row items-center gap-4 w-[340px] shrink-0 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/85 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/80 hover:border-[#f99d1b] dark:hover:border-[#f99d1b] hover:shadow-md dark:hover:shadow-zinc-950/50 transition-all duration-300 group"
            >
              {/* Thumbnail image */}
              {image ? (
                <div className="w-20 h-20 relative shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden transition-colors border border-zinc-200/50 dark:border-zinc-700/50">
                  <Image
                    src={getCloudFrontUrl(image)}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="80px"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 rounded-lg transition-colors border border-zinc-200/50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase font-sans">No Image</span>
                </div>
              )}

              {/* Story Title */}
              <span className="flex-1 min-w-0 font-serif font-bold text-sm leading-snug line-clamp-3 text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors duration-200">
                {title}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Right scroll chevron */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white dark:bg-zinc-900 text-black dark:text-white shadow-md hover:scale-105 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
          aria-label="Scroll Right"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
        </button>
      )}
    </div>
  );
}
