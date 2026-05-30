import Image from "next/image";
import Link from "next/link";
import { getPostUrl } from "../../lib/util";

export default function CategorySection({ title, categorySlug, posts = [] }) {
  if (!posts || posts.length === 0) return null;

  // 1 Lead post and up to 9 list posts
  const leadPost = posts[0];
  const listPosts = posts.slice(1, 10);

  return (
    <section className="py-8 border-b border-gray-200 last:border-0">
      {/* Section Title Header */}
      <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-6">
        <h2 className="text-xl font-black uppercase tracking-tight text-gray-900 font-display">
          {title}
        </h2>
        <span className="text-[10px] font-black uppercase tracking-widest text-red-600 select-none">
          Latest Stories
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 1. LEAD POST (1/2 width on desktop: Big Overlay Card) */}
        {leadPost && (
          <div className="lg:col-span-6 group">
            <Link
              href={getPostUrl(leadPost, categorySlug)}
              className="relative block aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 shadow-sm border border-gray-100"
            >
              {leadPost.featuredImage?.node?.sourceUrl ? (
                <Image
                  src={leadPost.featuredImage.node.sourceUrl}
                  alt={leadPost.title}
                  fill
                  className="object-cover opacity-85 group-hover:scale-[1.03] transition-transform duration-700"
                  sizes="(max-w-1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-red-800 to-gray-900 flex items-center justify-center text-white/20 select-none">
                  The Eastern Gazette
                </div>
              )}

              {/* Text Overlay Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent flex flex-col justify-end p-5 sm:p-8">
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-red-400 mb-2">
                  {title}
                </span>
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight font-display group-hover:text-red-300 transition-colors">
                  {leadPost.title}
                </h3>
                {leadPost.excerpt && (
                  <p className="text-gray-300 text-xs sm:text-sm mt-2.5 line-clamp-2 font-serif italic">
                    {leadPost.excerpt.replace(/<[^>]*>/g, "")}
                  </p>
                )}
                <span className="text-[10px] text-gray-400 mt-3 block uppercase tracking-wider">
                  {new Date(leadPost.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* 2. SUB POSTS (1/2 width on desktop: 9 Small List Cards) */}
        <div className="lg:col-span-6 space-y-4">
          {listPosts.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {listPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={getPostUrl(post, categorySlug)}
                  className="group flex gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  {/* Small Left Thumbnail */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-w-640px) 80px, 96px"
                      />
                    ) : (
                      <div className="w-full h-full bg-red-50 text-red-650 flex items-center justify-center font-bold text-xs select-none">
                        EG
                      </div>
                    )}
                  </div>

                  {/* Right Content */}
                  <div className="flex flex-col justify-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-red-600 mb-1 select-none">
                      {title}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h4>
                    <span className="text-[10px] text-gray-400 mt-1.5 block">
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-xs italic py-4 select-none">
              No additional stories in this section.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
