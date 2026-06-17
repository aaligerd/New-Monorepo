"use client";

import Link from "next/link";
import Image from "next/image";
import { getPostUrl, formatPostDate } from "../../lib/util";

const MOCK_WORLD_POSTS = [
  {
    title: "Iran seeks UN Security Council ratification for peace deal. Here's why",
    slug: "iran-seeks-un-security-council-ratification-peace-deal",
    date: "2026-06-16T15:11:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=300&q=80"
      }
    }
  },
  {
    title: "6.7-magnitude earthquake jolts Indonesia's Sulawesi, damage assessment underway",
    slug: "indonesia-sulawesi-earthquake-damage-assessment",
    date: "2026-06-16T11:48:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&w=300&q=80"
      }
    }
  },
  {
    title: "UK ramps up pressure on Russia with new sanctions and nuclear fuel deal",
    slug: "uk-pressure-russia-sanctions-nuclear-fuel-deal",
    date: "2026-06-16T10:30:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=300&q=80"
      }
    }
  },
  {
    title: "No tolls, but fees: Iran reveals what ships will have to pay after Strait of Hormuz reopens",
    slug: "strait-of-hormuz-reopens-iran-tolls-fees",
    date: "2026-06-16T09:59:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80"
      }
    }
  }
];

const MOCK_SPORTS_POSTS = [
  {
    title: "India A handed unusual 10-run penalty after Nigam's pitch infringement",
    slug: "india-a-handed-10-run-penalty-pitch-infringement",
    date: "2026-06-15T22:32:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1531415080290-bc98513ff86b?auto=format&fit=crop&w=300&q=80"
      }
    }
  },
  {
    title: "Vaibhav Sooryavanshi faces criticism after heated exchange in Dambulla",
    slug: "vaibhav-sooryavanshi-criticism-heated-exchange-dambulla",
    date: "2026-06-15T20:25:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80"
      }
    }
  },
  {
    title: "IPL auction purse hike likely as BCCI weighs long-term growth",
    slug: "ipl-auction-purse-hike-bcci-weighs-growth",
    date: "2026-06-15T18:00:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1624526261973-14ddcc3fb401?auto=format&fit=crop&w=300&q=80"
      }
    }
  },
  {
    title: "No handshake at toss as India, Pakistan renew rivalry at T20 World Cup",
    slug: "india-pakistan-rivalry-t20-world-cup-no-handshake",
    date: "2026-06-15T16:57:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1540747737956-37872404a8de?auto=format&fit=crop&w=300&q=80"
      }
    }
  }
];

const MOCK_SPORTS_LEAD = {
  title: "Dambulla drama: India A lose to Sri Lanka A in thrilling Super Over finish",
  slug: "dambulla-drama-india-a-lose-sri-lanka-a-super-over",
  date: "2026-06-16T02:19:00",
  featuredImage: {
    node: {
      sourceUrl: "https://images.unsplash.com/photo-1531415080290-bc98513ff86b?auto=format&fit=crop&w=800&q=80"
    }
  }
};

