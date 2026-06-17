import Image from "next/image";
import Link from "next/link";
import { getPostUrl } from "../../lib/util";

export default function CategoryLayout3({ title, categorySlug, posts = [] }) {
  if (!posts || posts.length === 0) return null;

  const leadPost = posts[0];
  const sidePosts = posts.slice(1, 3); // Up to 2 side posts

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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stacked Side Stories (1/3 width on desktop) */}
        <div className="order-2 md:order-1 md:col-span-4 md:border-r md:border-zinc-200 md:pr-8 pb-6 md:pb-0">
          {sidePosts.length > 0 ? (
            <div className="flex flex-col gap-6 divide-y divide-zinc-200">
              {sidePosts.map((post, idx) => {
                const postImage = post.featuredImage?.node?.sourceUrl;
                const postTitle = post.title || "";
                const postLink = getPostUrl(post, categorySlug);
                return (
                  <div key={post.slug} className={`group flex flex-col gap-3 ${idx > 0 ? "pt-6" : ""}`}>
                    <Link href={postLink} className="block relative aspect-[16/10] w-full border border-zinc-100 bg-zinc-50 overflow-hidden">
                      {postImage ? (
                        <Image
                          src={postImage}
                          alt={postTitle}
                          fill
                          className="object-cover group-hover:scale-102 transition-transform duration-300"
                          sizes="(max-w-768px) 100vw, 30vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-100 text-zinc-400 flex items-center justify-center font-bold text-xs select-none">
                          NO IMAGE
                        </div>
                      )}
                    </Link>
                    <Link href={postLink} className="block mt-1">
                      <h4 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-[#f99d1b] transition-colors leading-snug font-sans">
                        {postTitle}
                      </h4>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-zinc-400 text-xs italic py-4 select-none">
              No additional stories in this section.
            </div>
          )}
        </div>

        {/* Right Column: Lead Story (2/3 width on desktop) */}
        <div className="order-1 md:order-2 md:col-span-8 md:pl-8 pt-6 md:pt-0">
          {leadPost && (
            <div className="group flex flex-col gap-4">
              
              {/* Headline */}
              <Link href={getPostUrl(leadPost, categorySlug)} className="block">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-black leading-tight group-hover:text-[#f99d1b] transition-colors font-sans">
                  {leadPost.title}
                </h3>
              </Link>

              {/* Large image below the headline */}
              <Link href={getPostUrl(leadPost, categorySlug)} className="block relative aspect-[4/3] w-full border border-zinc-200 overflow-hidden bg-zinc-50">
                {leadPost.featuredImage?.node?.sourceUrl ? (
                  <Image
                    src={leadPost.featuredImage.node.sourceUrl}
                    alt={leadPost.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    sizes="(max-w-1024px) 100vw, 55vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold text-lg select-none uppercase tracking-widest">
                    NO IMAGE
                  </div>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
