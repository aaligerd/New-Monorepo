"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faSquareTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
          {/* Clickable label — also navigates to L1 page */}
          <button
            onClick={() => setOpen((v) => !v)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="flex items-center gap-1 px-2.5 xl:px-4 py-3 text-[13px] xl:text-[15px] 2xl:text-[17px] font-bold tracking-wide text-gray-300 hover:text-white hover:bg-red-700 transition-colors uppercase whitespace-nowrap cursor-pointer"
          >
            <Link
              href={item.path}
              onClick={(e) => e.stopPropagation()}
              className="hover:text-white"
            >
              {item.label}
            </Link>
            {/* Chevron */}
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
            >
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dropdown panel */}
          <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className={`absolute top-full left-0 min-w-[200px] bg-white border border-gray-100 shadow-lg rounded-b-sm z-50 transition-all duration-150 origin-top ${open
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-95 pointer-events-none"
              }`}
          >
            {/* Also link to the parent category at top of dropdown */}
            <Link
              href={item.path}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 uppercase tracking-wider border-b border-gray-100 hover:bg-red-50 transition-colors"
            >
              All {item.label} →
            </Link>
            {item.children.map((child) => (
              <Link
                key={child.path}
                href={child.path}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                {child.label}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Link
          href={item.path}
          className="block px-2.5 xl:px-4 py-3 text-[13px] xl:text-[15px] 2xl:text-[17px] font-bold tracking-wide text-gray-300 hover:text-white hover:bg-red-700 transition-colors uppercase whitespace-nowrap"
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
      {/* ── Top utility bar: Socials Centered ─────────────────────────── */}
      <div className="bg-[#f3f3f3] text-[#222222] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
          {/* Date (Left for Desktop) */}
          <div className="hidden md:block">
            <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </span>
          </div>

          {/* Centered Socials Menu */}
          <div className="flex items-center gap-x-5 mx-auto md:mx-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
              <FontAwesomeIcon icon={faSquareFacebook} fontSize={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-650 transition-colors">
              <FontAwesomeIcon icon={faSquareInstagram} fontSize={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
              <FontAwesomeIcon icon={faSquareTwitter} fontSize={16} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-650 transition-colors">
              <FontAwesomeIcon icon={faYoutube} fontSize={16} />
            </a>
          </div>

          {/* Date (Visible on Desktop Right to balance the space, or hidden) */}
          <div className="hidden md:block w-24"></div>
        </div>
      </div>

      {/* ── Center-Logo Masthead ─────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 py-4 md:py-8">
        <div className="max-w-7xl mx-auto px-4 relative flex flex-row items-center justify-between md:justify-center">
          {/* Site Title Logo (Left-aligned on mobile, Centered in flow on tablet/desktop) */}
          <Link
            href="/"
            className="flex flex-col items-start text-left md:items-center md:text-center group leading-none"
          >
            <span
              className="text-2xl sm:text-3xl md:text-5xl lg:text-[52px] font-black tracking-tight text-[#111111] group-hover:text-red-700 transition-colors"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              THE EASTERN GAZETTE
            </span>
            <span className="text-[8px] md:text-[10px] tracking-[0.25em] uppercase text-gray-400 mt-1 md:mt-2 md:mb-1 font-semibold select-none">
              Truth · Integrity · Eastern India
            </span>
          </Link>

          {/* Mobile Right Controls: Hamburger + Search. (Separated absolute on tablet/desktop) */}
          <div className="flex items-center gap-1 md:contents">
            {/* Search Option */}
            <Link
              href="/search"
              className="p-2 text-gray-600 hover:text-red-650 transition-colors flex items-center justify-center md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2 order-1 md:order-none"
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-base sm:text-lg" />
            </Link>

            {/* Hamburger / Menu icon */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex flex-col gap-[5px] p-2 group md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2 lg:hidden order-2 md:order-none"
              aria-label="Open menu"
            >
              <span className="block w-4 h-0.5 bg-gray-700 group-hover:bg-red-600 transition-colors" />
              <span className="block w-5 h-0.5 bg-gray-700 group-hover:bg-red-600 transition-colors" />
              <span className="block w-6 h-0.5 bg-gray-700 group-hover:bg-red-600 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Centered Primary navigation ───────────────────────── */}
      <nav
        className={`hidden lg:block bg-[#1a1a1a] sticky top-0 z-40 transition-shadow ${scrolled ? "shadow-md" : ""
          }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex flex-wrap items-center justify-center w-full">
            {menuItems && menuItems.length > 0 ? (
              menuItems.map((item) => (
                <NavItem key={item.key} item={item} />
              ))
            ) : (
              // Fallback skeleton while loading
              [...Array(6)].map((_, i) => (
                <li key={i} className="mx-2 my-3">
                  <span className="block w-16 h-3 bg-white/10 rounded animate-pulse" />
                </li>
              ))
            )}
          </ul>
        </div>
      </nav>

      {/* ── Mobile menu ──────────────────────────────── */}
      <MobileMenu
        menuItems={menuItems}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
