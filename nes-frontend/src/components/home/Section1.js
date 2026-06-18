"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { getPostUrl, formatPostDate } from "../../lib/util";

const MOCK_LEFT_POSTS = [
  {
    title: "1,000 passengers, 5-minute frequency: Bengaluru's suburban rail takes shape",
    slug: "bengalurus-suburban-rail-takes-shape",
    date: "2026-06-16T16:08:00",
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/10101646/9fc21c5b0aed769be9216159cc407d6d.webp"
      }
    }
  },
  {
    title: "Will the monsoon bounce back? Forecast offers cautious hope",
    slug: "will-monsoon-bounce-back",
    date: "2026-06-16T16:04:00",
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/10141426/fab9d07d6dd2944a0b810a734d66b541.webp"
      }
    }
  },
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
  }
];

const MOCK_MIDDLE_POST = {
  title: "EV, petrol or flex-fuel: Which vehicle will actually save Indian families the most money?",
  slug: "ev-petrol-flex-fuel-save-money",
  date: "2026-06-16T17:09:00",
  featuredImage: {
    node: {
      sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/01113255/57097cea50536413cf9d7daecad6577f.webp"
    }
  }
};

const MOCK_RIGHT_POSTS = [
  {
    title: "Campus residents chase away alleged flasher near Presidency University girls hostel",
    slug: "presidency-university-hostel-flasher",
    date: "2026-06-01T03:24:00",
    hasMegaphone: true,
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/01111039/778610c9ec73dae828ce0e2842b3592d.webp"
      }
    }
  },
  {
    title: "Bengal polls phase 2: Voting underway, but will rain play spoilsport?",
    slug: "bengal-polls-phase-2-rain",
    date: "2026-04-29T08:20:00",
    hasMegaphone: true,
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/10101646/9fc21c5b0aed769be9216159cc407d6d.webp"
      }
    }
  },
  {
    title: "Can NCPI reshape Bengal politics after claiming support of 20 MPs? Party stakes claim to Bengal's biggest bloc",
    slug: "ncpi-bengal-politics-mps",
    date: "2026-06-15T18:04:00",
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/10141426/fab9d07d6dd2944a0b810a734d66b541.webp"
      }
    }
  },
  {
    title: "CM Suvendu Adhikari launches Jan Kalyan Shivir, announces welfare and infrastructure push",
    slug: "suvendu-adhikari-jan-kalyan-shivir",
    date: "2026-06-15T15:47:00",
    featuredImage: {
      node: {
        sourceUrl: "http://dev-bucket-subhro.s3.ap-south-1.amazonaws.com/wp-content/uploads/2026/06/02193744/2748cd58a022036d4e1eab648298dd2a.webp"
      }
    }
  }
];

