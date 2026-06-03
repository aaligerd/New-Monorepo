import Image from "next/image";
import Link from "next/link";
import { getPostUrl } from "../../lib/util";

export default function CategorySection({ title, categorySlug, posts = [] }) {
  if (!posts || posts.length === 0) return null;

  // 1 Lead post and up to 9 list posts
  const leadPost = posts[0];
  const listPosts = posts.slice(1, 10);

  return (
    <section className="py-8 border-b-[3px] border-brutal-black last:border-0">
      {/* Section Title Header */}
      <div className="flex items-center justify-between border-b-[3px] border-brutal-black pb-3 mb-8">
        <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white bg-brutal-black border-[3px] border-brutal-black px-4 py-1.5 rounded-[8px] font-brutal shadow-[3px_3px_0px_#f4a261]">
          {title}
        </h2>
        <span className="text-[10px] font-black uppercase tracking-widest bg-accent-coral/20 border-[2px] border-brutal-black px-2.5 py-1 rounded-[4px] text-brutal-black select-none shadow-[2px_2px_0px_#111]">
          Stories
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 1. LEAD POST (Card with offset shadow) */}
        {leadPost && (
          <div className="lg:col-span-6">
            <Link
              href={getPostUrl(leadPost, categorySlug)}
              className="relative block aspect-[4/3] rounded-[16px] overflow-hidden bg-white border-[3px] border-brutal-black shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-300 group"
            >
              {leadPost.featuredImage?.node?.sourceUrl ? (
                <Image
                  src={leadPost.featuredImage.node.sourceUrl}
                  alt={leadPost.title}
                  fill
                  className="object-cover opacity-90 group-hover:scale-102 transition-transform duration-700"
                  sizes="(max-w-1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-accent-orange/10 flex items-center justify-center text-brutal-black/20 font-brutal uppercase text-xl select-none">
                  The Eastern Gazette
                </div>
              )}

              {/* Text Overlay Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-brutal-black via-brutal-black/60 to-transparent flex flex-col justify-end p-5 sm:p-8">
                <span className="inline-block text-[10px] font-black uppercase tracking-wider text-accent-orange bg-brutal-black border-[2px] border-brutal-black px-2 py-0.5 rounded-[4px] w-fit mb-3">
                  {title}
                </span>
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-black leading-tight font-brutal uppercase tracking-tight group-hover:text-accent-orange transition-colors">
                  {leadPost.title}
                </h3>
                {leadPost.excerpt && (
                  <p className="text-canvas/90 text-xs sm:text-sm mt-2 line-clamp-2 font-sans font-bold">
                    {leadPost.excerpt.replace(/<[^>]*>/g, "")}
                  </p>
                )}
                <span className="text-[10px] font-bold text-white/60 mt-3 block uppercase tracking-wider">
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

        {/* 2. SUB POSTS (Right column: Small list items with borders) */}
        <div className="lg:col-span-6 space-y-4">
          {listPosts.length > 0 ? (
            <div className="divide-y-[2px] divide-brutal-black/10">
              {listPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={getPostUrl(post, categorySlug)}
                  className="group flex gap-4 py-3.5 first:pt-0 last:pb-0 hover:bg-accent-orange/5 rounded-[8px] px-2 transition-all"
                >
                  {/* Small Left Thumbnail */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-[12px] overflow-hidden shrink-0 border-[2px] border-brutal-black shadow-[2px_2px_0px_#111] group-hover:-translate-y-0.5 group-hover:shadow-[3px_3px_0px_#111] transition-all">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-w-640px) 80px, 96px"
                      />
                    ) : (
                      <div className="w-full h-full bg-accent-orange/15 text-brutal-black/40 flex items-center justify-center font-black text-[10px] uppercase select-none">
                        TEG
                      </div>
                    )}
                  </div>

                  {/* Right Content */}
                  <div className="flex flex-col justify-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-accent-coral mb-1 select-none">
                      {title}
                    </span>
                    <h4 className="text-sm font-black text-brutal-black group-hover:text-accent-coral transition-colors leading-snug line-clamp-2 font-brutal uppercase tracking-tight">
                      {post.title}
                    </h4>
                    <span className="text-[10px] font-bold text-brutal-black/55 mt-1.5 block">
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
            <div className="text-brutal-black/40 text-xs font-black uppercase italic py-4 select-none">
              No additional stories in this section.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
