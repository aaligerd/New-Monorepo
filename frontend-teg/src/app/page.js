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
      <main className="max-w-[1360px] mx-auto px-6 py-20 text-center text-brutal-black/60 font-black uppercase select-none">
        Unable to load content. Please check connection to BFF.
      </main>
    );
  }

  const latestPosts = data.latestPosts || [];
  const dynamicSections = data.dynamicSections || [];

  const carouselPosts = latestPosts.slice(0, 5);
  const latestNewsPosts = latestPosts.slice(5, 15);

  return (
    <main className="max-w-[1360px] mx-auto px-4 sm:px-6 py-6 font-sans">
      {/* Top Banner Ad */}
      <AdSlot type="leaderboard" id="homepage-top" />

      {/* Hero Carousel */}
      {carouselPosts.length > 0 && (
        <HeroCarousel posts={carouselPosts} />
      )}

      {/* Latest News bullet feed grid */}
      {latestNewsPosts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between border-b-[3px] border-brutal-black pb-3 mb-8">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white bg-brutal-black border-[3px] border-brutal-black px-4 py-1.5 rounded-[8px] font-brutal shadow-[3px_3px_0px_#f4a261]">
              Latest Bulletins
            </h2>
            <span className="text-[10px] font-black uppercase tracking-widest bg-accent-coral/20 border-[2px] border-brutal-black px-2.5 py-1 rounded-[4px] text-brutal-black select-none shadow-[2px_2px_0px_#111]">
              Real-time Feed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {latestNewsPosts.map((post) => (
              <Link
                key={post.slug}
                href={getPostUrl(post)}
                className="group block bg-white border-[3px] border-brutal-black rounded-[16px] p-4 shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="aspect-video relative rounded-[12px] overflow-hidden mb-4 bg-accent-orange/5 border-[2px] border-brutal-black">
                  {post.featuredImage?.node?.sourceUrl ? (
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-w-640px) 100vw, 20vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-accent-orange/15 text-brutal-black/40 flex items-center justify-center font-black text-xs uppercase select-none">
                      TEG
                    </div>
                  )}
                </div>

                {/* Info Content */}
                <h3 className="text-sm font-black text-brutal-black group-hover:text-accent-coral transition-colors leading-snug line-clamp-2 font-brutal uppercase tracking-tight mb-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-brutal-black/70 text-[11px] leading-relaxed line-clamp-2 font-sans font-bold">
                    {post.excerpt.replace(/<[^>]*>/g, "")}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Dynamic Category Sections */}
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
  );
}
