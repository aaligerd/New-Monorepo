import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/home/HeroCarousel";
import CategorySection from "@/components/category/CategorySection";
import AdSlot from "@/components/ads/AdSlot";
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
  title: "Home | The Eastern Gazette",
  description: "Latest news and updates from India and around the world.",
};

export default async function HomePage() {
  const data = await getHomeData();

  if (!data) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500 font-sans">
        Unable to load content. Please check connection to BFF.
      </main>
    );
  }

  const { heroPosts, ...sections } = data;
  const carouselPosts = heroPosts?.nodes ?? [];

  // Resilient fallbacks in case the backend hasn't been updated to the new categories yet
  const latestNewsPosts =
    sections.latest?.nodes ||
    sections.india?.nodes?.slice(0, 4) ||
    sections.west_bengal_elections_2026?.nodes?.slice(0, 4) ||
    carouselPosts.slice(1, 5);

  const indiaPosts = sections.india?.nodes || sections.west_bengal_elections_2026?.nodes || [];
  const worldPosts = sections.world?.nodes || sections.sports?.nodes || [];
  const entertainmentPosts = sections.entertainment?.nodes || [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 font-sans bg-[#f7f6f2]">
      {/* Top Banner Ad */}
      <AdSlot type="leaderboard" id="homepage-top" />

      {/* ── HERO SECTION: CLIENT-SIDE CAROUSEL ─────────────────── */}
      {carouselPosts.length > 0 && (
        <HeroCarousel posts={carouselPosts} />
      )}

      {/* ── LATEST NEWS: CARDS GRID ───────────────────────────── */}
      {latestNewsPosts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-6">
            <h2 className="text-lg font-black uppercase tracking-tight text-gray-900 font-display">
              Latest Bulletins
            </h2>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600 select-none">
              Real-time Feed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNewsPosts.map((post) => (
              <Link
                key={post.slug}
                href={getPostUrl(post)}
                className="group block bg-white border border-gray-100/80 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-md transition-all duration-300"
              >
                {/* Image Top */}
                <div className="aspect-video relative rounded-xl overflow-hidden mb-4 bg-gray-50 border border-gray-100">
                  {post.featuredImage?.node?.sourceUrl ? (
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-w-640px) 100vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-red-50 text-red-650 flex items-center justify-center font-bold text-xs select-none">
                      EG
                    </div>
                  )}
                </div>

                {/* Content Below */}
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-snug line-clamp-2 font-display mb-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">
                    {post.excerpt.replace(/<[^>]*>/g, "")}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── DYNAMIC CATEGORY SECTIONS (1 + 9 Layout) ──────────────────── */}
      <div className="space-y-4">
        {/* India Section */}
        {indiaPosts.length > 0 && (
          <CategorySection title="India" posts={indiaPosts} />
        )}

        {/* Mid-content Banner Ad */}
        <AdSlot type="leaderboard" id="homepage-mid" />

        {/* World Section */}
        {worldPosts.length > 0 && (
          <CategorySection title="World" posts={worldPosts} />
        )}

        {/* Entertainment Section */}
        {entertainmentPosts.length > 0 && (
          <CategorySection title="Entertainment" posts={entertainmentPosts} />
        )}
      </div>
    </main>
  );
}