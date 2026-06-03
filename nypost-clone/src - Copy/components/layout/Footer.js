// src/components/layout/Footer.js
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

const FOOTER_SECTIONS = [
  {
    title: "News Sections",
    links: [
      { label: "India News", href: "/india" },
      { label: "West Bengal", href: "/west-bengal" },
      { label: "World Affairs", href: "/world" },
      { label: "Business News", href: "/business" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Technology", href: "/technology" },
      { label: "Sports Feed", href: "/sports" },
      { label: "Entertainment", href: "/entertainment" },
      { label: "Opinion / Editorial", href: "/opinion" },
    ],
  },
  {
    title: "Eisamay Network",
    links: [
      { label: "About Our Team", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Work With Us", href: "/careers" },
      { label: "Ad Specifications", href: "/advertise" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-400 border-t-8 border-[#f99d1b] font-sans">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand column */}
        <div className="flex flex-col justify-start">
          <Link href="/" className="block mb-4 leading-none select-none">
            <span
              className="text-[#f99d1b] text-3xl font-black tracking-tighter uppercase font-display"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              News Eisamay
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-zinc-500 mb-5 max-w-xs font-bold">
            Bold Tabloid Journalism. Delivering breaking news, regional reports, and analysis with integrity.
          </p>
          {/* Social icons */}
          <div className="flex gap-2">
            <a href="https://facebook.com" className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#f99d1b] hover:text-black transition-colors rounded">
              <FontAwesomeIcon icon={faFacebookF} className="text-sm" />
            </a>
            <a href="https://instagram.com" className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#f99d1b] hover:text-black transition-colors rounded">
              <FontAwesomeIcon icon={faInstagram} className="text-sm" />
            </a>
            <a href="https://twitter.com" className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#f99d1b] hover:text-black transition-colors rounded">
              <FontAwesomeIcon icon={faTwitter} className="text-sm" />
            </a>
            <a href="https://youtube.com" className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#f99d1b] hover:text-black transition-colors rounded">
              <FontAwesomeIcon icon={faYoutube} className="text-sm" />
            </a>
          </div>
        </div>

        {/* Nav columns */}
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title}>
            <h4
              className="text-[#f99d1b] font-black text-sm uppercase tracking-wider mb-4 font-display"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {section.title}
            </h4>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-zinc-400 hover:text-white hover:underline transition-all"
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
      <div className="border-t border-zinc-900 bg-zinc-950 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-650 font-bold">
          <span>&copy; {new Date().getFullYear()} News Eisamay. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
