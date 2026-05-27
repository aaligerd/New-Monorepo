// src/components/category/L2CategoryPage.js

import Link from "next/link";
import Image from "next/image";

export default function L2CategoryPage({ l1slug, l2slug, data }) {
  const posts = data?.posts?.nodes ?? [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${l1slug}`} className="hover:text-red-500 transition-colors capitalize">
          {l1slug.replace(/-/g, " ")}
        </Link>
        <span>/</span>
        <span className="text-gray-600 capitalize">{l2slug.replace(/-/g, " ")}</span>
      </nav>

      <div className="border-b-2 border-gray-900 pb-3 mb-8">
        <p className="text-xs uppercase tracking-widest text-red-500 mb-1 capitalize">
          {l1slug.replace(/-/g, " ")}
        </p>
        <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-900 capitalize">
          {l2slug.replace(/-/g, " ")}
        </h1>
      </div>

      {!data ? (
        <p className="text-gray-500 text-sm">
          Sub-category endpoint not yet implemented. Posts for <strong>{l1slug} / {l2slug}</strong> will appear here.
        </p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-sm">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${l1slug}/${l2slug}/${post.slug}`} className="group flex flex-col gap-3">
              {post.featuredImage?.node?.sourceUrl && (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.title}
                  width={400}
                  height={240}
                  className="w-full h-44 object-cover rounded"
                />
              )}
              <p className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors leading-snug line-clamp-3">
                {post.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
