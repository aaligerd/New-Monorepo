"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope, faLink, faCheck, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { getPostUrl, stripHtml, getAuthorName } from "../../lib/util";
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
  return Math.max(1, Math.ceil(words / 225));
}

export default function ArticlePage({ post, l1slug, l2slug }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [latestPosts, setLatestPosts] = useState([]);

  const readingTime = getReadingTime(post.content);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

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
    ...(l2slug ? [{ label: l2slug.replace(/-/g, " "), href: `/${l1slug}/${l2slug}` }] : []),
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9] pb-24 lg:pb-12 font-sans">
      {/* Sticky Reading Progress Bar (top of viewport) */}
      <div className="sticky top-0 left-0 w-full h-1.5 bg-zinc-200/50 z-30">
        <div
          className="h-full bg-[#f99d1b] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Main Article Body */}
          <article className="lg:col-span-8 bg-white p-5 sm:p-8 border-2 border-zinc-200">
            
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-5 flex-wrap">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1">
                  {i > 0 && <span className="text-zinc-300 font-normal">/</span>}
                  <Link href={crumb.href} className="hover:text-[#f99d1b] transition-colors">
                    {crumb.label}
                  </Link>
                </span>
              ))}
              <span className="text-zinc-300 font-normal">/</span>
              <span className="text-zinc-550 truncate max-w-[150px] sm:max-w-[240px]">
                {post.title}
              </span>
            </nav>

            {/* Category tag */}
            {post.categories?.nodes?.[0] && (
              <Link
                href={`/${post.categories.nodes[0].slug}`}
                className="inline-block mb-3 text-[10px] font-black uppercase tracking-widest text-black bg-[#f99d1b] px-3 py-1 hover:bg-black hover:text-[#f99d1b] transition-colors"
              >
                {post.categories.nodes[0].name}
              </Link>
            )}

            {/* Title */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-[46px] lg:leading-[1.1] font-black text-black mb-5 font-display uppercase"
              style={{ fontFamily: "var(--font-oswald)", letterSpacing: "-0.02em" }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-base sm:text-lg text-zinc-700 leading-relaxed border-l-4 border-[#f99d1b] pl-4 mb-6 italic bg-zinc-50 py-3 pr-2 font-serif">
                {post.excerpt.replace(/<[^>]*>/g, "")}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-6 border-y-2 border-zinc-200 bg-zinc-50/50 px-4">
              {(() => {
                const authorName = getAuthorName(post.author?.node);
                const initial = authorName ? authorName.charAt(0) : "N";
                return (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black border border-zinc-800 text-[#f99d1b] flex items-center justify-center font-black uppercase text-sm select-none">
                      {initial}
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-bold">
                        WRITTEN BY
                      </span>
                      <span className="text-sm font-black text-black hover:text-[#f99d1b] transition-colors">
                        {authorName}
                      </span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 text-xs font-bold text-zinc-550">
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faClock} className="text-[#f99d1b]" />
                  <span>{readingTime} MIN READ</span>
                </div>
                <div className="w-1.5 h-1.5 bg-[#f99d1b]" />
                <div>{formatDate(post.date).toUpperCase()}</div>
              </div>
            </div>

            {/* Share buttons (Inline) */}
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-zinc-100 flex-wrap font-sans">
              <span className="text-[10px] font-black uppercase tracking-wider text-black flex items-center gap-1.5 mr-2 bg-zinc-100 px-2 py-1">
                <FontAwesomeIcon icon={faShareNodes} className="text-[#f99d1b]" /> SHARE STORY
              </span>
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-zinc-100 text-blue-600 border border-zinc-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all rounded-sm"
                title="Share on Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-sm" />
              </a>
              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-zinc-100 text-zinc-800 border border-zinc-200 flex items-center justify-center hover:bg-black hover:text-white transition-all rounded-sm"
                title="Share on Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-sm" />
              </a>
              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-zinc-100 text-emerald-600 border border-zinc-200 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all rounded-sm"
                title="Share on WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
              </a>
              <button
                onClick={handleCopyLink}
                className="w-8 h-8 bg-zinc-100 text-zinc-650 border border-zinc-200 flex items-center justify-center hover:bg-[#f99d1b] hover:text-black transition-all rounded-sm cursor-pointer"
                title="Copy Link"
              >
                <FontAwesomeIcon icon={copied ? faCheck : faLink} className="text-sm" />
              </button>
            </div>

            {/* Featured image */}
            {post.featuredImage?.node?.sourceUrl && (
              <figure className="mb-6 border border-zinc-200 bg-white">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  width={850}
                  height={480}
                  className="w-full object-cover aspect-video hover:scale-[1.01] transition-transform duration-500"
                  priority
                />
                {post.featuredImage.node.altText && (
                  <figcaption className="p-3 text-xs text-zinc-500 text-center border-t border-zinc-150 bg-zinc-50 font-bold italic">
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
            <div className="mt-8 pt-6 border-t border-zinc-200">
              <AdSlot type="leaderboard" id="article-bottom" />
            </div>
          </article>

          {/* RIGHT COLUMN: Sidebar (flows below article on mobile) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start pb-8 lg:pb-0 font-sans">
            <AdSlot type="sidebar" id="article-sidebar" />

            {/* Newsletter Block */}
            <div className="bg-black text-white p-6 border-4 border-[#f99d1b] shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3.5">
                <div className="w-8 h-8 bg-[#f99d1b] text-black flex items-center justify-center rounded-sm">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider font-display" style={{ fontFamily: "var(--font-oswald)" }}>EISAMAY BULLETIN</h3>
              </div>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed font-bold">
                Get the most critical news and regional alerts delivered straight to your inbox daily.
              </p>
              {subscribed ? (
                <div className="bg-[#f99d1b] text-black p-3 text-xs font-black uppercase flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheck} />
                  SUBSCRIBED SUCCESSFULLY!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-sm px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#f99d1b] transition-all font-bold"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#f99d1b] text-black text-xs font-black uppercase tracking-wider py-2.5 transition-all shadow-md active:scale-95 cursor-pointer hover:bg-white"
                  >
                    SUBSCRIBE NOW
                  </button>
                </form>
              )}
            </div>

            {/* Trending Stories List */}
            {trendingStories.length > 0 && (
              <div className="bg-white p-5 border-2 border-zinc-200">
                <h3 className="text-sm font-black uppercase tracking-widest text-black border-b-4 border-black pb-2 mb-4 font-display" style={{ fontFamily: "var(--font-oswald)" }}>
                  MOST POPULAR
                </h3>
                <div className="divide-y divide-zinc-200">
                  {trendingStories.map((item, index) => (
                    <Link
                      key={item.slug}
                      href={getPostUrl(item)}
                      className="group flex gap-3.5 py-3.5 first:pt-0 last:pb-0"
                    >
                      <span className="text-3xl font-black text-[#f99d1b] w-8 text-center shrink-0 font-display" style={{ fontFamily: "var(--font-oswald)" }}>
                        {index + 1}
                      </span>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-zinc-900 group-hover:text-[#f99d1b] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase block">
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

      {/* MOBILE STICKY SHARE BAR (floats at bottom, hidden on lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t-2 border-black py-3 px-5 flex items-center justify-between z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
        <span className="text-[10px] font-black uppercase tracking-widest text-black">
          SHARE STORY
        </span>
        <div className="flex gap-2">
          <a
            href={shareUrls.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-zinc-150 border border-zinc-200 text-blue-600 flex items-center justify-center rounded-sm"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-sm" />
          </a>
          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-zinc-150 border border-zinc-200 text-black flex items-center justify-center rounded-sm"
          >
            <FontAwesomeIcon icon={faTwitter} className="text-sm" />
          </a>
          <a
            href={shareUrls.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-zinc-150 border border-zinc-200 text-emerald-600 flex items-center justify-center rounded-sm"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
          </a>
          <button
            onClick={handleCopyLink}
            className="w-8 h-8 bg-[#f99d1b] text-black flex items-center justify-center rounded-sm cursor-pointer"
          >
            <FontAwesomeIcon icon={copied ? faCheck : faLink} className="text-sm" />
          </button>
        </div>
      </div>

      {/* Toast popup */}
      {copied && (
        <div className="fixed bottom-20 lg:bottom-6 right-6 bg-black text-white px-4 py-3 shadow-xl flex items-center gap-2.5 z-50 animate-slide-in-up border-2 border-[#f99d1b]">
          <div className="w-5 h-5 bg-[#f99d1b] text-black font-black flex items-center justify-center text-xs shrink-0">
            <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
          </div>
          <span className="text-xs sm:text-sm font-black uppercase tracking-wide font-sans">
            LINK COPIED!
          </span>
        </div>
      )}
    </div>
  );
}
