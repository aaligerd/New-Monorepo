// src/components/layout/Footer.js

import Link from "next/link";

const FOOTER_SECTIONS = [
  {
    title: "News",
    links: [
      { label: "India", href: "/india" },
      { label: "West Bengal", href: "/west-bengal" },
      { label: "World", href: "/world" },
      { label: "Business", href: "/business" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Technology", href: "/technology" },
      { label: "Sports", href: "/sports" },
      { label: "Entertainment", href: "/entertainment" },
      { label: "Opinion", href: "/opinion" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Advertise", href: "/advertise" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400 mt-16">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div>
          <Link href="/" className="block mb-4">
            <span
              className="text-white text-2xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Eastern<br />Gazette
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-500 mb-4">
            Covering Eastern India and beyond since 2020. Independent journalism committed to truth.
          </p>
          {/* Social icons */}
          <div className="flex gap-3">
            {["X", "FB", "IG", "YT"].map((s) => (
              <span
                key={s}
                className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-[11px] font-bold text-gray-400 hover:bg-red-700 hover:text-white transition-colors cursor-pointer"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title}>
            <h4 className="section-label text-white mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} The Eastern Gazette. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}