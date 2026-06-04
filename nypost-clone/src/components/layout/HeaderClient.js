"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faSquareTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";

// Single nav item — simplified for tabloid styling (separated by a single white line, no dropdowns)
function NavItem({ item }) {
  return (
    <li className="relative border-r-2 border-white/80 last:border-r-0 shrink-0">
      <Link
        href={item.path}
        className="block px-4 xl:px-6 py-3.5 text-xs sm:text-sm xl:text-base font-black tracking-wider text-white hover:text-black hover:bg-[#f99d1b] transition-all uppercase whitespace-nowrap font-sans"
      >
        {item.label}
      </Link>
    </li>
  );
}

export default function HeaderClient({ primaryMenuItems = [], secondaryMenuItems = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [edition, setEdition] = useState("EN");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* -- Top utility bar: Socials & Date (Hidden on Mobile) --------------------------- */}
      <div className="hidden sm:block bg-white text-zinc-800 border-b border-zinc-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-11">
          {/* Date (Left) */}
          <div className="flex items-center">
            <span className="text-[16px] font-black uppercase tracking-wider text-black-500">
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric", weekday: "long"
              })}
            </span>
          </div>

          {/* Socials Menu (Right) */}
          <div className="flex items-center gap-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/images/facebook.png" alt="Facebook" className="w-8 h-8 object-contain" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/images/instagram.png" alt="Instagram" className="w-8 h-8 object-contain" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/images/twitter.png" alt="Twitter" className="w-8 h-8 object-contain" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/images/linkedin.png" alt="LinkedIn" className="w-8 h-8 object-contain" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/images/youtube.png" alt="YouTube" className="w-8 h-8 object-contain" />
            </a>
          </div>
        </div>
      </div>

      {/* -- Tabloid Masthead with Brand Background (Compact vertical spacing on mobile) -- */}
      <div className="bg-[#f99d1b] py-3 sm:py-4 md:py-6 border-b-4 border-black relative">
        <div className="max-w-7xl mx-auto px-4 relative flex flex-row items-center justify-center">
          
          {/* Hamburger Menu (Absolute Left - Desktop & Mobile) */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-white hover:text-black transition-colors flex items-center justify-center cursor-pointer"
              style={{
                filter: "drop-shadow(2px 2px 0px #000000)"
              }}
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon={faBars} className="text-xl sm:text-3xl md:text-4xl" />
            </button>
          </div>

          {/* Site Title Logo */}
          <Link
            href="/"
            className="flex flex-col items-center text-center group leading-none"
          >
            <span
              className="text-2xl sm:text-5xl md:text-7xl lg:text-[84px] font-black tracking-tight text-white group-hover:text-black transition-colors font-display uppercase leading-none logo-text-shadow"
              style={{ 
                fontFamily: "var(--font-oswald)", 
                letterSpacing: "-0.02em"
              }}
            >
              NEWS EI SAMAY
            </span>
            <span className="hidden sm:block text-[10px] md:text-[12px] tracking-[0.25em] uppercase text-black mt-2 font-bold font-sans">
              Truth &bull; Courage &bull; Regional News First
            </span>
          </Link>

          {/* Search Icon & Edition Toggle (Absolute Right - Desktop & Mobile) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-y-2 md:gap-y-3">
            <Link
              href="/search"
              className="text-white hover:text-black transition-all flex items-center justify-center cursor-pointer"
              style={{
                filter: "drop-shadow(2px 2px 0px #000000)"
              }}
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl sm:text-2xl md:text-3xl" />
            </Link>

            {/* Edition Toggle */}
            <div className="flex flex-row items-center gap-1.5 sm:gap-2">
              <span className="text-white text-[10px] sm:text-xs font-black uppercase font-sans tracking-wide leading-none select-none">
                Edition
              </span>
              <div className="flex flex-row items-center bg-black border border-zinc-700 rounded-full p-0.5 overflow-hidden select-none">
                <button 
                  onClick={() => setEdition("EN")} 
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full cursor-pointer font-sans text-[9px] sm:text-[10px] md:text-[11px] transition-all flex items-center gap-1 leading-none ${
                    edition === "EN" 
                      ? "bg-zinc-700 text-white font-black" 
                      : "text-zinc-400 hover:text-white bg-black"
                  }`}
                >
                  {edition === "EN" && <span className="text-[8px] sm:text-[10px] leading-none">✓</span>}
                  ENG
                </button>
                <button 
                  onClick={() => setEdition("BN")} 
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full cursor-pointer font-sans text-[9px] sm:text-[10px] md:text-[11px] transition-all flex items-center gap-1 border-l border-zinc-800 leading-none ${
                    edition === "BN" 
                      ? "bg-zinc-700 text-white font-black" 
                      : "text-zinc-400 hover:text-white bg-black"
                  }`}
                >
                  {edition === "BN" && <span className="text-[8px] sm:text-[10px] leading-none">✓</span>}
                  BN
                </button>
                <button 
                  onClick={() => setEdition("HI")} 
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full cursor-pointer font-sans text-[9px] sm:text-[10px] md:text-[11px] transition-all flex items-center gap-1 border-l border-zinc-800 leading-none ${
                    edition === "HI" 
                      ? "bg-zinc-700 text-white font-black" 
                      : "text-zinc-400 hover:text-white bg-black"
                  }`}
                >
                  {edition === "HI" && <span className="text-[8px] sm:text-[10px] leading-none">✓</span>}
                  HI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -- Centered Primary Tabloid Navigation (Horizontal Scrollable on Mobile) -- */}
      <nav
        className={`bg-[#593b1b] sticky top-0 z-40 transition-shadow border-b-2 border-[#2B1D0E] overflow-x-auto scrollbar-none ${
          scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.15)]" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 relative flex items-center justify-start md:justify-center">
          {/* Hamburger Menu on Sticky Navigation (Visible on tablet/desktop only when scrolled) */}
          {scrolled && (
            <div className="absolute left-4 hidden md:block">
              <button
                onClick={() => setMobileOpen(true)}
                className="text-white hover:text-[#f99d1b] transition-all flex items-center justify-center cursor-pointer"
                style={{
                  filter: "drop-shadow(2px 2px 0px #000000)"
                }}
                aria-label="Open menu"
              >
                <FontAwesomeIcon icon={faBars} className="text-xl" />
              </button>
            </div>
          )}

          <ul className="flex flex-row flex-nowrap md:flex-wrap items-center justify-start md:justify-center w-full min-w-max md:min-w-0">
            {primaryMenuItems && primaryMenuItems.length > 0 ? (
              primaryMenuItems.map((item) => (
                <NavItem key={item.key} item={item} />
              ))
            ) : (
              // Fallback skeletons while loading menu data
              [...Array(6)].map((_, i) => (
                <li key={i} className="mx-3 my-3.5 border-r border-zinc-800 last:border-r-0 pr-3 shrink-0">
                  <span className="block w-20 h-4 bg-zinc-800 rounded animate-pulse" />
                </li>
              ))
            )}
          </ul>
        </div>
      </nav>

      {/* -- Mobile Menu Overlay -------------------------------- */}
      <MobileMenu
        menuItems={secondaryMenuItems}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        edition={edition}
        setEdition={setEdition}
      />
    </>
  );
}
