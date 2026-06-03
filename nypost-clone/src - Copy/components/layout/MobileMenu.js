"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";

function MobileNavItem({ item, onClose }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children?.length > 0;

  return (
    <div className="border-b border-zinc-800">
      <div className="flex items-center">
        <Link
          href={item.path}
          onClick={onClose}
          className="flex-1 flex items-center gap-3 px-5 py-3.5 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors text-sm font-black tracking-wide uppercase"
        >
          <span className="text-[#f99d1b] text-xs">*</span>
          {item.label}
        </Link>

        {hasChildren && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="px-5 py-3.5 text-zinc-500 hover:text-white transition-colors"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

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
              className="flex items-center gap-3 pl-10 pr-5 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors text-sm border-b border-zinc-900 last:border-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#f99d1b] flex-shrink-0" />
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
        className={`fixed inset-0 bg-black/85 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-black border-r border-zinc-800 z-50 flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 flex-shrink-0">
          <span
            className="text-white font-black text-xl tracking-tight uppercase"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            News Eisamay
          </span>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-1"
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faXmark} className="text-lg" />
          </button>
        </div>

        {/* Nav — scrollable */}
        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <MobileNavItem key={item.key} item={item} onClose={onClose} />
          ))}
        </nav>

        {/* Bottom links */}
        <div className="px-5 py-4 border-t border-zinc-800 flex gap-4 text-xs text-zinc-500 flex-shrink-0">
          <Link href="/about" onClick={onClose} className="hover:text-white transition-colors">About Us</Link>
          <Link href="/contact" onClick={onClose} className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </>
  );
}
