"use client";

import Link from "next/link";
import Image from "next/image";
import { getPostUrl, formatPostDate, getCloudFrontUrl } from "../../lib/util";

const MOCK_ENTERTAINMENT = [
  {
    title: "Retirement on the horizon? Pritam's statement fuels debate",
    slug: "pritams-retirement-statement-fuels-debate",
    date: "2026-06-16T16:06:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80"
      }
    }
  },
  {
    title: "Karan Johar announces first Malayalam film Odiyan with Prithviraj and Manju Warrier",
    slug: "karan-johar-announces-malayalam-film-odiyan",
    date: "2026-06-16T14:56:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&q=80"
      }
    }
  },
  {
    title: "Allu Arjun's Raaka may not arrive until 2027; here's why",
    slug: "allu-arjun-raaka-release-date-delay",
    date: "2026-06-16T14:47:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80"
      }
    }
  },
  {
    title: "Did Avengers: Doomsday just leak online? Fans debate viral Doctor Doom clip",
    slug: "avengers-doomsday-leak-viral-doctor-doom-clip",
    date: "2026-06-15T13:02:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1478720143023-6a3e68882136?auto=format&fit=crop&w=300&q=80"
      }
    }
  }
];

const MOCK_BUSINESS = [
  {
    title: "Property damage linked to aircraft? Kochi airport evaluates compensation scheme",
    slug: "kochi-airport-evaluates-aircraft-damage-compensation-scheme",
    date: "2026-06-16T17:04:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80"
      }
    }
  },
  {
    title: "ITR filing guide: Can you file income tax returns without Form 16?",
    slug: "itr-filing-guide-file-income-tax-without-form-16",
    date: "2026-06-16T12:49:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80"
      }
    }
  },
  {
    title: "Technical issue: Kannur-Jeddah Air India Express flight turns back with 180 passengers onboard",
    slug: "kannur-jeddah-air-india-express-returns-technical-issue",
    date: "2026-06-16T11:55:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=300&q=80"
      }
    }
  },
  {
    title: "Foreign Disclosure Scheme 2026 explained: Who can apply and what it offers",
    slug: "foreign-disclosure-scheme-26-application-benefits",
    date: "2026-06-16T11:31:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80"
      }
    }
  }
];

const MOCK_LIFESTYLE = [
  {
    title: "What happened today (June 16) in history? Key events to look back on",
    slug: "june-16-in-history-key-historical-events",
    date: "2026-06-16T07:57:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=400&q=80"
      }
    }
  },
  {
    title: "Horoscope today, June 16: Career success, business gains & financial caution for several zodiac signs",
    slug: "horoscope-today-june-16-zodiac-signs-predictions",
    date: "2026-06-16T07:52:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=300&q=80"
      }
    }
  },
  {
    title: "Wordle answer today (June 16): Check hints, solution and more",
    slug: "wordle-answer-today-hints-solution-june-16",
    date: "2026-06-16T07:51:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=300&q=80"
      }
    }
  },
  {
    title: "What is 'solo-maxxing'? The dating trend driven by rising costs",
    slug: "solo-maxxing-dating-trend-rising-costs",
    date: "2026-06-15T17:32:00",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
      }
    }
  }
];

export default function Section4({
  col1Title = "Entertainment",
  col1Posts = [],
  col2Title = "Business",
  col2Posts = [],
  col3Title = "Lifestyle",
  col3Posts = []
}) {
  
  const renderColumn = (title, posts, mockPosts, fallbackSlug) => {
    const finalPosts = posts && posts.length > 0 ? posts : mockPosts;
    const leadPost = finalPosts[0];
    const listPosts = finalPosts.slice(1, 4);

    return (
      <div className="flex flex-col font-sans border-t border-[#e0e0e0] dark:border-zinc-800 pt-3">
        {/* Header */}
        <Link
          href={`/${fallbackSlug}`}
          className="flex items-center gap-1.5 text-base font-black tracking-wider uppercase mb-4 text-black dark:text-white group"
        >
          <span className="text-[17px] font-black">{title}</span>
          <span className="font-sans font-black text-black dark:text-white group-hover:translate-x-1 transition-transform ml-1">
            &gt;
          </span>
        </Link>

        {/* Lead Story Card */}
        {leadPost && (
          <div className="mb-4">
            <Link
              href={getPostUrl(leadPost, fallbackSlug)}
              className="relative w-full flex flex-col md:block md:aspect-[16/10] overflow-hidden rounded group cursor-pointer"
            >
              {leadPost.featuredImage?.node?.sourceUrl && (
                <div className="relative w-full aspect-[16/10] md:absolute md:inset-0 md:aspect-auto">
                  <Image
                    src={getCloudFrontUrl(leadPost.featuredImage.node.sourceUrl)}
                    alt={leadPost.title || ""}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300 z-0"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority
                  />
                </div>
              )}
              {/* Responsive Text overlay / layout */}
              <div className="relative md:absolute md:inset-0 md:bg-gradient-to-t md:from-black/95 md:via-black/45 md:to-transparent z-10 flex flex-col justify-end pt-3 md:p-4">
                <span className="text-zinc-500 dark:text-zinc-400 md:text-zinc-400 text-[10.5px] mb-1 font-semibold uppercase tracking-wider font-sans">
                  {formatPostDate(leadPost.date)}
                </span>
                <h3 className="font-serif font-bold text-[15px] sm:text-[16px] text-zinc-900 dark:text-zinc-100 md:text-white group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] md:group-hover:text-[#f99d1b] transition-colors line-clamp-3 leading-snug">
                  {leadPost.title}
                </h3>
              </div>
            </Link>
          </div>
        )}

        {/* List Stories */}
        <div className="flex flex-col">
          {listPosts.map((post, index) => {
            const image = post.featuredImage?.node?.sourceUrl;
            const title = post.title || "";
            const dateText = formatPostDate(post.date);
            const link = getPostUrl(post, fallbackSlug);

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
                      src={getCloudFrontUrl(image)}
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
    );
  };

  return (
    <section className="w-full bg-white dark:bg-black text-black dark:text-white py-6 transition-colors duration-200 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {renderColumn(col1Title, col1Posts, MOCK_ENTERTAINMENT, "entertainment")}
        {renderColumn(col2Title, col2Posts, MOCK_BUSINESS, "business")}
        {renderColumn(col3Title, col3Posts, MOCK_LIFESTYLE, "lifestyle")}
      </div>
    </section>
  );
}
