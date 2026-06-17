import Image from "next/image";
import Link from "next/link";
import { getPostUrl } from "../../lib/util";

export default function CategorySection({ title, categorySlug, posts = [] }) {
  if (!posts || posts.length === 0) return null;

  // 1 Lead post and up to 9 list posts
  const leadPost = posts[0];
  const listPosts = posts.slice(1, 10);

  return (
    <section className="py-6 border-b border-zinc-200 last:border-0 font-sans">
      {/* Section Title Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-6 select-none">
        <Link href={`/${categorySlug}`} className="group/title flex items-center gap-1.5">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 group-hover/title:text-[#f99d1b] transition-colors font-sans">
            {title}
          </h2>
          <span className="text-[#f99d1b] font-bold text-lg leading-none select-none group-hover/title:translate-x-1 transition-transform">&gt;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 1. LEAD POST (Big Overlay Card) */}
        {leadPost && (
          <div className="lg:col-span-6 group">
            <Link
              href={getPostUrl(leadPost, categorySlug)}
              className="relative block aspect-[4/3] bg-zinc-950 border border-zinc-200 overflow-hidden"
            >
              {leadPost.featuredImage?.node?.sourceUrl ? (
                <Image
                  src={leadPost.featuredImage.node.sourceUrl}
                  alt={leadPost.title}
                  fill
                  className="object-cover opacity-85 group-hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-w-1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center text-[#f99d1b]/20 font-bold text-lg select-none uppercase tracking-widest">
                  News Eisamay
                </div>
              )}

              {/* Text Overlay Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent flex flex-col justify-end p-5 sm:p-7">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#f99d1b] mb-1.5">
                  {title}
                </span>
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-extrabold leading-tight group-hover:text-[#f99d1b] transition-colors font-sans">
                  {leadPost.title}
                </h3>
                {leadPost.excerpt && (
                  <p className="text-zinc-300 text-xs sm:text-sm mt-2 line-clamp-2 font-serif italic">
                    {leadPost.excerpt.replace(/<[^>]*>/g, "")}
                  </p>
                )}
                <span className="text-[9px] text-zinc-400 mt-3.5 block uppercase tracking-wider font-bold">
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

        {/* 2. SUB POSTS (List layout) */}
        <div className="lg:col-span-6 space-y-4">
          {listPosts.length > 0 ? (
            <div className="divide-y divide-zinc-200">
              {listPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={getPostUrl(post, categorySlug)}
                  className="group flex gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  {/* Left Thumbnail */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-zinc-50 border border-zinc-200 shrink-0 overflow-hidden">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-w-640px) 80px, 96px"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-100 text-zinc-400 flex items-center justify-center font-bold text-xs select-none">
                        NE
                      </div>
                    )}
                  </div>

                  {/* Right Content */}
                  <div className="flex flex-col justify-center">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#f99d1b] mb-1 select-none">
                      {title}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-[#f99d1b] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h4>
                    <span className="text-[10px] text-zinc-550 font-bold mt-1.5 block">
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
            <div className="text-zinc-400 text-xs italic py-4 select-none">
              No additional stories in this section.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
