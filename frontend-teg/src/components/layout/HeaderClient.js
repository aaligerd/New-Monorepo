"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faSquareTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const hasChildren = item.children?.length > 0;

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <li ref={ref} className="relative border-r-[3px] border-brutal-black last:border-r-0">
      {hasChildren ? (
        <>
          <div className="flex items-stretch h-full">
            <Link
              href={item.path}
              className="flex items-center px-4 xl:px-6 py-3.5 text-xs xl:text-sm font-black tracking-wider text-brutal-black uppercase hover:bg-accent-orange transition-all cursor-pointer font-brutal"
            >
              {item.label}
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="px-2 border-l-[2px] border-brutal-black hover:bg-accent-orange transition-colors flex items-center justify-center text-brutal-black"
              aria-label="Toggle Submenu"
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"
              >
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div
            className={`absolute top-[102%] left-0 min-w-[220px] bg-canvas border-[3px] border-brutal-black shadow-brutal rounded-[12px] z-50 p-2 transition-all duration-150 origin-top ${open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
              }`}
          >
            <Link
              href={item.path}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-xs font-black text-accent-coral uppercase tracking-widest border-b-[2px] border-brutal-black/20 hover:bg-accent-orange/10 rounded-[6px] mb-1"
            >
              All {item.label} →
            </Link>
            {item.children.map((child) => (
              <Link
                key={child.path}
                href={child.path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-brutal-black hover:bg-accent-orange hover:text-brutal-black rounded-[6px] transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-coral flex-shrink-0" />
                {child.label}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Link
          href={item.path}
          className="block px-4 xl:px-6 py-3.5 text-xs xl:text-sm font-black tracking-wider text-brutal-black uppercase hover:bg-accent-orange transition-all font-brutal"
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
      {/* ── Top utility bar: Socials & Date ─────────────────────────── */}
      <div className="bg-canvas border-b-[3px] border-brutal-black py-2 px-4 sm:px-6">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between">
          {/* Date (Left for Desktop) */}
          <div className="hidden md:block">
            <span className="text-xs font-black uppercase tracking-widest text-brutal-black bg-accent-orange/20 border-brutal-black border-[2px] px-2 py-0.5 rounded-[4px]">
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </span>
          </div>

          {/* Centered Socials Menu */}
          <div className="flex items-center gap-x-4 mx-auto md:mx-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black flex items-center justify-center bg-white text-brutal-black shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all">
              <FontAwesomeIcon icon={faSquareFacebook} className="text-base" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black flex items-center justify-center bg-white text-brutal-black shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all">
              <FontAwesomeIcon icon={faSquareInstagram} className="text-base" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black flex items-center justify-center bg-white text-brutal-black shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all">
              <FontAwesomeIcon icon={faSquareTwitter} className="text-base" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black flex items-center justify-center bg-white text-brutal-black shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all">
              <FontAwesomeIcon icon={faYoutube} className="text-base" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Center-Logo Masthead ─────────────────────────────────── */}
      <div className="bg-canvas py-6 md:py-10 border-b-[3px] border-brutal-black">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 relative flex flex-row items-center justify-between md:justify-center">
          
          {/* Logo on Left for mobile, Center for md/lg */}
          <Link
            href="/"
            className="flex flex-col items-start text-left md:items-center md:text-center group leading-none"
          >
            <span
              className="text-[26px] sm:text-[34px] md:text-5xl lg:text-[62px] font-black tracking-tighter text-brutal-black group-hover:text-accent-coral transition-colors font-brutal uppercase"
            >
              The Eastern Gazette
            </span>
            {/* Added margin-bottom in desktop/tablet view per user feedback (md:mb-5) */}
            <span className="text-[9px] md:text-xs tracking-[0.2em] uppercase text-brutal-black/70 font-black mt-2 font-sans select-none md:mb-5">
              Truth • Integrity • Eastern India
            </span>
          </Link>

          {/* Right Controls: Hamburger + Search on mobile, absolute placement on desktop */}
          <div className="flex items-center gap-3 md:contents">
            {/* Search Box Button */}
            <Link
              href="/search"
              className="w-10 h-10 rounded-[8px] border-[3px] border-brutal-black flex items-center justify-center bg-accent-orange text-brutal-black shadow-brutal hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#111] transition-all md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2"
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm sm:text-base" />
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="w-10 h-10 rounded-[8px] border-[3px] border-brutal-black flex flex-col items-center justify-center gap-1 bg-white text-brutal-black shadow-brutal hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#111] transition-all lg:hidden"
              aria-label="Open menu"
            >
              <span className="block w-5.5 h-0.75 bg-brutal-black rounded-full" />
              <span className="block w-5.5 h-0.75 bg-brutal-black rounded-full" />
              <span className="block w-5.5 h-0.75 bg-brutal-black rounded-full" />
            </button>
            
            {/* Desktop Menu toggle button on Left */}
            <button
              onClick={() => setMobileOpen(true)}
              className="hidden lg:flex w-10 h-10 rounded-[8px] border-[3px] border-brutal-black flex-col items-center justify-center gap-1 bg-white text-brutal-black shadow-brutal hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#111] transition-all lg:absolute lg:left-6 lg:top-1/2 lg:-translate-y-1/2"
              aria-label="Open side drawer menu"
            >
              <span className="block w-5.5 h-0.75 bg-brutal-black rounded-full" />
              <span className="block w-5.5 h-0.75 bg-brutal-black rounded-full" />
              <span className="block w-5.5 h-0.75 bg-brutal-black rounded-full" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Centered Primary navigation (Desktop) ───────────────────────── */}
      <nav
        className="hidden lg:block bg-canvas sticky top-0 z-40 border-b-[3px] border-brutal-black"
      >
        <div className="max-w-[1360px] mx-auto">
          <ul className="flex flex-wrap items-stretch justify-center w-full min-h-[48px]">
            {menuItems && menuItems.length > 0 ? (
              menuItems.map((item) => (
                <NavItem key={item.key} item={item} />
              ))
            ) : (
              [...Array(6)].map((_, i) => (
                <li key={i} className="flex items-center px-6 py-3.5 border-r-[3px] border-brutal-black last:border-r-0">
                  <span className="block w-16 h-4 bg-brutal-black/10 rounded animate-pulse" />
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
