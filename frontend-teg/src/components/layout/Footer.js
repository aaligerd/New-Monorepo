"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faSquareTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

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
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thanks for subscribing!");
  };

  return (
    <footer className="bg-canvas border-t-[3px] border-brutal-black mt-16 font-sans">
      {/* Newsletter Block */}
      <div className="border-b-[3px] border-brutal-black bg-accent-orange/10 p-6 md:p-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-md">
            <h3 className="font-brutal uppercase text-xl md:text-2xl font-black text-brutal-black leading-tight">
              Get the Real Story
            </h3>
            <p className="text-sm font-bold text-brutal-black/70 mt-1">
              Raw perspectives, high impact updates, and direct delivery. No fluff.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1 max-w-md">
            <input
              type="email"
              required
              placeholder="YOUR.EMAIL@DOM.COM"
              className="flex-1 bg-white border-[3px] border-brutal-black px-4 py-2.5 rounded-[8px] font-bold text-xs uppercase tracking-wider placeholder:text-brutal-black/40 focus:outline-none focus:bg-accent-orange/5"
            />
            <button
              type="submit"
              className="bg-accent-coral text-white font-brutal uppercase text-xs font-black border-[3px] border-brutal-black rounded-[8px] px-6 py-2.5 shadow-brutal hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#111] transition-all cursor-pointer whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1360px] mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="flex flex-col items-start">
          <Link href="/" className="block mb-4 leading-none">
            <span className="text-2xl font-black font-brutal uppercase tracking-tight text-brutal-black">
              The Eastern Gazette
            </span>
          </Link>
          <p className="text-sm font-bold text-brutal-black/70 leading-relaxed mb-6">
            Covering Eastern India and beyond. High-impact GenZ targeted news, opinions, and analysis. Committed to truth.
          </p>
          {/* Social icons */}
          <div className="flex gap-2">
            <a href="https://facebook.com" className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white flex items-center justify-center text-brutal-black shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all">
              <FontAwesomeIcon icon={faSquareFacebook} className="text-sm" />
            </a>
            <a href="https://instagram.com" className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white flex items-center justify-center text-brutal-black shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all">
              <FontAwesomeIcon icon={faSquareInstagram} className="text-sm" />
            </a>
            <a href="https://twitter.com" className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white flex items-center justify-center text-brutal-black shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all">
              <FontAwesomeIcon icon={faSquareTwitter} className="text-sm" />
            </a>
            <a href="https://youtube.com" className="w-8 h-8 rounded-[6px] border-[2px] border-brutal-black bg-white flex items-center justify-center text-brutal-black shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all">
              <FontAwesomeIcon icon={faYoutube} className="text-sm" />
            </a>
          </div>
        </div>

        {/* Nav columns */}
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col">
            <h4 className="font-brutal text-sm font-black uppercase tracking-widest text-brutal-black border-b-[2px] border-brutal-black pb-1 mb-4 w-fit">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-brutal-black/70 hover:text-accent-coral transition-colors"
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
      <div className="border-t-[3px] border-brutal-black bg-canvas">
        <div className="max-w-[1360px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-black uppercase tracking-wider text-brutal-black/60">
          <span>© {new Date().getFullYear()} The Eastern Gazette. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-accent-coral transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent-coral transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
