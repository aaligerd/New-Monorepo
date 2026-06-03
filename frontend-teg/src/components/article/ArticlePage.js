"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope, faLink, faCheck, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { getPostUrl, getHierarchicalCategories, stripHtml, getAuthorName } from "../../lib/util";
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
    ...(l2slug
      ? [{ label: l2slug.replace(/-/g, " "), href: `/${l1slug}/${l2slug}` }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-12 font-sans">
      {/* Sticky Reading Progress Bar (top of viewport) */}
      <div className="sticky top-0 left-0 w-full h-1.5 bg-canvas z-30">
        <div
          className="h-full bg-accent-coral transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Main Article Body */}
          <article className="lg:col-span-8 bg-white p-5 sm:p-8 md:p-10 rounded-[20px] border-[3px] border-brutal-black shadow-brutal">
            
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-brutal-black/60 mb-5 flex-wrap font-bold uppercase tracking-wider">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-brutal-black/30 font-normal">/</span>}
                  <Link
                    href={crumb.href}
                    className="hover:text-accent-coral transition-colors"
                  >
                    {crumb.label}
                  </Link>
                </span>
              ))}
              <span className="text-brutal-black/30 font-normal">/</span>
              <span className="text-brutal-black font-black truncate max-w-[150px] sm:max-w-[240px]">
                {post.title}
              </span>
            </nav>

            {/* Category tag */}
            {post.categories?.nodes?.[0] && (
              <Link
                href={`/${post.categories.nodes[0].slug}`}
                className="inline-block mb-4 text-[10px] font-black uppercase tracking-widest text-white bg-accent-coral border-[2px] border-brutal-black px-3 py-1 rounded-[6px] shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all"
              >
                {post.categories.nodes[0].name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] lg:leading-[1.1] font-black text-brutal-black mb-5 font-brutal uppercase tracking-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-base sm:text-lg text-brutal-black leading-relaxed border-l-[6px] border-brutal-black pl-5 mb-6 italic bg-accent-orange/15 py-3 pr-3 rounded-r-[8px] font-bold shadow-brutal border-y-[2px] border-r-[2px]">
                {post.excerpt.replace(/<[^>]*>/g, "")}
              </div>
            )}

            {/* Meta details bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-6 border-y-[3px] border-brutal-black bg-accent-orange/5 px-4 rounded-[12px]">
              {(() => {
                const authorName = getAuthorName(post.author?.node);
                const initial = authorName ? authorName.charAt(0) : "S";
                return (
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-[8px] bg-accent-orange border-[2px] border-brutal-black flex items-center justify-center text-brutal-black font-black uppercase text-xs shadow-[2px_2px_0px_#111] select-none">
                      {initial}
                    </div>
                    <div>
                      <span className="text-[9px] text-brutal-black/50 block uppercase tracking-wider font-black">
                        Written By
                      </span>
                      <span className="text-xs font-black text-brutal-black hover:text-accent-coral transition-colors">
                        {authorName}
                      </span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 text-xs font-bold text-brutal-black/70">
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faClock} className="text-brutal-black/40" />
                  <span>{readingTime} Min Read</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-brutal-black/25" />
                <div>{formatDate(post.date)}</div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b-[2px] border-brutal-black/10 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-brutal-black/50 flex items-center gap-1.5 mr-1.5">
                <FontAwesomeIcon icon={faShareNodes} /> Share:
              </span>
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white text-brutal-black flex items-center justify-center shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all"
                title="Share on Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-sm" />
              </a>
              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white text-brutal-black flex items-center justify-center shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all"
                title="Share on Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-sm" />
              </a>
              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white text-brutal-black flex items-center justify-center shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all"
                title="Share on WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
              </a>
              <button
                onClick={handleCopyLink}
                className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white text-brutal-black flex items-center justify-center shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all cursor-pointer"
                title="Copy Link"
              >
                <FontAwesomeIcon icon={copied ? faCheck : faLink} className="text-sm" />
              </button>
            </div>

            {/* Featured image */}
            {post.featuredImage?.node?.sourceUrl && (
              <figure className="mb-6 overflow-hidden rounded-[12px] border-[3px] border-brutal-black bg-white shadow-brutal">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  width={850}
                  height={480}
                  className="w-full object-cover aspect-video hover:scale-[1.01] transition-transform duration-500"
                  priority
                />
                {post.featuredImage.node.altText && (
                  <figcaption className="p-3 text-xs font-black uppercase tracking-wider text-center border-t-[3px] border-brutal-black bg-accent-orange/10">
                    {post.featuredImage.node.altText}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Article Content Parser */}
            {post.content && (
              <WpContentRenderer html={post.content} />
            )}

            {/* Bottom Content Ad */}
            <div className="mt-8 pt-6 border-t-[3px] border-brutal-black">
              <AdSlot type="leaderboard" id="article-bottom" />
            </div>
          </article>

          {/* RIGHT COLUMN: Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20 self-start pb-8 lg:pb-0">
            {/* Sidebar Banner Ad */}
            <AdSlot type="sidebar" id="article-sidebar" />

            {/* Newsletter Block */}
            <div className="bg-canvas border-[3px] border-brutal-black shadow-brutal p-6 rounded-[16px] text-brutal-black relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-[8px] border-[2px] border-brutal-black bg-accent-orange text-brutal-black flex items-center justify-center shadow-[2px_2px_0px_#111]">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider">The Eastern Letter</h3>
              </div>
              <p className="text-xs font-bold text-brutal-black/75 mb-4 leading-relaxed font-sans">
                Get the most critical news and insights from Eastern India delivered straight to your inbox daily.
              </p>
              {subscribed ? (
                <div className="bg-accent-green/10 border-[2px] border-accent-green text-accent-green p-3 rounded-[8px] text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[2px_2px_0px_#111]">
                  <FontAwesomeIcon icon={faCheck} />
                  SUBSCRIBED!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR.EMAIL@DOM.COM"
                    className="w-full bg-white border-[2px] border-brutal-black rounded-[8px] px-3.5 py-2.5 text-xs text-brutal-black font-black uppercase tracking-wider placeholder:text-brutal-black/40 focus:outline-none focus:bg-accent-orange/5"
                  />
                  <button
                    type="submit"
                    className="w-full bg-accent-coral text-white text-xs font-black uppercase tracking-wider py-2.5 border-[2px] border-brutal-black rounded-[8px] transition-all shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] active:translate-y-[1px] active:shadow-[1px_1px_0px_#111] cursor-pointer font-sans"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Trending Stories List */}
            {trendingStories.length > 0 && (
              <div className="bg-white border-[3px] border-brutal-black shadow-brutal p-5 rounded-[16px]">
                <h3 className="text-xs font-black uppercase tracking-widest text-brutal-black border-b-[2px] border-brutal-black pb-2 mb-4">
                  Trending Stories
                </h3>
                <div className="divide-y divide-brutal-black/10">
                  {trendingStories.map((item, index) => (
                    <Link
                      key={item.slug}
                      href={getPostUrl(item)}
                      className="group flex gap-3.5 py-3.5 first:pt-0 last:pb-0 hover:bg-accent-orange/5 rounded-[8px] px-1 transition-all"
                    >
                      <span className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-accent-orange text-brutal-black flex items-center justify-center text-sm font-black shrink-0 shadow-[2px_2px_0px_#111]">
                        {index + 1}
                      </span>
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-black text-brutal-black group-hover:text-accent-coral transition-colors leading-snug line-clamp-2 font-brutal uppercase tracking-tight">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-bold text-brutal-black/55 block">
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
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-canvas border-t-[3px] border-brutal-black py-3 px-5 flex items-center justify-between z-40 shadow-brutal-lg">
        <span className="text-[10px] font-black uppercase tracking-widest text-brutal-black/60">
          Share Article
        </span>
        <div className="flex gap-2.5">
          <a
            href={shareUrls.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white text-brutal-black flex items-center justify-center shadow-[2px_2px_0px_#111]"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-sm" />
          </a>
          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white text-brutal-black flex items-center justify-center shadow-[2px_2px_0px_#111]"
          >
            <FontAwesomeIcon icon={faTwitter} className="text-sm" />
          </a>
          <a
            href={shareUrls.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white text-brutal-black flex items-center justify-center shadow-[2px_2px_0px_#111]"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
          </a>
          <button
            onClick={handleCopyLink}
            className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white text-brutal-black flex items-center justify-center shadow-[2px_2px_0px_#111] cursor-pointer"
          >
            <FontAwesomeIcon icon={copied ? faCheck : faLink} className="text-sm" />
          </button>
        </div>
      </div>

      {/* Copy Clipboard Success Toast */}
      {copied && (
        <div className="fixed bottom-20 lg:bottom-6 right-6 bg-canvas border-[3px] border-brutal-black text-brutal-black px-4 py-3 rounded-[8px] shadow-brutal flex items-center gap-2.5 z-50 animate-slide-in-up">
          <div className="w-5 h-5 rounded-full bg-accent-green flex items-center justify-center text-xs text-white shrink-0 border-[2px] border-brutal-black">
            ✓
          </div>
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
            Link copied!
          </span>
        </div>
      )}
    </div>
  );
}
