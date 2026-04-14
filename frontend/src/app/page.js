// src/app/page.js

import Image from "next/image";
import Link from "next/link";

async function getHomeData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/home`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error("Failed to fetch home data");
  const json = await res.json();
  return json.data;
}

/**
 * edges[0] = parent category (L1)  e.g. "india"
 * edges[1] = child category  (L2)  e.g. "national-trends"  (optional)
 *
 * /india/national-trends/slug   → if 2+ categories
 * /technology/slug              → if 1 category
 */
function getPostUrl(post) {
  const edges = post.categories?.edges ?? [];

  // Take only first two edges (L1 and optionally L2)
  const segments = edges
    .slice(0, 2)
    .map((e) => e.node.slug);

  return "/" + [...segments, post.slug].join("/");
}

function formatSectionTitle(key) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}

export const metadata = {
  title: "Home | NewsroomCMS",
  description: "Latest news and updates",
};

export default async function HomePage() {
  const data = await getHomeData();
  const { heroPosts, ...sections } = data;
  const [mainHero, ...secondaryHeroes] = heroPosts?.nodes ?? [];

  return (
    <main className="max-w-6xl mx-auto px-4">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="py-6">
        <div className="grid grid-cols-3 gap-4">

          {/* Main hero — spans 2 cols */}
          {mainHero && (
            <Link
              href={getPostUrl(mainHero)}
              className="col-span-2 relative block rounded overflow-hidden bg-gray-900 group"
            >
              {mainHero.featuredImage?.node?.sourceUrl && (
                <Image
                  src={mainHero.featuredImage.node.sourceUrl}
                  alt={mainHero.title}
                  width={800}
                  height={500}
                  className="w-full h-[420px] object-cover opacity-80 group-hover:opacity-90 transition-opacity"
                  priority
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-16 bg-gradient-to-t from-black/85 to-transparent">
                {mainHero.categories?.edges?.[0] && (
                  <span className="inline-block mb-2 text-[11px] font-bold uppercase tracking-widest text-red-400">
                    {mainHero.categories.edges[0].node.slug.replace(/-/g, " ")}
                  </span>
                )}
                <h1 className="text-white text-xl font-bold leading-snug">
                  {mainHero.title}
                </h1>
                {mainHero.excerpt && (
                  <p className="mt-2 text-sm text-white/70 leading-relaxed line-clamp-2">
                    {stripHtml(mainHero.excerpt)}
                  </p>
                )}
              </div>
            </Link>
          )}

          {/* Right column — secondary heroes */}
          <div className="flex flex-col gap-3">
            {secondaryHeroes.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={getPostUrl(post)}
                className="flex gap-3 group border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                {post.featuredImage?.node?.sourceUrl && (
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    width={110}
                    height={75}
                    className="w-[110px] h-[75px] object-cover rounded shrink-0"
                  />
                )}
                <div>
                  {post.categories?.edges?.[0] && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
                      {post.categories.edges[0].node.slug.replace(/-/g, " ")}
                    </span>
                  )}
                  <p className="mt-1 text-sm font-semibold leading-snug text-gray-800 group-hover:text-red-600 transition-colors line-clamp-3">
                    {post.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      <hr className="border-t-2 border-gray-900 my-2" />

      {/* ── CATEGORY SECTIONS ────────────────────────── */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(sections).map(([key, value]) => {
            const posts = value?.nodes ?? [];
            if (!posts.length) return null;

            const sectionSlug = key.replace(/_/g, "-");

            return (
              <div key={key}>
                {/* Section header */}
                <div className="flex items-center justify-between border-b-2 border-gray-900 pb-2 mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">
                    {formatSectionTitle(key)}
                  </h2>
                  <Link
                    href={`/${sectionSlug}`}
                    className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
                  >
                    See all →
                  </Link>
                </div>

                {/* Posts */}
                <div className="flex flex-col gap-4">
                  {posts.map((post, i) => (
                    <Link
                      key={post.slug}
                      href={`/${sectionSlug}/${post.slug}`}
                      className="flex gap-3 group"
                    >
                      {post.featuredImage?.node?.sourceUrl && (
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.title}
                          width={96}
                          height={64}
                          className="w-24 h-16 object-cover rounded shrink-0"
                        />
                      )}
                      <p className={`leading-snug group-hover:text-red-600 transition-colors line-clamp-3 text-gray-800 ${i === 0 ? "text-sm font-semibold" : "text-sm font-medium"}`}>
                        {post.title}
                      </p>
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