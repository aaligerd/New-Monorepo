"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function MobileNavItem({ item, onClose }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children?.length > 0;

  return (
    <div className="border-b border-zinc-800/50 hover:bg-[#f99d1b] hover:text-black transition-all duration-150 group">
      <div className="flex items-center">
        <Link
          href={item.path}
          onClick={onClose}
          className="flex-1 flex items-center gap-3 px-5 py-4 text-zinc-200 group-hover:text-black font-display text-[15px] font-black uppercase tracking-wider transition-colors"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          <span className="w-2 h-2 bg-[#f99d1b] group-hover:bg-black flex-shrink-0 transition-colors" />
          {item.label}
        </Link>

        {hasChildren && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="px-5 py-4 text-zinc-500 group-hover:text-black transition-colors"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <FontAwesomeIcon icon={faChevronDown} className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-200 bg-zinc-950 ${
            expanded ? "max-h-96" : "max-h-0"
          }`}
        >
          {item.children.map((child) => (
            <Link
              key={child.path}
              href={child.path}
              onClick={onClose}
              className="flex items-center gap-3 pl-10 pr-5 py-3 text-zinc-400 hover:text-black hover:bg-[#f99d1b]/80 transition-colors text-sm font-sans uppercase font-bold border-b border-zinc-900/60 last:border-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#f99d1b] hover:bg-black flex-shrink-0" />
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileMenu({ menuItems = [], open, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop with premium blur */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/75 backdrop-blur-md z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Container (Upgraded layout width) */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-[320px] sm:max-w-[460px] bg-black border-r-4 border-black md:border-r-[#f99d1b] z-50 flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header - Tabloid Brand block */}
        <div className="flex items-center justify-between px-5 py-4 border-b-4 border-black bg-[#f99d1b] flex-shrink-0">
          <span
            className="text-white font-black text-2xl tracking-tight uppercase"
            style={{ 
              fontFamily: "var(--font-oswald)",
              textShadow: "2px 2px 0px #000000"
            }}
          >
            NEWS EI SAMAY
          </span>
          <button
            onClick={onClose}
            className="text-white hover:text-black transition-colors p-1"
            style={{ filter: "drop-shadow(2px 2px 0px #000000)" }}
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faXmark} className="text-xl font-bold" />
          </button>
        </div>

        {/* Drawer search bar */}
        <div className="px-5 py-4 border-b border-zinc-800/80 bg-zinc-900/20">
          <form action="/search" method="GET" className="relative flex items-center">
            <input
              type="text"
              name="q"
              placeholder="Search news..."
              className="w-full bg-white text-black font-bold uppercase tracking-wider text-xs px-4 py-3 pr-10 rounded-none border-2 border-black outline-none focus:border-[#f99d1b] transition-colors"
              style={{ boxShadow: "3px 3px 0px #000000" }}
            />
            <button
              type="submit"
              className="absolute right-3 text-black hover:text-[#f99d1b] transition-colors"
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Nav — scrollable */}
        <nav className="flex-1 overflow-y-auto bg-zinc-950/40">
          {menuItems.map((item) => (
            <MobileNavItem key={item.key} item={item} onClose={onClose} />
          ))}
        </nav>

        {/* Social Follow Links */}
        <div className="px-5 py-4 border-t border-zinc-800 bg-[#070707] flex flex-col gap-3">
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
        <div className="px-5 py-4 border-t border-zinc-800 bg-black flex flex-wrap gap-4 items-center text-xs font-bold text-zinc-500 flex-shrink-0">
          <Link href="/about" onClick={onClose} className="hover:text-[#f99d1b] transition-colors uppercase">About Us</Link>
          <Link href="/contact" onClick={onClose} className="hover:text-[#f99d1b] transition-colors uppercase">Contact</Link>
          <span className="text-zinc-700">|</span>
          <span className="text-[10px] text-zinc-600 font-normal">Copyright (C) {new Date().getFullYear()}</span>
        </div>
      </div>
    </>
  );
}
