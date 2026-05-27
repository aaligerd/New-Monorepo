"use client";
// src/components/layout/MobileMenu.js

import { useState, useEffect } from "react";
import Link from "next/link";

function MobileNavItem({ item, onClose }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children?.length > 0;

  return (
    <div className="border-b border-white/5">
      <div className="flex items-center">
        {/* Main link */}
        <Link
          href={item.path}
          onClick={onClose}
          className="flex-1 flex items-center gap-3 px-5 py-3.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-semibold tracking-wide uppercase"
        >
          <span className="text-red-600 text-[10px]">◆</span>
          {item.label}
        </Link>

        {/* Expand toggle — only if has children */}
        {hasChildren && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="px-4 py-3.5 text-gray-500 hover:text-white transition-colors"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
            >
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Sub-items accordion */}
      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-200 ${
            expanded ? "max-h-96" : "max-h-0"
          }`}
        >
          {item.children.map((child) => (
            <Link
              key={child.path}
              href={child.path}
              onClick={onClose}
              className="flex items-center gap-3 pl-10 pr-5 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm border-b border-white/5 last:border-0"
            >
              <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileMenu({ menuItems, open, onClose }) {
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
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#1a1a1a] z-50 flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <span
            className="text-white font-bold text-lg"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The Eastern Gazette
          </span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
        <div className="px-5 py-4 border-t border-white/10 flex gap-4 text-xs text-gray-500 flex-shrink-0">
          <Link href="/subscribe" onClick={onClose} className="hover:text-white transition-colors">Subscribe</Link>
          <Link href="/e-paper" onClick={onClose} className="hover:text-white transition-colors">E-Paper</Link>
          <Link href="/about" onClick={onClose} className="hover:text-white transition-colors">About</Link>
        </div>
      </div>
    </>
  );
}