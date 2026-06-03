"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faSquareTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass, faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";

// Single nav item — handles dropdown if children exist
function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const hasChildren = item.children?.length > 0;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <li ref={ref} className="relative group">
      {hasChildren ? (
        <>
          <button
            onClick={() => setOpen((v) => !v)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="flex items-center gap-1.5 px-3 xl:px-4 py-3 text-xs sm:text-sm xl:text-base font-black tracking-wider text-white hover:text-black hover:bg-[#f99d1b] transition-all uppercase whitespace-nowrap cursor-pointer font-sans"
          >
            <Link
              href={item.path}
              onClick={(e) => e.stopPropagation()}
              className="hover:text-black"
            >
              {item.label}
            </Link>
            <FontAwesomeIcon icon={faChevronDown} className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown panel */}
          <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className={`absolute top-full left-0 min-w-[220px] bg-black border-t-4 border-[#f99d1b] shadow-2xl z-50 transition-all duration-150 origin-top ${
              open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
            }`}
          >
            <Link
              href={item.path}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-black text-[#f99d1b] uppercase tracking-wider border-b border-zinc-800 hover:bg-zinc-900 transition-colors"
            >
              All {item.label} →
            </Link>
            {item.children.map((child) => (
              <Link
                key={child.path}
                href={child.path}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-[#f99d1b] hover:text-black transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-[#f99d1b] group-hover:bg-black rounded-full shrink-0" />
                {child.label}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Link
          href={item.path}
          className="block px-3 xl:px-4 py-3 text-xs sm:text-sm xl:text-base font-black tracking-wider text-white hover:text-black hover:bg-[#f99d1b] transition-all uppercase whitespace-nowrap font-sans"
        >
          {item.label}
        </Link>
      )}
    </li>
  );
}

export default function HeaderClient({ menuItems }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      {/* -- Top utility bar: Socials & Date --------------------------- */}
      <div className="bg-black text-white border-b border-zinc-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
          {/* Date (Left for Desktop) */}
          <div className="hidden md:block">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric", weekday: "long"
              })}
            </span>
          </div>

          {/* Centered Socials Menu */}
          <div className="flex items-center gap-x-5 mx-auto md:mx-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#f99d1b] transition-colors">
              <FontAwesomeIcon icon={faSquareFacebook} className="text-base" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#f99d1b] transition-colors">
              <FontAwesomeIcon icon={faSquareInstagram} className="text-base" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#f99d1b] transition-colors">
              <FontAwesomeIcon icon={faSquareTwitter} className="text-base" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#f99d1b] transition-colors">
              <FontAwesomeIcon icon={faYoutube} className="text-base" />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/search" className="text-xs font-black uppercase text-[#f99d1b] hover:text-white transition-colors">
              SEARCH
            </Link>
          </div>
        </div>
      </div>

      {/* -- Tabloid Masthead ----------------------------------- */}
      <div className="bg-white border-b-4 border-black py-5 md:py-8">
        <div className="max-w-7xl mx-auto px-4 relative flex flex-row items-center justify-between md:justify-center">
          
          {/* Left Controls for Mobile Search */}
          <div className="md:hidden">
            <Link
              href="/search"
              className="p-2 text-black hover:text-[#f99d1b] transition-colors flex items-center justify-center"
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
            </Link>
          </div>

          {/* Site Title Logo (Centered in flow on desktop, responsive sizes) */}
          <Link
            href="/"
            className="flex flex-col items-center text-center group leading-none"
          >
            <span
              className="text-3xl sm:text-4xl md:text-6xl lg:text-[72px] font-black tracking-tight text-black group-hover:text-[#f99d1b] transition-colors font-display uppercase leading-none"
              style={{ fontFamily: "var(--font-oswald)", letterSpacing: "-0.03em" }}
            >
              NEWS EI SAMAY
            </span>
            <span className="text-[9px] md:text-[11.5px] tracking-[0.25em] uppercase text-zinc-500 mt-2 font-bold font-sans">
              Truth &bull; Courage &bull; Regional News First
            </span>
          </Link>

          {/* Mobile Right Controls: Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-black hover:text-[#f99d1b] transition-colors"
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>
          </div>

          {/* Desktop Search Positioned Absolute Right */}
          <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2">
            <Link
              href="/search"
              className="w-10 h-10 border-2 border-black rounded-full text-black hover:bg-black hover:text-white transition-all flex items-center justify-center cursor-pointer"
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
            </Link>
          </div>
        </div>
      </div>

      {/* -- Centered Primary Tabloid Navigation ------------------------- */}
      <nav
        className={`hidden md:block bg-black sticky top-0 z-40 transition-shadow border-b-2 border-zinc-800 ${
          scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.15)]" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex flex-wrap items-center justify-center w-full">
            {menuItems && menuItems.length > 0 ? (
              menuItems.map((item) => (
                <NavItem key={item.key} item={item} />
              ))
            ) : (
              // Fallback skeletons while loading menu data
              [...Array(6)].map((_, i) => (
                <li key={i} className="mx-3 my-3.5">
                  <span className="block w-20 h-4 bg-zinc-800 rounded animate-pulse" />
                </li>
              ))
            )}
          </ul>
        </div>
      </nav>

      {/* -- Mobile Menu Overlay -------------------------------- */}
      <MobileMenu
        menuItems={menuItems}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
