"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function MobileNavItem({ item, onClose }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children?.length > 0;

  return (
    <div className="border-b-[2px] border-brutal-black/10">
      <div className="flex items-stretch">
        <Link
          href={item.path}
          onClick={onClose}
          className="flex-1 flex items-center gap-3 px-5 py-4 text-brutal-black hover:bg-accent-orange/20 transition-all text-sm font-black tracking-wide uppercase font-brutal"
        >
          <span className="text-accent-coral text-xs">◆</span>
          {item.label}
        </Link>

        {hasChildren && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="px-4 border-l-[2px] border-brutal-black/10 hover:bg-accent-orange/20 transition-all text-brutal-black flex items-center justify-center"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"
            >
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-200 bg-accent-orange/5 ${
            expanded ? "max-h-96 border-t-[2px] border-brutal-black/10" : "max-h-0"
          }`}
        >
          {item.children.map((child) => (
            <Link
              key={child.path}
              href={child.path}
              onClick={onClose}
              className="flex items-center gap-3 pl-10 pr-5 py-3 text-brutal-black/90 hover:bg-accent-orange/20 transition-all text-xs font-bold uppercase border-b border-brutal-black/5 last:border-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-coral flex-shrink-0" />
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
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-brutal-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-canvas border-r-[4px] border-brutal-black z-50 flex flex-col transition-transform duration-300 ease-out shadow-brutal-lg ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-[3px] border-brutal-black bg-accent-orange flex-shrink-0">
          <span className="text-brutal-black font-black text-lg tracking-tight uppercase font-brutal">
            TEG NEWS
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white flex items-center justify-center text-brutal-black shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all"
            aria-label="Close menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav — scrollable */}
        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <MobileNavItem key={item.key} item={item} onClose={onClose} />
          ))}
        </nav>

        {/* Bottom links */}
        <div className="px-5 py-6 border-t-[3px] border-brutal-black bg-accent-orange/10 flex flex-wrap gap-4 text-xs font-black uppercase tracking-wider text-brutal-black flex-shrink-0">
          <Link href="/subscribe" onClick={onClose} className="px-3 py-1.5 border-[2px] border-brutal-black bg-white shadow-[2px_2px_0px_#111] rounded-[6px] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all">Subscribe</Link>
          <Link href="/e-paper" onClick={onClose} className="px-3 py-1.5 border-[2px] border-brutal-black bg-white shadow-[2px_2px_0px_#111] rounded-[6px] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all">E-Paper</Link>
          <Link href="/about" onClick={onClose} className="px-3 py-1.5 border-[2px] border-brutal-black bg-white shadow-[2px_2px_0px_#111] rounded-[6px] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all">About</Link>
        </div>
      </div>
    </>
  );
}
