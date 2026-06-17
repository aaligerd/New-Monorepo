import Image from "next/image";
import Link from "next/link";
import { getPostUrl } from "../../lib/util";

export default function CategoryLayout5({ title, categorySlug, posts = [] }) {
  if (!posts || posts.length === 0) return null;

  const cards = posts.slice(0, 3); // Get top 3 posts

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((post) => {
          const postImage = post.featuredImage?.node?.sourceUrl;
          const postTitle = post.title || "";
          const postLink = getPostUrl(post, categorySlug);

          return (
            <div key={post.slug} className="flex flex-col gap-3 group pb-2">
              {/* Card Image */}
              <Link href={postLink} className="block relative aspect-[16/10] w-full border border-zinc-150 bg-zinc-50 overflow-hidden">
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

              {/* Title link */}
              <Link href={postLink} className="block mt-1">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-black group-hover:text-[#f99d1b] transition-colors leading-snug font-sans">
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
