// src/components/category/L1CategoryPage.js
import Link from "next/link";
import Image from "next/image";
import { getPostUrl, formatPostDate } from "../../lib/util";

export default function L1CategoryPage({ l1slug, data }) {
  const posts = data?.posts?.nodes ?? [];

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-[10%] py-8 font-sans bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-zinc-400 font-bold tracking-wider mb-6">
        <Link href="/" className="hover:text-[#f99d1b] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-zinc-600 dark:text-zinc-400 capitalize">{l1slug.replace(/-/g, " ")}</span>
      </nav>

      {/* Header */}
      <div className="border-b-4 border-black dark:border-zinc-800 pb-2.5 mb-8">
        <h1 
          className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black dark:text-white font-display" 
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {l1slug.replace(/-/g, " ")}
        </h1>
      </div>

      {!data ? (
        <p className="text-zinc-500 text-sm italic font-semibold">
          Loading section content...
        </p>
      ) : posts.length === 0 ? (
        <p className="text-zinc-500 text-sm italic font-semibold">No posts found in this section.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => {
            const image = post.featuredImage?.node?.sourceUrl;
            const title = post.title || "";
            const dateText = formatPostDate(post.date);
            const link = getPostUrl(post, l1slug);

            return (
              <Link
                key={post.slug}
                href={link}
                className="group flex flex-col gap-4 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-4 hover:border-[#f99d1b] dark:hover:border-[#f99d1b] transition-all rounded-sm shadow-sm"
              >
                {image ? (
                  <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-900 rounded-sm overflow-hidden shrink-0">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-900 rounded-sm overflow-hidden flex items-center justify-center text-zinc-300 dark:text-zinc-700 text-xs font-bold font-sans shrink-0">
                    NO IMAGE
                  </div>
                )}
                <div className="flex flex-col flex-grow justify-between gap-3 text-center">
                  <h2 className="text-[14.5px] sm:text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors leading-snug line-clamp-3 uppercase font-serif text-center">
                    {title}
                  </h2>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold font-sans uppercase tracking-wider block mt-auto text-center w-full">
                    {dateText}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
