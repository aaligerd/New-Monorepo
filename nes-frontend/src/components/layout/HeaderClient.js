"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import NewsTicker from "./NewsTicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars, faSun, faMoon, faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { getPostUrl } from "../../lib/util";

const MENU_WITH_SUBMENUS = [
  {
    label: "India",
    path: "/india",
    children: [
      { label: "Politics", path: "/india/politics" },
      { label: "Crime", path: "/india/crime" },
      { label: "National Trends", path: "/india/national-trends" },
      { label: "Others", path: "/india/others" }
    ]
  },
  {
    label: "West Bengal",
    path: "/west-bengal",
    children: [
      { label: "Kolkata", path: "/west-bengal/kolkata" },
      { label: "District News", path: "/west-bengal/district-news" },
      { label: "Education", path: "/west-bengal/education" },
      { label: "Others", path: "/west-bengal/others" }
    ]
  },
  {
    label: "FIFA World Cup 2026 ⚽",
    path: "/fifa-world-cup-2026",
    children: [
      { label: "Schedule", path: "/fifa-world-cup-2026/schedule" },
      { label: "Teams", path: "/fifa-world-cup-2026/teams" },
      { label: "Standings", path: "/fifa-world-cup-2026/standings" }
    ]
  },
  {
    label: "World",
    path: "/world",
    children: [
      { label: "Americas", path: "/world/americas" },
      { label: "Europe", path: "/world/europe" },
      { label: "Middle East", path: "/world/middle-east" },
      { label: "Asia", path: "/world/asia" }
    ]
  },
  {
    label: "Sports",
    path: "/sports",
    children: [
      { label: "Cricket", path: "/sports/cricket" },
      { label: "Football", path: "/sports/football" },
      { label: "Tennis", path: "/sports/tennis" },
      { label: "Other Sports", path: "/sports/other-sports" }
    ]
  },
  {
    label: "Entertainment",
    path: "/entertainment",
    children: [
      { label: "Bollywood", path: "/entertainment/bollywood" },
      { label: "Hollywood", path: "/entertainment/hollywood" },
      { label: "Television", path: "/entertainment/television" },
      { label: "Music", path: "/entertainment/music" }
    ]
  },
  {
    label: "Lifestyle",
    path: "/lifestyle",
    children: [
      { label: "Fashion & Skincare", path: "/lifestyle/fashion-skincare" },
      { label: "Astrology", path: "/astrology" },
      { label: "Travel & Fitness", path: "/lifestyle/travel-fitness" },
      { label: "Relationships", path: "/lifestyle/relationships" }
    ]
  },
  {
    label: "Business",
    path: "/business",
    children: [
      { label: "Industry", path: "/business/industry" },
      { label: "Stock Market", path: "/business/stock-market" },
      { label: "Personal Finance", path: "/business/personal-finance" },
      { label: "Tech Business", path: "/business/tech-business" }
    ]
  },
  {
    label: "Technology",
    path: "/technology",
    children: [
      { label: "Mobiles", path: "/technology/mobiles" },
      { label: "Gadgets", path: "/technology/gadgets" },
      { label: "Software", path: "/technology/software" },
      { label: "Internet", path: "/technology/internet" }
    ]
  },
  {
    label: "Videos",
    path: "/videos",
    children: [
      { label: "News Videos", path: "/videos/news" },
      { label: "Interviews", path: "/videos/interviews" },
      { label: "Documentaries", path: "/videos/documentaries" }
    ]
  }
];