export default function Section3({
  leftTitle = "World",
  leftPosts = [],
  middleTitle = "Sports",
  middlePosts = [],
  rightPost = null
}) {
  const finalLeftPosts = leftPosts && leftPosts.length > 0 ? leftPosts : MOCK_WORLD_POSTS;
  const finalMiddlePosts = middlePosts && middlePosts.length > 0 ? middlePosts : MOCK_SPORTS_POSTS;
  const finalRightPost = rightPost ? rightPost : MOCK_SPORTS_LEAD;

  return (
    <section className="w-full bg-white dark:bg-black text-black dark:text-white py-6 transition-colors duration-200 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        
        {/* 1. Left Column: World List */}
        <div className="order-2 lg:order-1 col-span-1 flex flex-col font-sans border-t border-[#e0e0e0] dark:border-zinc-800 pt-3">
          {/* Header */}
          <Link
            href={`/${leftTitle.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center gap-1 text-[17px] font-black tracking-wider uppercase mb-4 text-black dark:text-white group"
          >
            <span>{leftTitle}</span>
            <span className="font-sans font-black text-black dark:text-white group-hover:translate-x-1 transition-transform ml-1">
              &gt;
            </span>
          </Link>

          {/* List items */}
          <div className="flex flex-col">
            {finalLeftPosts.map((post, index) => {
              const image = post.featuredImage?.node?.sourceUrl;
              const title = post.title || "";
              const dateText = formatPostDate(post.date);
              const link = getPostUrl(post, leftTitle.toLowerCase().replace(/\s+/g, "-"));

              if (index === 0) {
                return (
                  <div key={post.slug || index} className="flex flex-col">
                    {/* Mobile Only: Lead story style */}
                    <Link
                      href={link}
                      className="block lg:hidden group mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-900/60"
                    >
                      {image && (
                        <div className="relative w-full aspect-[16/10] rounded overflow-hidden mb-3">
                          <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-serif font-bold text-[16px] leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors">
                          {title}
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-500 text-[10.5px] mt-1.5 font-semibold font-sans uppercase tracking-wider">
                          {dateText}
                        </span>
                      </div>
                    </Link>

                    {/* Desktop/Tablet Only: Standard list item style */}
                    <Link
                      href={link}
                      className="hidden lg:flex flex-row gap-4 py-3.5 border-b border-zinc-100 dark:border-zinc-900/60 first:pt-0 items-start group"
                    >
                      <div className="flex-grow flex flex-col justify-start">
                        <span className="font-serif font-bold text-[14.5px] sm:text-[15.5px] leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors line-clamp-3">
                          {title}
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-500 text-[10.5px] mt-1.5 font-semibold font-sans uppercase tracking-wider">
                          {dateText}
                        </span>
                      </div>
                      {image && (
                        <div className="w-20 h-20 relative shrink-0 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
                          <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="80px"
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
                  className="flex flex-row gap-4 py-3.5 border-b border-zinc-100 dark:border-zinc-900/60 last:border-b-0 items-start group"
                >
                  <div className="flex-grow flex flex-col justify-start">
                    <span className="font-serif font-bold text-[14.5px] sm:text-[15.5px] leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors line-clamp-3">
                      {title}
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-500 text-[10.5px] mt-1.5 font-semibold font-sans uppercase tracking-wider">
                      {dateText}
                    </span>
                  </div>
                  {image && (
                    <div className="w-20 h-20 relative shrink-0 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 2. Middle & Right Columns: Sports Section */}
        <div className="order-1 lg:order-2 lg:col-span-2 flex flex-col font-sans border-t border-[#e0e0e0] dark:border-zinc-800 pt-3">
          {/* Header */}
          <Link
            href={`/${middleTitle.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center gap-1 text-[17px] font-black tracking-wider uppercase mb-4 text-black dark:text-white group"
          >
            <span>{middleTitle}</span>
            <span className="font-sans font-black text-black dark:text-white group-hover:translate-x-1 transition-transform ml-1">
              &gt;
            </span>
          </Link>

          {/* Grid containing list and overlay card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch">
            {/* Middle Column: Sports List */}
            <div className="order-2 md:order-1 flex flex-col mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-900/60 md:mt-0 md:pt-0 md:border-t-0">
              {finalMiddlePosts.map((post, index) => {
                const image = post.featuredImage?.node?.sourceUrl;
                const title = post.title || "";
                const dateText = formatPostDate(post.date);
                const link = getPostUrl(post, middleTitle.toLowerCase().replace(/\s+/g, "-"));

                return (
                  <Link
                    key={post.slug || index}
                    href={link}
                    className="flex flex-row gap-4 py-3.5 border-b border-zinc-100 dark:border-zinc-900/60 last:border-b-0 first:pt-0 last:pb-0 items-start group"
                  >
                    <div className="flex-grow flex flex-col justify-start">
                      <span className="font-serif font-bold text-[14.5px] sm:text-[15.5px] leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors line-clamp-3">
                        {title}
                      </span>
                      <span className="text-zinc-400 dark:text-zinc-500 text-[10.5px] mt-1.5 font-semibold font-sans uppercase tracking-wider">
                        {dateText}
                      </span>
                    </div>
                    {image && (
                      <div className="w-20 h-20 relative shrink-0 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Column: Sports Lead (Responsive layout) */}
            {finalRightPost && (
              <div className="order-1 md:order-2 flex flex-col md:h-full min-h-0">
                <Link
                  href={getPostUrl(finalRightPost, middleTitle.toLowerCase().replace(/\s+/g, "-"))}
                  className="relative w-full flex flex-col md:block md:aspect-auto md:h-full md:min-h-0 overflow-hidden rounded group cursor-pointer"
                >
                  {finalRightPost.featuredImage?.node?.sourceUrl && (
                    <div className="relative w-full aspect-[16/10] md:absolute md:inset-0 md:aspect-auto">
                      <Image
                        src={finalRightPost.featuredImage.node.sourceUrl}
                        alt={finalRightPost.title || ""}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-300 z-0"
                        priority
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  {/* Responsive Text overlay / layout */}
                  <div className="relative md:absolute md:inset-0 md:bg-gradient-to-t md:from-black/95 md:via-black/45 md:to-transparent z-10 flex flex-col justify-end pt-3 md:p-5">
                    <span className="text-zinc-500 dark:text-zinc-400 md:text-zinc-400 text-[10.5px] mb-1.5 font-semibold uppercase tracking-wider font-sans">
                      {formatPostDate(finalRightPost.date)}
                    </span>
                    <h3 className="font-serif font-bold text-[16px] sm:text-[17px] lg:text-[19px] text-zinc-900 dark:text-zinc-100 md:text-white group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] md:group-hover:text-[#f99d1b] transition-colors line-clamp-4 leading-snug">
                      {finalRightPost.title}
                    </h3>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
