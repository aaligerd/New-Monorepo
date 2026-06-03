// src/components/category/L2CategoryPage.js
import Link from "next/link";
import Image from "next/image";
import { getPostUrl } from "../../lib/util";

export default function L2CategoryPage({ l1slug, l2slug, data }) {
  const posts = data?.posts?.nodes ?? [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <nav className="flex items-center gap-1 text-xs text-zinc-400 font-bold uppercase tracking-wider mb-6">
        <Link href="/" className="hover:text-[#f99d1b] transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${l1slug}`} className="hover:text-[#f99d1b] transition-colors capitalize">
          {l1slug.replace(/-/g, " ")}
        </Link>
        <span>/</span>
        <span className="text-zinc-650 capitalize">{l2slug.replace(/-/g, " ")}</span>
      </nav>

      <div className="border-b-4 border-black pb-2.5 mb-8">
        <p className="text-xs uppercase tracking-widest text-[#f99d1b] font-black mb-1.5 capitalize">
          {l1slug.replace(/-/g, " ")}
        </p>
        <h1 
          className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black font-display" 
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {l2slug.replace(/-/g, " ")}
        </h1>
      </div>

      {!data ? (
        <p className="text-zinc-500 text-sm italic font-semibold">
          Loading sub-section content...
        </p>
      ) : posts.length === 0 ? (
        <p className="text-zinc-500 text-sm italic font-semibold">No posts found in this sub-section.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={getPostUrl(post, `${l1slug}/${l2slug}`)} 
              className="group flex flex-col gap-3 border border-zinc-200 bg-white p-4"
            >
              {post.featuredImage?.node?.sourceUrl && (
                <div className="relative w-full h-48 bg-zinc-100 overflow-hidden">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-[#f99d1b] transition-colors leading-snug line-clamp-3 uppercase">
                {post.title}
              </h2>
              <span className="text-[10px] text-zinc-400 mt-auto font-black uppercase">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
