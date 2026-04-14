// src/components/article/ArticlePage.js

import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ArticlePage({ post, l1slug, l2slug }) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: l1slug.replace(/-/g, " "), href: `/${l1slug}` },
    ...(l2slug
      ? [{ label: l2slug.replace(/-/g, " "), href: `/${l1slug}/${l2slug}` }]
      : []),
  ];

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-400 mb-6 flex-wrap">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && <span>/</span>}
            <Link href={crumb.href} className="hover:text-red-500 transition-colors capitalize">
              {crumb.label}
            </Link>
          </span>
        ))}
        <span>/</span>
        <span className="text-gray-300 truncate max-w-[200px]">{post.title}</span>
      </nav>

      {/* Category tag */}
      {post.categories?.nodes?.[0] && (
        <Link
          href={`/${post.categories.nodes[0].slug}`}
          className="inline-block mb-4 text-[11px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
        >
          {post.categories.nodes[0].name}
        </Link>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold leading-snug text-gray-900 mb-4">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-base text-gray-600 leading-relaxed border-l-4 border-red-500 pl-4 mb-6 italic">
          {post.excerpt.replace(/<[^>]*>/g, "")}
        </p>
      )}

      {/* Author + date */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
        {post.author?.node?.avatar?.url && (
          <Image
            // src={post.author.node.avatar.url}
            src={``}
            alt={post.author.node.name}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full"
          />
        )}
        <div>
          {post.author?.node?.name && (
            <p className="text-sm font-semibold text-gray-800">{post.author.node.name}</p>
          )}
          {post.date && (
            <p className="text-xs text-gray-400">{formatDate(post.date)}</p>
          )}
        </div>
      </div>

      {/* Featured image */}
      {post.featuredImage?.node?.sourceUrl && (
        <figure className="mb-8">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            width={800}
            height={450}
            className="w-full rounded object-cover"
            priority
          />
          {post.featuredImage.node.altText && (
            <figcaption className="mt-2 text-xs text-gray-400 text-center">
              {post.featuredImage.node.altText}
            </figcaption>
          )}
        </figure>
      )}

      {/* Article body */}
      {post.content && (
        <div
          className="prose prose-gray max-w-none
            prose-p:leading-relaxed prose-p:text-gray-700
            prose-h2:text-xl prose-h2:font-bold prose-h2:text-gray-900
            prose-h3:text-lg prose-h3:font-semibold
            prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded prose-img:w-full
            prose-blockquote:border-red-500 prose-blockquote:text-gray-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}

    </main>
  );
}