function PostTicker({ posts }) {
  const scrollContainer = (direction) => {
    const el = document.getElementById("post-ticker-container");
    if (!el) return;
    const offset = direction === "left" ? -300 : 300;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  if (!posts || posts.length === 0) return null;

  return (
    <div className="bg-white border-b border-zinc-200 py-2.5 relative flex items-center font-sans dark:bg-black dark:border-zinc-900">
      {/* Left scroll button */}
      <button
        onClick={() => scrollContainer("left")}
        className="absolute left-2.5 z-10 w-8 h-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-650 hover:text-black shadow-sm cursor-pointer dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white"
        aria-label="Scroll left"
      >
        &lt;
      </button>

      {/* Ticker items */}
      <div
        id="post-ticker-container"
        className="flex flex-row items-center gap-6 overflow-x-auto scrollbar-none px-12 w-full select-none"
      >
        {posts.map((post) => {
          const image = post.featuredImage?.node?.sourceUrl;
          const title = post.title || "";
          const link = getPostUrl(post);
          return (
            <Link
              key={post.slug}
              href={link}
              className="flex flex-row items-center gap-3 min-w-[280px] max-w-[320px] shrink-0 group"
            >
              {image ? (
                <div className="w-12 h-12 relative shrink-0 bg-zinc-50 overflow-hidden rounded">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center shrink-0 dark:bg-zinc-900 rounded">
                  <span className="text-[8px] text-zinc-400 font-bold uppercase">No Image</span>
                </div>
              )}
              <span className="text-[11px] sm:text-xs font-bold text-zinc-855 group-hover:text-[#f99d1b] transition-colors leading-tight line-clamp-2 dark:text-zinc-300">
                {title}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Right scroll button */}
      <button
        onClick={() => scrollContainer("right")}
        className="absolute right-2.5 z-10 w-8 h-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-650 hover:text-black shadow-sm cursor-pointer dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white"
        aria-label="Scroll right"
      >
        &gt;
      </button>
    </div>
  );
}

export default function HeaderClient({ primaryMenuItems = [], secondaryMenuItems = [], latestPosts = [], newsTicker = "" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Find dynamic children matching hovered item
  const hoveredCategory = primaryMenuItems.find(item => item.label === hoveredItem);
  const activeChildren = hoveredCategory?.children || [];

  return (
    <>
      {/* 1. Breaking News Red Ticker at the absolute top */}
      <NewsTicker newsTicker={newsTicker} />

      {/* 2. Desktop Category Navbar with Dropdown Sub-menus */}
      <div
        className="hidden lg:block bg-white text-black dark:bg-black dark:text-white border-b border-zinc-200 dark:border-zinc-950 relative z-50 transition-colors duration-200"
        onMouseLeave={() => setHoveredItem(null)}
      >
        {/* Main Category Bar */}
        <div className="border-b border-zinc-200 dark:border-zinc-950">
          <div className="w-full px-4 lg:px-[10%] mx-auto flex items-center justify-between h-14">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-black border-b-2 border-black dark:text-white dark:border-white pb-2 flex items-center justify-center shrink-0 pr-1">
                <FontAwesomeIcon icon={faBuildingColumns} className="text-lg" />
              </Link>
              <ul className="flex items-center gap-6 xl:gap-8 text-[13px] font-bold tracking-wide text-black dark:text-white font-sans h-14">
                {primaryMenuItems.map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-[#f99d1b] transition-colors whitespace-nowrap h-full flex items-center cursor-pointer text-sm"
                    onMouseEnter={() => setHoveredItem(item.label)}
                  >
                    <Link href={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div></div>
          </div>
        </div>

        {/* Dynamic Sub-menu Dropdown Row (Aligned with 10% margins) */}
        {activeChildren.length > 0 && (
          <div
            className="absolute left-4 right-4 px-5 lg:left-[10%] lg:right-[10%] bg-zinc-100 text-zinc-600 dark:bg-[#1f2022] dark:text-[#a0a5b5] text-[13px] border border-zinc-200 dark:border-zinc-950 border-t-0 shadow-sm transition-all duration-200 text-sm"
            style={{ top: "56px" }}
          >
            <div className="w-full px-4 lg:px-0 py-4 flex items-center gap-8 font-sans font-bold">
              {activeChildren.map((child, idx) => (
                <Link
                  key={idx}
                  href={child.path}
                  className="hover:text-black dark:hover:text-white transition-colors whitespace-nowrap"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Branding logo bar (Desktop - Supports Light / Dark Theme) */}
      <div className="hidden lg:block bg-white text-black dark:bg-black dark:text-white border-b border-zinc-200 dark:border-zinc-950 py-4 transition-colors duration-200">
        <div className="w-full px-4 lg:px-[10%] mx-auto grid grid-cols-3 items-center">
          {/* Left Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex flex-col gap-1.5 cursor-pointer justify-center items-start h-8 w-8 text-black dark:text-white focus:outline-none"
              aria-label="Open menu"
            >
              <span className="w-6 h-[2.5px] bg-black dark:bg-white rounded-full"></span>
              <span className="w-5 h-[2.5px] bg-black dark:bg-white rounded-full"></span>
            </button>

            {/* <Link href="/shorts" className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors select-none">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span className="text-xs font-bold font-sans">Shorts</span>
            </Link> */}

            {/* <Link href="/breaking" className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors select-none">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span className="text-xs font-bold font-sans">Breaking News</span>
            </Link> */}
          </div>

          {/* Center Brand Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/images/en-logo-light.webp"
                alt="News Eisamay Logo"
                width={240}
                height={65}
                className="h-12 w-auto object-contain dark:hidden"
                priority
              />
              <Image
                src="/images/en-logo-dark.png"
                alt="News Eisamay Logo"
                width={240}
                height={65}
                className="h-12 w-auto object-contain hidden dark:block"
                priority
              />
            </Link>
          </div>

          {/* Right Controls */}
          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-black dark:text-white text-xs font-bold select-none whitespace-nowrap">
              <span>Set</span>
              <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#f99d1b] text-black font-black text-[9px] font-sans">E</span>
              <span>as preferred on</span>
              {/* Multi-colored Google G logo */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.48 3.77v3.13h4c2.34-2.16 3.69-5.33 3.69-8.75z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-4-3.13c-1.11.75-2.53 1.19-3.93 1.19-3.03 0-5.6-2.05-6.51-4.82H1.31v3.23A12 12 0 0 0 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.49 14.33A7.13 7.13 0 0 1 5.08 12c0-.81.14-1.6.39-2.33V6.44H1.31A12 12 0 0 0 0 12c0 2.25.62 4.35 1.7 6.16l3.79-3.83z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A12 12 0 0 0 1.31 6.44l3.79 3.23c.91-2.77 3.48-4.92 6.7-4.92z"
                />
              </svg>
            </div>
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-black dark:text-white focus:outline-none"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile & Tablet Navigation Bar */}
      <div className="lg:hidden bg-white border-b border-[#e9e9e9]/45 py-3.5 px-4 flex items-center justify-between dark:bg-black">
        <div className="flex justify-around items-center">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-black mr-3 hover:text-[#f99d1b] transition-colors flex items-center justify-center cursor-pointer dark:text-white"
            aria-label="Open menu"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
          <Link href="/" className="block">
            <Image
              src="/images/en-logo-light.webp"
              alt="News Eisamay Logo"
              width={180}
              height={45}
              className="h-10 sm:h-11 w-auto object-contain dark:hidden"
              priority
            />
            <Image
              src="/images/en-logo-dark.png"
              alt="News Eisamay Logo"
              width={180}
              height={45}
              className="h-10 sm:h-11 w-auto object-contain hidden dark:block"
              priority
            />
          </Link>
        </div>

        {/* <div className="flex items-center gap-1.5 shrink-0">
          <Link
            href="/shorts"
            className="bg-black text-white dark:bg-zinc-900 dark:text-zinc-100 text-[10px] font-bold uppercase px-2.5 py-1.5 rounded-full border border-zinc-850 dark:border-zinc-800 flex items-center gap-1.5 hover:bg-[#f99d1b] hover:text-black transition-all select-none"
          >
            <span>Shorts</span>
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
          </Link>
          <Link
            href="/breaking"
            className="bg-black text-white dark:bg-zinc-900 dark:text-zinc-100 text-[10px] font-bold uppercase px-2.5 py-1.5 rounded-full border border-zinc-850 dark:border-zinc-800 flex items-center gap-1.5 hover:bg-[#f99d1b] hover:text-black transition-all select-none"
          >
            <span>Breaking</span>
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
          </Link>
        </div> */}
      </div>

      {/* 5. Horizontal post scrolling ticker (Hidden on desktop as per header.png) */}
      <div className="lg:hidden">
        <PostTicker posts={latestPosts} />
      </div>

      {/* 6. Mobile Side Menu Drawer Overlay */}
      <MobileMenu
        menuItems={primaryMenuItems}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </>
  );
}
