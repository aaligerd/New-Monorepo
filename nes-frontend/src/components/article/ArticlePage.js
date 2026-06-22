"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope, faLink, faCheck, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { getPostUrl, stripHtml, getAuthorName, formatPostDate, getCloudFrontUrl } from "../../lib/util";
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
    fetch(`${apiUrl}/posts/latest?limit=10`)
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

  const nextArticle = latestPosts.find(p => p.slug !== post.slug);
  const relatedStories = latestPosts.filter(p => p.slug !== post.slug).slice(0, 8);
  const authorName = getAuthorName(post.author?.node);

  // Combine tags and categories for topics tags list
  const tagsList = [
    ...(post.categories?.nodes || []).map(c => ({ name: c.name, slug: c.slug, type: 'category' })),
    ...(post.tags?.nodes || []).map(t => ({ name: t.name, slug: t.slug, type: 'topic' }))
  ].filter((v, i, a) => a.findIndex(t => t.name === v.name) === i); // remove duplicates by name

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pb-12 font-sans transition-colors duration-200">
      {/* Sticky Reading Progress Bar (top of viewport) */}
      {/* <div className="sticky top-0 left-0 w-full h-1.5 bg-zinc-200/50 dark:bg-zinc-800/50 z-30">
        <div
          className="h-full bg-[#f99d1b] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div> */}

      <main className="max-w-7xl mx-auto px-0 py-6 md:py-10">
        {/* Main Article Body */}
        <article className="w-[80%] mx-auto bg-white dark:bg-zinc-950 p-0 sm:p-8 border-0 sm:border-2 border-zinc-200 dark:border-zinc-900 transition-colors duration-200">
            
            {/* Breadcrumb */}
            <nav className="flex flex-col items-center text-center text-[11px] font-bold tracking-wider text-zinc-450 dark:text-zinc-500 mb-5 select-none md:flex-row md:items-center md:text-left md:flex-wrap md:gap-1.5 justify-center md:justify-start">
              <div className="flex items-center gap-1.5 flex-wrap justify-center mb-1 md:mb-0">
                <Link href="/" className="hover:text-[#f99d1b] transition-colors">Home</Link>
                <span className="text-zinc-350 dark:text-zinc-355 text-[10px] font-normal">&gt;</span>
                <Link href={`/${l1slug}`} className="hover:text-[#f99d1b] transition-colors capitalize">
                  {l1slug.replace(/-/g, " ")}
                </Link>
                {l2slug && (
                  <>
                    <span className="text-zinc-355 dark:text-zinc-355 text-[10px] font-normal">&gt;</span>
                    <Link href={`/${l1slug}/${l2slug}`} className="hover:text-[#f99d1b] transition-colors capitalize">
                      {l2slug.replace(/-/g, " ")}
                    </Link>
                  </>
                )}
                <span className="text-zinc-355 dark:text-zinc-355 text-[10px] font-normal">&gt;</span>
              </div>
              {/* <span className="text-zinc-650 dark:text-zinc-400 normal-case font-normal leading-normal text-xs px-2 md:px-0 max-w-full truncate md:overflow-visible md:whitespace-normal">
                {post.title}
              </span> */}
            </nav>

            {/* Title */}
            <h1 className="text-[28px] sm:text-4xl lg:text-[46px] lg:leading-[1.1] font-bold text-black dark:text-white mb-5 font-serif text-center md:text-left leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 italic font-serif text-center md:text-left border-l-0 pl-0 bg-transparent py-0 pr-0 md:border-l-4 md:border-[#f99d1b] md:pl-4 md:bg-zinc-50 md:dark:bg-zinc-900/40 md:py-3 md:pr-2">
                {post.excerpt.replace(/<[^>]*>/g, "")}
              </div>
            )}

            {/* Author and Date Row */}
            <div className="py-2 mb-6   px-4 font-sans">
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
                <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  By <span className="text-[#f99d1b] italic font-bold hover:underline cursor-pointer">{authorName}</span>
                </div>
                <div className="text-[11px] text-zinc-450 dark:text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5 flex-wrap justify-center md:justify-start">
                  <span>{formatPostDate(post.date)}</span>
                  <span className="text-zinc-300 dark:text-zinc-800 hidden sm:inline">|</span>
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faClock} className="text-[#f99d1b] text-[10px]" />
                    <span>{readingTime} MIN READ</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center justify-center md:justify-start gap-3.5 mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-900/60 font-sans flex-wrap">
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-white flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all"
                title="Share on Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-sm" />
              </a>
              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-white flex items-center justify-center hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all"
                title="Share on Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-sm" />
              </a>
              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-white flex items-center justify-center hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white transition-all"
                title="Share on WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
              </a>
              <button
                onClick={handleCopyLink}
                className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-white flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                title="Copy Link"
              >
                <FontAwesomeIcon icon={copied ? faCheck : faLink} className="text-sm" />
              </button>
            </div>

            {/* Featured Image & Caption */}
            {post.featuredImage?.node?.sourceUrl && (
              <figure className="mb-6 bg-transparent">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={getCloudFrontUrl(post.featuredImage.node.sourceUrl)}
                    alt={post.featuredImage.node.altText || post.title}
                    fill
                    className="object-cover hover:scale-[1.01] transition-transform duration-500"
                    priority
                  />
                </div>
                <figcaption className="mt-3 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed italic text-left px-1 font-serif">
                  <div className="font-bold text-zinc-900 dark:text-zinc-200 leading-snug">{post.title}</div>
                  <div className="text-[11px] text-zinc-450 dark:text-zinc-550 mt-1.5 font-sans not-italic">— Image: {post.featuredImage.node.altText || "Web"}</div>
                </figcaption>
              </figure>
            )}

            {/* Article Content */}
            {post.content && (
              <WpContentRenderer html={post.content} />
            )}            {/* Topics Tags List */}
            {tagsList.length > 0 && (
              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-900 font-sans">
                <h4 className="text-sm font-bold uppercase text-zinc-900 dark:text-zinc-150 mb-4 tracking-wider">
                  Topics: <span className="text-zinc-400 dark:text-zinc-500 font-normal ml-1 normal-case">{tagsList[0]?.name || post.title}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tagsList.map((tag) => (
                    <Link
                      key={tag.name}
                      href={tag.type === 'category' ? `/${tag.slug}` : `/topic/${tag.slug}`}
                      className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded hover:bg-[#f99d1b] hover:text-black dark:hover:bg-[#f99d1b] dark:hover:text-black transition-all whitespace-nowrap"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Footer */}
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-900 flex items-center gap-3 font-sans justify-start">
              <span className="text-sm font-bold uppercase text-zinc-900 dark:text-zinc-100 tracking-wider">
                Share:
              </span>
              <div className="flex gap-2.5">
                <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-white flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  <FontAwesomeIcon icon={faFacebook} className="text-xs" />
                </a>
                <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-white flex items-center justify-center hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all">
                  <FontAwesomeIcon icon={faTwitter} className="text-xs" />
                </a>
                <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-white flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                  <FontAwesomeIcon icon={faWhatsapp} className="text-xs" />
                </a>
                <button onClick={handleCopyLink} className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-white flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer">
                  <FontAwesomeIcon icon={copied ? faCheck : faLink} className="text-xs" />
                </button>
              </div>
            </div>

            {/* Next Article Banner */}
            {nextArticle && (
              <div className="mt-10 border-y border-zinc-200 dark:border-zinc-900 py-6 select-none">
                <div className="text-[11px] font-bold uppercase text-[#f99d1b] tracking-widest mb-2.5 text-center md:text-left font-sans">
                  Next Article
                </div>
                <Link
                  href={getPostUrl(nextArticle)}
                  className="flex flex-row items-center justify-between gap-4 group"
                >
                  <h4 className="font-serif font-bold text-sm sm:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors leading-snug line-clamp-3 max-w-[70%]">
                    {nextArticle.title}
                  </h4>
                  {nextArticle.featuredImage?.node?.sourceUrl && (
                    <div className="w-24 h-16 sm:w-28 sm:h-20 relative shrink-0 rounded overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850">
                      <Image
                        src={getCloudFrontUrl(nextArticle.featuredImage.node.sourceUrl)}
                        alt={nextArticle.title}
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-300"
                        sizes="112px"
                      />
                    </div>
                  )}
                </Link>
              </div>
            )}

            {/* Related Posts: Articles you may like */}
            {relatedStories.length > 0 && (
              <div className="mt-12 font-sans border-t border-zinc-200 dark:border-zinc-900 pt-8">
                <h3 className="text-lg font-bold uppercase text-zinc-950 dark:text-white mb-6 tracking-wide border-b-2 border-zinc-200 dark:border-zinc-800 pb-2">
                  Articles you may like:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {relatedStories.map((item) => {
                    const image = item.featuredImage?.node?.sourceUrl;
                    const title = item.title || "";
                    const link = getPostUrl(item);
                    const dateText = formatPostDate(item.date);

                    return (
                      <Link
                        key={item.slug}
                        href={link}
                        className="group flex flex-col gap-2.5 transition-all"
                      >
                        {image ? (
                          <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-900 rounded overflow-hidden shrink-0">
                            <Image
                              src={getCloudFrontUrl(image)}
                              alt={title}
                              fill
                              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                          </div>
                        ) : (
                          <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-900 rounded overflow-hidden flex items-center justify-center text-zinc-350 dark:text-zinc-700 text-[10px] font-bold shrink-0">
                            NO IMAGE
                          </div>
                        )}
                        <div className="flex flex-col flex-grow justify-start gap-1.5 text-left">
                          <h4 className="text-xs sm:text-[14px] font-bold text-zinc-900 dark:text-zinc-150 group-hover:text-[#f99d1b] dark:group-hover:text-[#f99d1b] transition-colors leading-snug line-clamp-3 font-serif">
                            {title}
                          </h4>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider block">
                            {dateText}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Content Ad */}
            {/* <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-900">
              <AdSlot type="leaderboard" id="article-bottom" />
            </div> */}
          </article>
      </main>

      {/* Toast popup */}
      {copied && (
        <div className="fixed bottom-6 right-6 bg-black dark:bg-zinc-900 text-white px-4 py-3 shadow-xl flex items-center gap-2.5 z-50 animate-slide-in-up border-2 border-[#f99d1b]">
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
