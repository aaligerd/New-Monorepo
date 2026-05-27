"use client";
// src/components/layout/HeaderClient.js

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import NewsTicker from "./NewsTicker";
import MobileMenu from "./MobileMenu";

// Search icon
function IconSearch() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

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
            className="flex items-center gap-1 px-4 py-3 text-[13px] font-semibold tracking-wide text-gray-300 hover:text-white hover:bg-red-700 transition-colors uppercase whitespace-nowrap cursor-pointer"
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
            className={`absolute top-full left-0 min-w-[200px] bg-white border border-gray-100 shadow-lg rounded-b-sm z-50 transition-all duration-150 origin-top ${
              open
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
          className="block px-4 py-3 text-[13px] font-semibold tracking-wide text-gray-300 hover:text-white hover:bg-red-700 transition-colors uppercase whitespace-nowrap"
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
      {/* ── Top utility bar ─────────────────────────── */}
      <div className="bg-[#1a1a1a] text-gray-400 text-[11px] tracking-wide">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <span className="hidden sm:block">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long", day: "numeric", month: "long", year: "numeric",
            })}
          </span>
          <div className="flex items-center gap-4">
            <Link href="/search" className="hover:text-white transition-colors">Search</Link>
            <span className="text-gray-600">|</span>
            <Link href="/subscribe" className="hover:text-white transition-colors">Subscribe</Link>
            <span className="text-gray-600">|</span>
            <Link href="/e-paper" className="hover:text-white transition-colors">E-Paper</Link>
          </div>
        </div>
      </div>

      {/* ── Masthead ─────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a1a] group-hover:text-red-700 transition-colors"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Eastern Gazette
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mt-0.5">
              Truth · Integrity · Eastern India
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-3">
            <div className="w-[300px] h-[60px] bg-gray-50 border border-dashed border-gray-200 rounded flex items-center justify-center text-xs text-gray-300 tracking-wide">
              Advertisement
            </div>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col gap-[5px] p-2 group"
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-gray-700 group-hover:bg-red-600 transition-colors" />
            <span className="block w-6 h-0.5 bg-gray-700 group-hover:bg-red-600 transition-colors" />
            <span className="block w-4 h-0.5 bg-gray-700 group-hover:bg-red-600 transition-colors" />
          </button>
        </div>
      </div>

      {/* ── Primary navigation ───────────────────────── */}
      <nav
        className={`hidden lg:block bg-[#1a1a1a] sticky top-0 z-40 transition-shadow ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center">
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <NavItem key={item.key} item={item} />
              ))
            ) : (
              // Fallback skeleton while loading or if API fails
              [...Array(6)].map((_, i) => (
                <li key={i}>
                  <span className="block px-4 py-3 w-20 h-3 bg-white/10 rounded animate-pulse" />
                </li>
              ))
            )}

            {/* Search — always rightmost */}
            <li className="ml-auto">
              <Link
                href="/search"
                className="flex items-center gap-1.5 px-4 py-3 text-gray-400 hover:text-white transition-colors"
                aria-label="Search"
              >
                <IconSearch />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── News Ticker ──────────────────────────────── */}
      {/* <NewsTicker /> */}

      {/* ── Mobile menu ──────────────────────────────── */}
      <MobileMenu
        menuItems={menuItems}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}