export default function Section1({
  leftTitle = "India",
  leftPosts = [],
  middlePost = null,
  rightTitle = "West Bengal",
  rightPosts = []
}) {
  // Use mockup fallbacks if no actual posts are provided
  const finalLeftPosts = leftPosts && leftPosts.length > 0 ? leftPosts : MOCK_LEFT_POSTS;
  const finalMiddlePost = middlePost ? middlePost : MOCK_MIDDLE_POST;
  const finalRightPosts = rightPosts && rightPosts.length > 0 ? rightPosts : MOCK_RIGHT_POSTS;

  return (
    <section className="w-full bg-white dark:bg-black text-black dark:text-white py-6 transition-colors duration-200 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        
        {/* 1. Left Column: India List */}
        <div className="order-2 md:order-1 col-span-1 flex flex-col font-sans">
          {/* Header (Hidden on Mobile) */}
          <Link
            href={`/${leftTitle.toLowerCase().replace(/\s+/g, "-")}`}
            className="hidden md:flex items-center gap-1.5 text-base font-black tracking-wider uppercase mb-4 border-t border-[#e9e9e9] dark:border-zinc-900 pt-3 text-black dark:text-white pb-2.5 group"
          >
            <span>{leftTitle}</span>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-xs text-[#f99d1b] group-hover:translate-x-1 transition-transform"
            />
          </Link>

          {/* List items */}
          <div className="flex flex-col mt-4 pt-4 border-t border-[#e9e9e9] dark:border-zinc-900 md:mt-0 md:pt-0 md:border-t-0">
            {finalLeftPosts.map((post, index) => {
              const image = post.featuredImage?.node?.sourceUrl;
              const title = post.title || "";
              const dateText = formatPostDate(post.date);
              const link = getPostUrl(post, leftTitle.toLowerCase().replace(/\s+/g, "-"));

              return (
                <Link
                  key={post.slug || index}
                  href={link}
                  className="flex flex-row gap-4 py-3.5 border-b border-[#e9e9e9] dark:border-zinc-900 last:border-b-0 first:pt-0 last:pb-0 items-start group"
                >
                  <div className="flex-grow flex flex-col justify-start">
                    <span className="font-serif font-bold text-[13.5px] sm:text-sm leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors line-clamp-3">
                      {title}
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-500 text-[10.5px] mt-1.5 font-semibold font-sans uppercase tracking-wider">
                      {dateText}
                    </span>
                  </div>
                  {image && (
                    <div className="w-20 h-14 sm:w-24 sm:h-16 relative shrink-0 bg-zinc-50 dark:bg-zinc-900 rounded overflow-hidden">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, 96px"
                      />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 2. Middle Column: India Lead Story (Responsive layout) */}
        {finalMiddlePost && (
          <div className="order-1 md:order-2 col-span-1 flex flex-col">
            {/* Mobile-only Header for India Category */}
            <Link
              href={`/${leftTitle.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex md:hidden items-center gap-1.5 text-2xl font-black tracking-wider uppercase mb-4 border-t border-[#e9e9e9] dark:border-zinc-900 pt-3 text-black dark:text-white pb-2.5 group"
            >
              <span>{leftTitle}</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-xs text-[#f99d1b] group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              href={getPostUrl(finalMiddlePost, leftTitle.toLowerCase().replace(/\s+/g, "-"))}
              className="relative w-full flex flex-col md:block md:aspect-[4/5] lg:h-full md:min-h-[360px] lg:min-h-[440px] overflow-hidden rounded-md group cursor-pointer"
            >
              {finalMiddlePost.featuredImage?.node?.sourceUrl && (
                <div className="relative w-full aspect-[16/10] md:absolute md:inset-0 md:aspect-auto">
                  <Image
                    src={finalMiddlePost.featuredImage.node.sourceUrl}
                    alt={finalMiddlePost.title || ""}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300 z-0"
                    priority
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              )}
              {/* Responsive Text overlay / layout */}
              <div className="relative md:absolute md:inset-0 md:bg-gradient-to-t md:from-black/95 md:via-black/45 md:to-transparent z-10 flex flex-col justify-end pt-3 md:p-5">
                
                <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-[19px] text-zinc-900 dark:text-zinc-100 md:text-white group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] md:group-hover:text-[#f99d1b] transition-colors line-clamp-4 leading-snug">
                  {finalMiddlePost.title}
                </h3>
                <span className="text-zinc-500 dark:text-zinc-400 md:text-zinc-400 text-[10.5px] my-2 font-semibold uppercase tracking-wider font-sans">
                  {formatPostDate(finalMiddlePost.date)}
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* 3. Right Column: West Bengal List */}
        <div className="order-3 md:col-span-2 lg:col-span-1 flex flex-col font-sans">
          {/* Header */}
          <Link
            href={`/${rightTitle.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center gap-1.5 text-xl tracking-wider uppercase mb-4 text-black font-black dark:text-white border-t border-[#e9e9e9] pt-3 dark:border-zinc-900 pb-2.5 group"
          >
            <span>{rightTitle}</span>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-xs text-[#f99d1b] group-hover:translate-x-1 transition-transform"
            />
          </Link>

          {/* List items */}
          <div className="flex flex-col">
            {finalRightPosts.map((post, index) => {
              const image = post.featuredImage?.node?.sourceUrl;
              const title = post.title || "";
              const dateText = formatPostDate(post.date);
              const link = getPostUrl(post, rightTitle.toLowerCase().replace(/\s+/g, "-"));
              
              // Megaphone flag
              const hasMegaphone = post.hasMegaphone || post.categories?.nodes?.some(c => c.slug.includes("video") || c.slug.includes("audio")) || post.title?.includes("📢") || post.title?.includes("🔊");

              if (index === 0) {
                return (
                  <div key={post.slug || index} className="flex flex-col">
                    {/* Mobile Only: Lead story style */}
                    <Link
                      href={link}
                      className="block md:hidden group mb-4 pb-4 border-b border-[#e9e9e9] dark:border-zinc-900"
                    >
                      {image && (
                        <div className="relative w-full aspect-[16/10] rounded overflow-hidden mb-3">
                          <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-serif font-bold text-base leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors">
                          {title}
                          {hasMegaphone && (
                            <FontAwesomeIcon
                              icon={faBullhorn}
                              className="text-[#f99d1b] text-xs ml-1.5 align-middle shrink-0"
                            />
                          )}
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-500 text-[10.5px] mt-1.5 font-semibold font-sans uppercase tracking-wider">
                          {dateText}
                        </span>
                      </div>
                    </Link>

                    {/* Desktop/Tablet Only: Standard list item style */}
                    <Link
                      href={link}
                      className="hidden md:flex flex-row gap-4 py-3.5 border-b border-[#e9e9e9] dark:border-zinc-900 first:pt-0 items-start group"
                    >
                      <div className="flex-grow flex flex-col justify-start">
                        <span className="font-serif font-bold text-[13.5px] sm:text-sm leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors line-clamp-3">
                          {title}
                          {hasMegaphone && (
                            <FontAwesomeIcon
                              icon={faBullhorn}
                              className="text-[#f99d1b] text-xs ml-1.5 align-middle shrink-0"
                            />
                          )}
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-500 text-[10.5px] mt-1.5 font-semibold font-sans uppercase tracking-wider">
                          {dateText}
                        </span>
                      </div>
                      {image && (
                        <div className="w-20 h-14 sm:w-24 sm:h-16 relative shrink-0 bg-zinc-50 dark:bg-zinc-900 rounded overflow-hidden">
                          <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 80px, 96px"
                          />
                        </div>
                      )}
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={post.slug || index}
                  href={link}
                  className="flex flex-row gap-4 py-3.5 border-b border-[#e9e9e9] dark:border-zinc-900 last:border-b-0 items-start group"
                >
                  <div className="flex-grow flex flex-col justify-start">
                    <span className="font-serif font-bold text-sm sm:text-sm leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors line-clamp-3">
                      {title}
                      {hasMegaphone && (
                        <FontAwesomeIcon
                          icon={faBullhorn}
                          className="text-[#f99d1b] text-xs ml-1.5 align-middle shrink-0"
                        />
                      )}
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-500 text-[10.5px] mt-1.5 font-semibold font-sans uppercase tracking-wider">
                      {dateText}
                    </span>
                  </div>
                  {image && (
                    <div className="w-20 h-14 sm:w-24 sm:h-16 relative shrink-0 bg-zinc-50 dark:bg-zinc-900 rounded overflow-hidden">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, 96px"
                      />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
