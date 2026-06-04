import Link from "next/link";
import Image from "next/image";
import CategorySection from "@/components/category/CategorySection";
import CategoryLayout3 from "@/components/category/CategoryLayout3";
import CategoryLayout5 from "@/components/category/CategoryLayout5";
import AdSlot from "@/components/ads/AdSlot";
import NewsTicker from "@/components/layout/NewsTicker";
import { getPostUrl } from "../lib/util";
import SpotlightCarousel from "@/components/home/SpotlightCarousel";
import NewsletterForm from "@/components/home/NewsletterForm";

export const revalidate = 120;

async function getHomeData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/home`,
      { next: { revalidate: 120 } }
    );
    if (!res.ok) throw new Error("Failed to fetch home data");
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Homepage data fetch failed:", error);
    return null;
  }
}

export const metadata = {
  title: "News Eisamay | Bold Tabloid News",
  description: "Get the latest breaking regional updates, political affairs, business reporting, and stories from News Eisamay.",
};

export default async function HomePage() {
  const data = await getHomeData();

  if (!data) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-500 font-sans border-2 border-zinc-200 bg-white my-8">
        <h2 className="text-xl font-black uppercase text-black mb-2" style={{ fontFamily: "var(--font-oswald)" }}>Connection Offline</h2>
        <p className="text-sm font-semibold">Unable to fetch homepage content. Please verify that your Backend-for-Frontend (BFF) server is active on port 9595.</p>
      </main>
    );
  }

  const latestPosts = data.latestPosts || [];
  const dynamicSections = data.dynamicSections || [];
  const { firstImage, firstLink, firstText,
    secondLink, secondText, secondImage,
    thirdLink, thirdText, thirdImage } = data

  // Group spotlight columns for rendering
  const spotlightItems = [
    { image: firstImage, text: firstText, link: firstLink },
    { image: secondImage, text: secondText, link: secondLink },
    { image: thirdImage, text: thirdText, link: thirdLink },
  ].filter((item) => item.image || item.text || item.link);

  // Static Hero Story and Inset Story (Matching example_layout_1.png layout)
  const heroPost = latestPosts[0];
  const insetPost = latestPosts[1];
  
  const heroImage = heroPost?.featuredImage?.node?.sourceUrl;
  const insetImage = insetPost?.featuredImage?.node?.sourceUrl;
  const heroCategoryName = heroPost?.categories?.nodes?.[0]?.name || "NEWS";
  const heroTitle = heroPost?.title || "";
  const heroLink = heroPost ? getPostUrl(heroPost) : "#";

  // Data slices for the new layout-x
  const gridPosts = latestPosts.slice(1, 4); // 3 posts starting from index 1 (2nd element)
  const bulletPosts = latestPosts.slice(-4); // last 4 posts

  return (
    <>
      {/* Breaking News Ticker under Header */}
      <NewsTicker />

      {/* Main outer container - widened to 1600px to hold outer rails on widescreen displays */}
      <main className="max-w-[1600px] mx-auto px-4 py-6 font-sans">
        
        {/* -- PROMOTIONAL HORIZONTAL BANNER (Matching example_layout.png, Desktop & Tablet only) -- */}
        {spotlightItems.length > 0 && (
          <div id="video-top" className="hidden md:block border-b-2 border-black pb-4 mb-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y divide-zinc-200 md:divide-y-0 md:divide-x md:divide-zinc-300 gap-4 md:gap-0">
              {spotlightItems.map((item, index) => {
                const targetLink = item.link || "#";
                return (
                  <Link
                    key={index}
                    href={targetLink}
                    className="flex flex-row items-center gap-4 px-4 py-2 md:py-0 group"
                  >
                    {/* Left image thumbnail (Slightly larger on desktop & tablet) */}
                    {item.image ? (
                      <div className="w-20 h-14 md:w-32 md:h-20 relative flex-shrink-0 bg-zinc-50 border border-zinc-200">
                        <Image
                          src={item.image}
                          alt={item.text || "Promo Image"}
                          fill
                          className="object-cover"
                          sizes="(max-w-768px) 80px, 128px"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-14 md:w-32 md:h-20 relative flex-shrink-0 bg-zinc-100 flex items-center justify-center border border-zinc-200">
                        <span className="text-zinc-400 font-bold text-[9px] uppercase font-sans">No Image</span>
                      </div>
                    )}

                    {/* Right text description and orange link (Slightly larger font size on desktop & tablet) */}
                    <div className="flex-grow min-w-0 text-xs sm:text-base md:text-[17px] lg:text-[18px] font-black text-zinc-900 group-hover:text-black transition-colors leading-snug font-sans">
                      <span>{item.text} </span>
                      <span className="text-[#f99d1b] font-black uppercase whitespace-nowrap ml-1 group-hover:text-[#593b1b]">
                        WATCH NOW &gt;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Top Banner Ad */}
        <div className="max-w-7xl mx-auto mb-8">
          <AdSlot type="leaderboard" id="homepage-top" />
        </div>

        {/* -- MAIN 3-COLUMN LAYOUT CONTEXT -- */}
        <div className="flex flex-row gap-6 items-start justify-center">
          
          {/* LEFT OUTER RAIL: Fixed Skyscraper Ad (Desktop view only, non-scrollable) */}
          <div className="hidden xl:block w-[160px] shrink-0 sticky top-24 self-start border border-zinc-200 bg-zinc-50 p-2 text-center h-[600px] select-none">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-2">ADVERTISEMENT</span>
            <div className="w-[140px] h-[500px] mx-auto bg-zinc-200 border-2 border-dashed border-zinc-300 flex items-center justify-center text-zinc-550 text-xs font-black font-sans">
              120 x 600 AD
            </div>
          </div>

          {/* MIDDLE COLUMN: Main Content Column */}
          <div className="flex-grow min-w-0 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Part: 75% width on desktop */}
              <div className="lg:col-span-9 space-y-8">
                {/* Static Tabloid Splash Hero (Matching example_layout_1.png layout) */}
                {heroPost && (
                  <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000000] mb-10 font-sans">
                    {/* Centered Kicker / Category */}
                    <div className="text-center mb-4">
                      <span
                        className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1B77F9] font-display hover:text-[#F99D1B]"
                        style={{ fontFamily: "var(--font-oswald)" }}
                      >
                        {heroCategoryName}
                      </span>
                    </div>

                    {/* Main Image with Inset Image */}
                    <div className="relative aspect-[16/10] w-full border-2 border-black bg-zinc-100 overflow-hidden">
                      {heroImage ? (
                        <Image
                          src={heroImage}
                          alt={heroTitle}
                          fill
                          className="object-cover"
                          sizes="(max-w-1024px) 100vw, 800px"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold uppercase tracking-widest text-sm">
                          No Main Image
                        </div>
                      )}

                      {/* Inset Image (Top Right) */}
                      {/* {insetImage && (
                        <div className="absolute top-4 right-4 w-[28%] aspect-[16/11] border-2 border-white shadow-xl overflow-hidden z-10 bg-zinc-100">
                          <Image
                            src={insetImage}
                            alt="Inset story image"
                            fill
                            className="object-cover"
                            sizes="(max-w-320px) 30vw, 200px"
                          />
                        </div>
                      )} */}
                    </div>

                    {/* Exclusive Alert Badge */}
                    {/* <div className="flex justify-center mt-6 mb-3">
                      <span className="bg-[#dc2626] text-white text-xs font-black uppercase tracking-widest px-4 py-1 select-none font-sans">
                        EXCLUSIVE
                      </span>
                    </div> */}

                    {/* Centered Headline */}
                    <Link href={heroLink} className="group block text-center max-w-4xl mx-auto">
                      <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-black text-black group-hover:text-[#F99D1B] transition-colors leading-tight uppercase font-display"
                        style={{ fontFamily: "var(--font-oswald)", lineHeight: "1.1" }}
                      >
                        {heroTitle}
                      </h2>
                    </Link>

                    {/* Excerpt under the headline for completeness and high readability */}
                    <div id="layout-x" className="border-t border-zinc-200 pt-6 mt-6 text-left">
                      {/* Top bullet list section */}
                      {bulletPosts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 mb-6">
                          {bulletPosts.map((post) => (
                            <Link
                              key={post.slug}
                              href={getPostUrl(post)}
                              className="group flex items-start gap-2"
                            >
                              <span className="text-[#F99D1B] font-black shrink-0 text-base md:text-lg select-none leading-none mt-0.5">&gt;</span>
                              <span className="text-xl sm:text-base font-bold text-zinc-900 group-hover:text-[#F99D1B] leading-snug font-sans">
                                {post.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Divider between bullet list and grid */}
                      {bulletPosts.length > 0 && gridPosts.length > 0 && (
                        <div className="border-b border-zinc-200 mb-6"></div>
                      )}

                      {/* Bottom 3-column grid section */}
                      {gridPosts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200 gap-6 md:gap-0 pb-2">
                          {gridPosts.map((post, idx) => {
                            const postImage = post.featuredImage?.node?.sourceUrl;
                            const postTitle = post.title || "";
                            const postLink = getPostUrl(post);
                            
                            // Determine padding per column to align with dividers
                            let colPadding = "";
                            if (idx === 0) colPadding = "md:pr-6 pb-6 md:pb-0";
                            else if (idx === 1) colPadding = "md:px-6 py-6 md:py-0";
                            else colPadding = "md:pl-6 pt-6 md:pt-0";

                            // Determine layout components (badges/categories/authors)
                            const categoryName = post.categories?.nodes?.[0]?.name || "NEWS";
                            const authorName = post.author?.node 
                              ? `${post.author.node.firstName || ""} ${post.author.node.lastName || ""}`.trim()
                              : "";

                            return (
                              <div key={post.slug} className={`flex flex-col gap-3 group ${colPadding}`}>
                                <Link href={postLink} className="block relative w-full aspect-[16/10] md:aspect-none md:h-[130px] lg:h-[160px] xl:h-[190px] border border-zinc-100 bg-zinc-50 overflow-hidden">
                                  {postImage ? (
                                    <Image
                                      src={postImage}
                                      alt={postTitle}
                                      fill
                                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                                      sizes="(max-w-768px) 100vw, 30vw"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center font-black text-xs text-zinc-400 select-none tracking-widest" style={{ fontFamily: "var(--font-oswald)" }}>
                                      NO IMAGE
                                    </div>
                                  )}
                                </Link>

                                <div className="flex select-none">
                                  <span className="inline-block border border-[#F99D1B] -skew-x-12 px-2 py-0.5">
                                    <span className="inline-block skew-x-12 text-[#F99D1B] text-[15px] font-black italic uppercase tracking-wider font-sans leading-none">
                                      {categoryName}
                                    </span>
                                  </span>
                                </div>

                                <Link href={postLink} className="block mt-1">
                                  <h3 className="text-base sm:text-lg md:text-[20px] font-black text-black leading-snug group-hover:text-[#F99D1B] transition-colors font-sans">
                                    {postTitle}
                                  </h3>
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Bottom line at the end of the entire layout */}
                      {gridPosts.length > 0 && (
                        <div className="border-b border-zinc-200 mt-6"></div>
                      )}
                    </div>
                  </div>
                )}

                {/* Ad slot after the total hero section */}
                <div className="mb-10">
                  <AdSlot type="rectangle" id="post-hero" />
                </div>


                {/* Mobile Spotlight Carousel */}
                {spotlightItems.length > 0 && (
                  <div className="block md:hidden mb-8">
                    <SpotlightCarousel items={spotlightItems} />
                  </div>
                )}

                {/* Dynamic Category Sections */}
                <div className="space-y-4">
                  {dynamicSections.map((section, idx) => (
                    <div key={section.id || idx}>
                      {idx === 0 ? (
                        <CategoryLayout3 title={section.name} categorySlug={section.slug} posts={section.posts} />
                      ) : idx === 1 ? (
                        <CategoryLayout5 title={section.name} categorySlug={section.slug} posts={section.posts} />
                      ) : (
                        <CategorySection title={section.name} categorySlug={section.slug} posts={section.posts} />
                      )}
                      {idx === 0 && (
                        <div className="py-4">
                          <AdSlot type="leaderboard" id={`homepage-mid-${section.id || idx}`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Part: 25% width on desktop (Sidebar widgets) */}
              <aside className="lg:col-span-3 space-y-8 sticky top-24 self-start">
                
                {/* Sidebar Rectangle Ad */}
                <div className="bg-zinc-50 border border-zinc-200 p-4 text-center">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-2">ADVERTISEMENT</span>
                  <AdSlot type="medium-rectangle" id="homepage-sidebar" />
                </div>

                {/* MOST POPULAR (Trending stories) */}
                {latestPosts.length > 0 && (
                  <div className="bg-white p-5 border-2 border-black shadow-[4px_4px_0px_#000000]">
                    <h3 
                      className="text-sm font-black uppercase tracking-widest text-black border-b-4 border-black pb-2 mb-4 font-display" 
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      MOST POPULAR
                    </h3>
                    <div className="divide-y divide-zinc-200">
                      {latestPosts.slice(0, 5).map((item, index) => (
                        <Link
                          key={item.slug}
                          href={getPostUrl(item)}
                          className="group flex gap-3 py-3 first:pt-0 last:pb-0"
                        >
                          <span 
                            className="text-2xl font-black text-[#f99d1b] w-6 text-center shrink-0 font-display" 
                            style={{ fontFamily: "var(--font-oswald)" }}
                          >
                            {index + 1}
                          </span>
                          <div className="space-y-0.5 min-w-0">
                            <h4 className="text-xs font-bold text-zinc-900 group-hover:text-[#f99d1b] transition-colors leading-snug line-clamp-2 uppercase">
                              {item.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* DAILY BULLETINS (Newsletter Signup Card) */}
                <div className="bg-black text-white p-5 border-2 border-black shadow-[4px_4px_0px_#f99d1b]">
                  <h3 
                    className="text-sm font-black uppercase tracking-widest text-[#f99d1b] border-b-2 border-zinc-800 pb-2 mb-3 font-display"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    DAILY BULLETINS
                  </h3>
                  <p className="text-[11.5px] text-zinc-400 leading-normal mb-4 font-semibold font-sans">
                    Get breaking tabloid reports and regional news highlights delivered right to your inbox.
                  </p>
                  <NewsletterForm />
                </div>

              </aside>

            </div>
          </div>

          {/* RIGHT OUTER RAIL: Fixed Skyscraper Ad (Desktop view only, non-scrollable) */}
          <div className="hidden xl:block w-[160px] shrink-0 sticky top-24 self-start border border-zinc-200 bg-zinc-50 p-2 text-center h-[600px] select-none">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-2">ADVERTISEMENT</span>
            <div className="w-[140px] h-[500px] mx-auto bg-zinc-200 border-2 border-dashed border-zinc-300 flex items-center justify-center text-zinc-550 text-xs font-black font-sans">
              120 x 600 AD
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
