"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope, faLink, faCheck, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { getPostUrl, getHierarchicalCategories, stripHtml } from "../../lib/util";
import WpContentRenderer from "../wordpress/WpContentRenderer";
import AdSlot from "../ads/AdSlot";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getReadingTime(htmlContent) {
  if (!htmlContent) return 1;
  const text = htmlContent.replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 225)); // 225 words per minute average
}

export default function ArticlePage({ post, l1slug, l2slug }) {
  console.log(post);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [latestPosts, setLatestPosts] = useState([]);

  // Get reading time
  const readingTime = getReadingTime(post.content);

  // Set URL on client side mount
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // Track scrolling progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch trending posts
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9595/bff/api";
    fetch(`${apiUrl}/posts/latest?limit=6`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setLatestPosts(json.data);
        }
      })
      .catch((err) => console.error("Error fetching latest posts for sidebar:", err));
  }, []);

  // Filter out the current post from the trending list
  const trendingStories = latestPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 5);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " - " + currentUrl)}`,
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: l1slug.replace(/-/g, " "), href: `/${l1slug}` },
    ...(l2slug
      ? [{ label: l2slug.replace(/-/g, " "), href: `/${l1slug}/${l2slug}` }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-[#f7f6f2] pb-24 lg:pb-12">
      {/* Sticky Reading Progress Bar (top of viewport) */}
      <div className="sticky top-0 left-0 w-full h-1 bg-gray-200/50 z-30">
        <div
          className="h-full bg-red-600 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Main Article Body */}
          <article className="lg:col-span-8 bg-white p-5 sm:p-8 md:p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100/80">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-[11px] font-semibold tracking-wide text-gray-400 mb-5 flex-wrap">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1">
                  {i > 0 && <span className="text-gray-300 font-normal">/</span>}
                  <Link
                    href={crumb.href}
                    className="hover:text-red-600 transition-colors uppercase"
                  >
                    {crumb.label}
                  </Link>
                </span>
              ))}
              <span className="text-gray-300 font-normal">/</span>
              <span className="text-gray-400 truncate max-w-[150px] sm:max-w-[240px]">
                {post.title}
              </span>
            </nav>

            {/* Category tag */}
            {post.categories?.nodes?.[0] && (
              <Link
                href={`/${post.categories.nodes[0].slug}`}
                className="inline-block mb-3 text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors border-b-2 border-red-600 pb-0.5"
              >
                {post.categories.nodes[0].name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.15] font-bold text-gray-900 mb-5 font-display">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-base sm:text-lg text-gray-600 leading-relaxed border-l-4 border-red-600 pl-4 mb-6 italic bg-gray-50/50 py-2 pr-2 rounded-r-lg">
                {post.excerpt.replace(/<[^>]*>/g, "")}
              </div>
            )}

            {/* Author / Date Meta Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-6 border-y border-gray-100">
              <div className="flex items-center gap-2.5">
                {/* Initials fallback for author profile */}
                <div className="w-9 h-9 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 font-bold uppercase text-xs select-none">
                  {post.author?.node?.name ? post.author.node.name.charAt(0) : "S"}
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block uppercase tracking-wider font-bold">
                    Written By
                  </span>
                  <span className="text-xs font-bold text-gray-800 hover:text-red-600 transition-colors">
                    {post.author?.node?.name || "Staff Writer"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                  <span>{readingTime} Min Read</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                <div>{formatDate(post.date)}</div>
              </div>
            </div>

            {/* Share buttons (Inline) */}
            <div className="flex items-center gap-2.5 mb-6 pb-2 border-b border-gray-100 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 mr-1.5">
                <FontAwesomeIcon icon={faShareNodes} /> Share:
              </span>
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200"
                title="Share on Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} size="xs" />
              </a>
              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-gray-50 text-gray-800 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-200"
                title="Share on Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} size="xs" />
              </a>
              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-200"
                title="Share on WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} size="xs" />
              </a>
              <button
                onClick={handleCopyLink}
                className="w-7 h-7 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-200 cursor-pointer"
                title="Copy Link"
              >
                <FontAwesomeIcon icon={copied ? faCheck : faLink} size="xs" />
              </button>
            </div>

            {/* Featured image */}
            {post.featuredImage?.node?.sourceUrl && (
              <figure className="mb-6 overflow-hidden rounded-xl border border-gray-100 bg-white">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  width={850}
                  height={480}
                  className="w-full object-cover aspect-video hover:scale-[1.01] transition-transform duration-500"
                  priority
                />
                {post.featuredImage.node.altText && (
                  <figcaption className="p-3 text-[11px] text-gray-400 text-center border-t border-gray-50 bg-gray-50/30 font-medium">
                    {post.featuredImage.node.altText}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Article Content */}
            {post.content && (
              <WpContentRenderer html={post.content} />
            )}

            {/* Bottom Content Ad */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <AdSlot type="leaderboard" id="article-bottom" />
            </div>
          </article>

          {/* RIGHT COLUMN: Sidebar (flows below article on mobile, stays sticky on desktop) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20 self-start pb-8 lg:pb-0">
            {/* Sidebar Banner Ad */}
            <AdSlot type="sidebar" id="article-sidebar" />

            {/* Newsletter Block */}
            <div className="bg-gray-900 text-white p-6 rounded-2xl border border-gray-800 shadow-sm relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-red-600/10 blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider">The Eastern Letter</h3>
              </div>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed font-sans">
                Get the most critical news and insights from Eastern India delivered straight to your inbox daily.
              </p>
              {subscribed ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheck} />
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-gray-800/80 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans"
                  />
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer font-sans"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Trending Stories List */}
            {trendingStories.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b-2 border-red-600 pb-2 mb-4">
                  Trending Stories
                </h3>
                <div className="divide-y divide-gray-100">
                  {trendingStories.map((item, index) => (
                    <Link
                      key={item.slug}
                      href={getPostUrl(item)}
                      className="group flex gap-3.5 py-3.5 first:pt-0 last:pb-0"
                    >
                      <span className="text-2xl font-black text-gray-200 group-hover:text-red-500 transition-colors w-7 text-center shrink-0">
                        {index + 1}
                      </span>
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 block">
                          {new Date(item.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* MOBILE STICKY SHARE BAR (floats at bottom of viewport, hidden on lg screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur border-t border-gray-100 py-3 px-5 flex items-center justify-between z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.06)]">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
          Share Article
        </span>
        <div className="flex gap-2.5">
          <a
            href={shareUrls.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm"
          >
            <FontAwesomeIcon icon={faFacebook} size="xs" />
          </a>
          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-gray-950 text-white flex items-center justify-center shadow-sm"
          >
            <FontAwesomeIcon icon={faTwitter} size="xs" />
          </a>
          <a
            href={shareUrls.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm"
          >
            <FontAwesomeIcon icon={faWhatsapp} size="xs" />
          </a>
          <button
            onClick={handleCopyLink}
            className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-sm cursor-pointer"
          >
            <FontAwesomeIcon icon={copied ? faCheck : faLink} size="xs" />
          </button>
        </div>
      </div>

      {/* Copy Clipboard Success Toast */}
      {copied && (
        <div className="fixed bottom-20 lg:bottom-6 right-6 bg-gray-900/95 backdrop-blur text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 z-50 animate-slide-in-up border border-gray-800">
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-xs text-white shrink-0">
            ✓
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            Link copied to clipboard!
          </span>
        </div>
      )}
    </div>
  );
}
