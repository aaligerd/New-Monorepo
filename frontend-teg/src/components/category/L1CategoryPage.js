import Link from "next/link";
import Image from "next/image";
import { getPostUrl } from "../../lib/util";

export default function L1CategoryPage({ l1slug, data }) {
  const posts = data?.posts?.nodes ?? [];

  return (
    <main className="max-w-[1360px] mx-auto px-4 sm:px-6 py-8 font-sans">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-brutal-black/60 mb-6 font-bold uppercase tracking-wider">
        <Link href="/" className="hover:text-accent-coral transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brutal-black font-black">{l1slug.replace(/-/g, " ")}</span>
      </nav>

      {/* Header */}
      <div className="border-b-[3px] border-brutal-black pb-4 mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white bg-brutal-black border-[3px] border-brutal-black px-4 py-2 rounded-[8px] font-brutal shadow-[4px_4px_0px_#f4a261] w-fit">
          {l1slug.replace(/-/g, " ")}
        </h1>
      </div>

      {!data ? (
        <p className="text-brutal-black/60 text-sm font-black uppercase italic">
          Category endpoint not yet implemented. Posts for{" "}
          <strong>{l1slug}</strong> will appear here.
        </p>
      ) : posts.length === 0 ? (
        <p className="text-brutal-black/60 text-sm font-black uppercase italic">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={getPostUrl(post, l1slug)}
              className="group flex flex-col gap-3 bg-white border-[3px] border-brutal-black rounded-[16px] p-4 shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-300"
            >
              {post.featuredImage?.node?.sourceUrl ? (
                <div className="relative w-full aspect-video rounded-[12px] overflow-hidden border-[2px] border-brutal-black shrink-0">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, 30vw"
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-video rounded-[12px] bg-accent-orange/10 border-[2px] border-brutal-black flex items-center justify-center text-brutal-black/35 font-brutal uppercase text-xs select-none">
                  TEG NEWS
                </div>
              )}
              <h2 className="text-sm font-black text-brutal-black group-hover:text-accent-coral transition-colors leading-snug line-clamp-3 font-brutal uppercase tracking-tight">
                {post.title}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
