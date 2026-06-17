"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faChevronRight as faHeaderArrow, faXmark } from "@fortawesome/free-solid-svg-icons";
import { formatPostDate } from "../../lib/util";

export default function YoutubeCarousel() {
  const containerRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Fetch videos from Next.js server API
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) throw new Error("Failed to load");
        const json = await res.json();
        if (json.success && json.data) {
          setVideos(json.data);
        }
      } catch (err) {
        console.error("Error loading videos:", err);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  // Check scroll positions
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

    const resizeObserver = new ResizeObserver(() => {
      updateScrollButtons();
    });
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, [videos]);

  // Lock body scroll when activeVideoId is open
  useEffect(() => {
    if (activeVideoId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideoId]);

  if (loading) {
    return (
      <div className="w-full py-8 text-center text-zinc-400 font-sans italic text-sm">
        Loading Channel Videos...
      </div>
    );
  }

  if (videos.length === 0) return null;

  const scroll = (direction) => {
    if (containerRef.current) {
      const offset = direction === "left" ? -320 : 320;
      containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white dark:bg-black py-6 transition-colors duration-200 select-none">
      
      {/* Header */}
      <div className="flex items-center gap-1.5 text-base font-black tracking-wider uppercase text-black dark:text-white border-t border-[#e9e9e9] dark:border-white py-3 font-sans">
        <span>Videos</span>
        <FontAwesomeIcon icon={faHeaderArrow} className="text-xs text-[#f99d1b]" />
      </div>

      {/* Slider Wrapper */}
      <div className="relative w-full">
        {/* Left Scroll Chevron */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/3 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-md hover:scale-105 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Scroll Left"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
          </button>
        )}

        {/* Scrollable container */}
        <div
          ref={containerRef}
          className="w-full overflow-x-auto scrollbar-none flex flex-row gap-6 px-1 scroll-smooth"
        >
          {videos.map((video) => {
            const dateText = video.publishedText || (video.published ? formatPostDate(video.published) : "");

            return (
              <div
                key={video.id}
                onClick={() => setActiveVideoId(video.id)}
                className="flex flex-col gap-2 shrink-0 w-[240px] sm:w-[280px] group cursor-pointer"
              >
                {/* Thumbnail and Play Icon */}
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 640px) 240px, 280px"
                  />
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/45 transition-colors duration-200">
                    <div className="w-12 h-12 rounded-full bg-[#f99d1b] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200 select-none">
                      <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Video text info */}
                <div className="flex flex-col gap-1.5 px-0.5">
                  <span className="font-serif font-bold text-[13px] sm:text-[13.5px] leading-snug line-clamp-2 text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors duration-200">
                    {video.title}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-500 text-[10px] font-semibold uppercase tracking-wider font-sans">
                    {dateText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Scroll Chevron */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/3 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-md hover:scale-105 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Scroll Right"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        )}
      </div>

      {/* Lightbox Video Player Modal */}
      {activeVideoId && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-10 select-none cursor-pointer"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-[16/9] bg-black shadow-2xl rounded-md overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute -top-1 right-3 z-30 text-white hover:text-[#f99d1b] text-3xl focus:outline-none cursor-pointer p-2 flex items-center justify-center"
              aria-label="Close Player"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>

            {/* Embedded player iframe */}
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
