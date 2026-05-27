import Image from "next/image";
import Link from "next/link";
import { 
  getPostUrl, 
  getHierarchicalCategories, 
  stripHtml, 
  formatSectionTitle 
} from "../lib/util";

async function getHomeData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/home`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error("Failed to fetch home data");
  const json = await res.json();
  return json.data;
}

export const metadata = {
  title: "Home | The Eastern Gazette",
  description: "Latest news and updates from India and around the world.",
};

export default async function HomePage() {
  const data = await getHomeData();
  const { heroPosts, ...sections } = data;
  const [mainHero, ...secondaryHeroes] = heroPosts?.nodes ?? [];

  return (
    <main className="max-w-6xl mx-auto px-4">
      {/* ── HERO SECTION ────────────────────────────────── */}
      <section className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Hero */}
          {mainHero && (
            <div className="md:col-span-2 group">
              <Link href={getPostUrl(mainHero)} className="relative block rounded-2xl overflow-hidden bg-gray-900">
                {mainHero.featuredImage?.node?.sourceUrl && (
                  <Image
                    src={mainHero.featuredImage.node.sourceUrl}
                    alt={mainHero.title}
                    width={800}
                    height={500}
                    className="w-full h-[300px] md:h-[450px] object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                  <CategoryLabel nodes={mainHero.categories?.nodes} light />
                  <h1 className="text-white text-2xl md:text-4xl font-black leading-tight mt-2">
                    {mainHero.title}
                  </h1>
                </div>
              </Link>
            </div>
          )}

          {/* Sidebar Heroes */}
          <div className="flex flex-col gap-5">
            {secondaryHeroes.slice(0, 3).map((post) => (
              <Link key={post.slug} href={getPostUrl(post)} className="flex gap-4 group">
                {post.featuredImage?.node?.sourceUrl && (
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    width={120}
                    height={80}
                    className="w-24 h-24 object-cover rounded-xl shrink-0 shadow-sm"
                  />
                )}
                <div className="flex flex-col">
                  <CategoryLabel nodes={post.categories?.nodes} />
                  <h3 className="text-sm font-bold leading-snug text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t-4 border-black mb-8" />

      {/* ── DYNAMIC CATEGORY SECTIONS ───────────────────── */}
      <section className="pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10">
          {Object.entries(sections).map(([key, value]) => {
            const posts = value?.nodes ?? [];
            if (!posts.length) return null;
            const sectionSlug = key.replace(/_/g, "-");

            return (
              <div key={key} className="flex flex-col">
                <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-6">
                  <h2 className="text-lg font-black uppercase tracking-tighter text-gray-900">
                    {formatSectionTitle(key)}
                  </h2>
                  <Link href={`/topic/${sectionSlug}`} className="text-[10px] font-bold uppercase tracking-widest text-red-600 hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-6">
                  {posts.map((post, i) => (
                    <Link key={post.slug} href={getPostUrl(post)} className="group block">
                      {i === 0 && post.featuredImage?.node?.sourceUrl && (
                        <div className="aspect-video mb-4 overflow-hidden rounded-xl bg-gray-100">
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title}
                            width={400}
                            height={225}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <h3 className={`${i === 0 ? "text-lg font-bold" : "text-sm font-semibold"} leading-tight group-hover:text-red-700`}>
                        {post.title}
                      </h3>
                      {i === 0 && post.excerpt && (
                         <p className="text-gray-500 text-xs mt-2 line-clamp-2 font-serif italic">
                            {stripHtml(post.excerpt)}
                         </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

/**
 * Shared Category Badge Component
 */
function CategoryLabel({ nodes, light = false }) {
  const { l1, l2 } = getHierarchicalCategories(nodes);
  if (!l1) return null;

  return (
    <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] ${light ? "text-red-400" : "text-red-600"} mb-1`}>
      <span>{l1.name}</span>
      {l2 && (
        <>
          <span className={light ? "text-white/30" : "text-gray-300"}>/</span>
          <span className={light ? "text-white/80" : "text-gray-400"}>{l2.name}</span>
        </>
      )}
    </div>
  );
}