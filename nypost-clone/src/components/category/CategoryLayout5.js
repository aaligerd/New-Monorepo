import Image from "next/image";
import Link from "next/link";
import { getPostUrl } from "../../lib/util";

export default function CategoryLayout5({ title, categorySlug, posts = [] }) {
  if (!posts || posts.length === 0) return null;

  const cards = posts.slice(0, 3); // Get top 3 posts

  return (
    <section className="py-6 border-b-2 border-zinc-200 last:border-0 font-sans">
      {/* Section Title Header */}
      <div className="flex items-center justify-between border-b-4 border-[#f99d1b] pb-1.5 mb-6">
        <h2 className="text-xl sm:text-4xl font-black uppercase tracking-tight text-[#f99d1b] font-display" style={{ fontFamily: "var(--font-oswald)" }}>
          {title}
        </h2>
        {/* <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#f99d1b] bg-black px-2.5 py-0.5 select-none">
          LATEST
        </span> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((post) => {
          const postImage = post.featuredImage?.node?.sourceUrl;
          const postTitle = post.title || "";
          const postLink = getPostUrl(post, categorySlug);
          const categoryName = post.categories?.nodes?.[0]?.name || title;

          return (
            <div key={post.slug} className="flex flex-col gap-3 group pb-2">
              {/* Card Image */}
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

              {/* Skewed Red Badge */}
              <div className="flex select-none">
                <span className="inline-block border border-[#f99d1b] -skew-x-12 px-2 py-0.5">
                  <span className="inline-block skew-x-12 text-[#f99d1b] text-[10px] font-black italic uppercase tracking-wider font-sans leading-none">
                    {categoryName}
                  </span>
                </span>
              </div>

              {/* Title link */}
              <Link href={postLink} className="block mt-1">
                <h3 className="text-base sm:text-lg md:text-[19px] font-black text-black leading-snug transition-colors font-sans">
                  {postTitle}
                </h3>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
