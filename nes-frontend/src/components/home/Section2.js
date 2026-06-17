"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { getPostUrl, formatPostDate } from "../../lib/util";

const MOCK_TRENDS = [
  {
    title: "What is LRLACM? The indigenous missile drawing comparisons with Tomahawk",
    slug: "what-is-lrlacm-missile",
    date: "2026-06-16T15:18:00",
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/02193744/2748cd58a022036d4e1eab648298dd2a.webp"
      }
    }
  },
  {
    title: "India raises concerns over UN reform text, pushes for transparent negotiations",
    slug: "india-un-reform-negotiations",
    date: "2026-06-16T14:09:00",
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/05/29083104/37809b9549a96de51fd1f9bc13eebf9b.webp"
      }
    }
  },
  {
    title: "No more over-the-counter cough syrups: Government tightens sale rules",
    slug: "cough-syrups-government-tightens-sale-rules",
    date: "2026-06-16T13:30:00",
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/10101646/9fc21c5b0aed769be9216159cc407d6d.webp"
      }
    }
  },
  {
    title: "What's changed in India's new inflation index? Key details explained",
    slug: "indias-new-inflation-index-key-details",
    date: "2026-06-16T12:58:00",
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/01113255/57097cea50536413cf9d7daecad6577f.webp"
      }
    }
  },
  {
    title: "Rain, strong winds sweep Delhi; IMD predicts thunderstorms and showers today",
    slug: "rain-strong-winds-sweep-delhi-imd-predictions",
    date: "2026-06-16T08:58:00",
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/10141426/fab9d07d6dd2944a0b810a734d66b541.webp"
      }
    }
  },
  {
    title: "From traffic jams to river rides? Kolkata’s Water Metro plan takes shape",
    slug: "from-traffic-jams-to-river-rides-kolkatas-water-metro-plan-takes-shape",
    date: "2026-06-10T10:17:38",
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/10101646/9fc21c5b0aed769be9216159cc407d6d.webp"
      }
    }
  },
  {
    title: "Can conscious breathing improve your well-being? Here’s how it helps calm the mind",
    slug: "can-conscious-breathing-improve-your-well-being-heres-how-it-may-help-calm-the-mind",
    date: "2026-06-10T14:17:08",
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/10141426/fab9d07d6dd2944a0b810a734d66b541.webp"
      }
    }
  },
  {
    title: "Rainbow aura meaning explained: Signs, traits and spiritual significance",
    slug: "rainbow-aura-meaning-explained-signs-traits-and-spiritual-significance",
    date: "2026-06-10T10:01:57",
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/02193744/2748cd58a022036d4e1eab648298dd2a.webp"
      }
    }
  }
];

export default function Section2({ title = "National Trend", posts = [] }) {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const finalPosts = posts && posts.length > 0 ? posts : MOCK_TRENDS;

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
  }, [finalPosts]);

  const scroll = (direction) => {
    if (containerRef.current) {
      const offset = direction === "left" ? -320 : 320;
      containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white dark:bg-black py-6 transition-colors duration-200 select-none">
      
      {/* Header with full-width thin border */}
      <div className="w-full border-t border-[#e9e9e9] pt-3 mb-5 flex items-center font-sans">
        <h2 className="text-base font-black tracking-wider uppercase text-black dark:text-white">
          {title}
        </h2>
      </div>

      {/* Slider Area */}
      <div className="relative w-full">
        {/* Left Scroll Chevron (centered on image, which is aspect-16/9, approx 135px height on desktop) */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-[67px] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-md hover:scale-105 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Scroll Left"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          className="w-full overflow-x-auto scrollbar-none flex flex-row gap-6 px-1 scroll-smooth"
        >
          {finalPosts.map((post, index) => {
            const image = post.featuredImage?.node?.sourceUrl;
            const link = getPostUrl(post, "news");
            const dateText = formatPostDate(post.date);

            return (
              <Link
                key={post.slug || index}
                href={link}
                className="flex flex-col gap-2 shrink-0 w-[220px] sm:w-[240px] group"
              >
                {/* Thumbnail Image */}
                {image ? (
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md bg-zinc-50 dark:bg-zinc-900 transition-colors">
                    <Image
                      src={image}
                      alt={post.title || ""}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      sizes="(max-width: 640px) 220px, 240px"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/9] bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center rounded-md transition-colors">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase font-sans">No Image</span>
                  </div>
                )}

                {/* Title and Date */}
                <div className="flex flex-col gap-1.5 px-0.5">
                  <span className="font-serif font-bold text-[13px] sm:text-[13.5px] leading-snug line-clamp-3 text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors duration-200">
                    {post.title}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-500 text-[10.5px] font-semibold uppercase tracking-wider font-sans">
                    {dateText}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Scroll Chevron */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-[67px] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-md hover:scale-105 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Scroll Right"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        )}
      </div>

    </section>
  );
}
