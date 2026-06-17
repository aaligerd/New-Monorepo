"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass, faBuildingColumns } from "@fortawesome/free-solid-svg-icons";

const MENU_ITEMS = [
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
      { label: "District", path: "/west-bengal/district-news" },
      { label: "Politics", path: "/west-bengal/politics" },
      { label: "Crime", path: "/west-bengal/crime" },
      { label: "Others", path: "/west-bengal/others" },
      { label: "WB Elections 2026", path: "/west-bengal/wb-elections-2026" }
    ]
  },
  {
    label: "FIFA World Cup 2026 ⚽",
    path: "/fifa-world-cup-2026",
    children: []
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
    children: []
  },
  {
    label: "Education",
    path: "/education",
    children: []
  },
  {
    label: "Trending",
    path: "/trending",
    children: []
  },
  {
    label: "Jobs",
    path: "/jobs",
    children: [
      { label: "Government Jobs", path: "/jobs/government" },
      { label: "Private Jobs", path: "/jobs/private" },
      { label: "IT Jobs", path: "/jobs/it" }
    ]
  }
];

function MobileNavItem({ item, onClose }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between py-3.5 px-5 select-none">
        <Link
          href={item.path}
          onClick={onClose}
          className="font-sans font-bold text-[16px] leading-none text-zinc-900 dark:text-zinc-100 hover:text-[#f99d1b] dark:hover:text-[#f99d1b] transition-colors"
        >
          {item.label}
        </Link>

        {hasChildren && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-red-500 hover:text-red-650 transition-colors font-extrabold text-[17px] leading-none cursor-pointer focus:outline-none pr-1 select-none"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? "x" : "+"}
          </button>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="flex flex-col bg-white dark:bg-black pl-11 pr-5 pb-2 gap-4">
          {item.children.map((child) => (
            <Link
              key={child.path}
              href={child.path}
              onClick={onClose}
              className="text-zinc-900 dark:text-zinc-100 hover:text-[#f99d1b] dark:hover:text-[#f99d1b] transition-colors text-[14.5px] font-bold font-sans"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileMenu({ menuItems = [], open, onClose, edition = "EN", setEdition }) {
  // Use our customized list matching the screenshots exactly
  const finalMenuItems = MENU_ITEMS;

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/45 backdrop-blur-[2px] z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Container */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-[320px] bg-white dark:bg-black border-r border-zinc-100 dark:border-zinc-900 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-5 flex-shrink-0 bg-white dark:bg-black">
          <Link href="/" onClick={onClose} className="block">
            <Image
              src="/images/en-logo-light.webp"
              alt="News Eisamay Logo"
              width={132}
              height={34}
              className="h-[38px] w-auto object-contain dark:hidden"
              priority
            />
            <Image
              src="/images/en-logo-dark.png"
              alt="News Eisamay Logo"
              width={132}
              height={34}
              className="h-[38px] w-auto object-contain hidden dark:block"
              priority
            />
          </Link>
          <button
            onClick={onClose}
            className="text-black dark:text-white hover:text-[#f99d1b] transition-colors p-1 flex items-center justify-center cursor-pointer focus:outline-none"
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faXmark} className="text-[22px] font-bold" />
          </button>
        </div>

        {/* Drawer search bar */}
        <div className="px-5 pb-4 bg-white dark:bg-black flex-shrink-0">
          <form action="/search" method="GET" className="relative w-full flex items-center">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 w-4 h-4 pointer-events-none"
            />
            <input
              type="text"
              name="q"
              placeholder="Search..."
              className="w-full bg-white dark:bg-zinc-900 text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-sm pl-10 pr-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 outline-none focus:border-[#f99d1b] transition-colors font-sans"
            />
          </form>
        </div>

        {/* Navigation - scrollable list */}
        <nav className="flex-1 overflow-y-auto bg-white dark:bg-black py-2">
          {/* Home Link */}
          <div className="flex items-center gap-3.5 py-3.5 px-5 select-none">
            <FontAwesomeIcon
              icon={faBuildingColumns}
              className="text-zinc-900 dark:text-zinc-100 text-[16px] shrink-0"
            />
            <Link
              href="/"
              onClick={onClose}
              className="font-sans font-bold text-[16px] leading-none text-zinc-900 dark:text-zinc-100 hover:text-[#f99d1b] dark:hover:text-[#f99d1b] transition-colors"
            >
              Home
            </Link>
          </div>

          {/* Other Categories */}
          {finalMenuItems.map((item, index) => (
            <MobileNavItem key={item.path || index} item={item} onClose={onClose} />
          ))}
        </nav>

        {/* Edition Toggle in Mobile Menu */}
        {/* <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between flex-shrink-0">
          <span className="text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider text-xs font-sans">Edition</span>
          <div className="flex flex-row items-center bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-full p-0.5 overflow-hidden select-none">
            <button 
              onClick={() => setEdition && setEdition("EN")} 
              className={`px-3 py-1.5 rounded-full cursor-pointer font-sans text-xs transition-all flex items-center gap-1 leading-none ${
                edition === "EN" 
                  ? "bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white font-black" 
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-transparent"
              }`}
            >
              {edition === "EN" && <span className="text-[10px]">✓</span>}
              ENG
            </button>
            <button 
              onClick={() => setEdition && setEdition("BN")} 
              className={`px-3 py-1.5 rounded-full cursor-pointer font-sans text-xs transition-all flex items-center gap-1 border-l border-zinc-100 dark:border-zinc-800 leading-none ${
                edition === "BN" 
                  ? "bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white font-black" 
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-transparent"
              }`}
            >
              {edition === "BN" && <span className="text-[10px]">✓</span>}
              BN
            </button>
            <button 
              onClick={() => setEdition && setEdition("HI")} 
              className={`px-3 py-1.5 rounded-full cursor-pointer font-sans text-xs transition-all flex items-center gap-1 border-l border-zinc-100 dark:border-zinc-800 leading-none ${
                edition === "HI" 
                  ? "bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white font-black" 
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-transparent"
              }`}
            >
              {edition === "HI" && <span className="text-[10px]">✓</span>}
              HI
            </button>
          </div>
        </div> */}

        {/* Social Follow Links */}
        <div className="px-5 py-4 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 flex flex-col gap-3 flex-shrink-0">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#f99d1b]">Follow Us</span>
          <div className="flex items-center gap-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/images/facebook.png" alt="Facebook" className="w-7 h-7 object-contain" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/images/instagram.png" alt="Instagram" className="w-7 h-7 object-contain" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/images/twitter.png" alt="Twitter" className="w-7 h-7 object-contain" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/images/linkedin.png" alt="LinkedIn" className="w-7 h-7 object-contain" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/images/youtube.png" alt="YouTube" className="w-7 h-7 object-contain" />
            </a>
          </div>
        </div>

        {/* Bottom links */}
        {/* <div className="px-5 py-4 border-t border-zinc-150 dark:border-zinc-900 bg-zinc-100 dark:bg-black flex flex-wrap gap-4 items-center text-xs font-bold text-zinc-500 dark:text-zinc-400 flex-shrink-0">
          <Link href="/about" onClick={onClose} className="hover:text-[#f99d1b] transition-colors uppercase">About Us</Link>
          <Link href="/contact" onClick={onClose} className="hover:text-[#f99d1b] transition-colors uppercase">Contact</Link>
          <span className="text-zinc-350 dark:text-zinc-800">|</span>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal">Copyright (C) {new Date().getFullYear()}</span>
        </div> */}
      </div>
    </>
  );
}
