import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/home/HeroCarousel";
import CategorySection from "@/components/category/CategorySection";
import AdSlot from "@/components/ads/AdSlot";
import NewsTicker from "@/components/layout/NewsTicker";
import { getPostUrl } from "../lib/util";

async function getHomeData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/home`,
      { next: { revalidate: 300 } }
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

  // First 5 articles for the Hero Carousel
  const carouselPosts = latestPosts.slice(0, 5);

  // Next 10 articles for the Latest News Cards grid
  const latestNewsPosts = latestPosts.slice(5, 15);

  return (
    <>
      {/* Breaking News Ticker under Header */}
      <NewsTicker />

      <main className="max-w-7xl mx-auto px-4 py-6 font-sans">
        {/* Top Banner Ad */}
        <AdSlot type="leaderboard" id="homepage-top" />

        {/* -- HERO SECTION: CLIENT-SIDE CAROUSEL ------------------- */}
        {carouselPosts.length > 0 && (
          <HeroCarousel posts={carouselPosts} />
        )}

        {/* -- LATEST NEWS: CARDS GRID ----------------------------- */}
        {latestNewsPosts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between border-b-4 border-black pb-1.5 mb-6">
              <h2 className="text-xl font-black uppercase tracking-tight text-black font-display" style={{ fontFamily: "var(--font-oswald)" }}>
                LATEST BULLETINS
              </h2>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#f99d1b] bg-black px-2.5 py-0.5 select-none animate-pulse">
                LIVE FEED
              </span>
            </div>

            {/* Symmetrical grid for cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {latestNewsPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={getPostUrl(post)}
                  className="group block bg-white border border-zinc-200 p-4 hover:border-[#f99d1b] hover:shadow-lg transition-all duration-300"
                >
                  {/* Image Top */}
                  <div className="aspect-video relative overflow-hidden mb-4 bg-zinc-50 border border-zinc-100">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-w-640px) 100vw, 20vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-100 flex items-center justify-center font-black text-xs select-none tracking-widest" style={{ fontFamily: "var(--font-oswald)" }}>
                        NE
                      </div>
                    )}
                  </div>

                  {/* Content Below */}
                  <span className="text-[9px] font-black uppercase text-[#f99d1b] tracking-wider block mb-1">
                    {post.categories?.nodes?.[0]?.name || "NEWS"}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 group-hover:text-[#f99d1b] transition-colors leading-snug line-clamp-2 uppercase">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2 mt-1.5">
                      {post.excerpt.replace(/<[^>]*>/g, "")}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* -- DYNAMIC CATEGORY SECTIONS (1 + 9 Layout) -------------------- */}
        <div className="space-y-4">
          {dynamicSections.map((section, idx) => (
            <div key={section.id || idx}>
              <CategorySection title={section.name} categorySlug={section.slug} posts={section.posts} />
              
              {/* Render a mid-page ad slot directly after the first category section */}
              {idx === 0 && (
                <div className="py-4">
                  <AdSlot type="leaderboard" id={`homepage-mid-${section.id || idx}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
