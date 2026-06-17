"use client";

// src/components/layout/Footer.js
import Link from "next/link";
import Image from "next/image";

const LATEST_NEWS_LINKS = [
  { label: "What's changed in India's new inflation index? Key details explained", href: "/business/whats-changed-indias-new-inflation-index-key-details-explained" },
  { label: "ITR filing guide: Can you file income tax returns without Form 16?", href: "/business/itr-filing-guide-can-you-file-income-tax-returns-without-form-16" },
  { label: "Technical issue: Kannur-Jeddah Air India Express flight turns back with 180 passengers onboard", href: "/india/technical-issue-kannur-jeddah-air-india-express-flight-turns-back" },
  { label: "6.7-magnitude earthquake jolts Indonesia's Sulawesi, damage assessment underway", href: "/world/6.7-magnitude-earthquake-jolts-indonesias-sulawesi" },
  { label: "Re-NEET UG 2026: New portal lets students flag leaks, scams and malpractices", href: "/india/re-neet-ug-2026-new-portal-lets-students-flag-leaks" },
];

const AUDIO_STORIES_LINKS = [
  { label: "US says it carried out 'self-defence strikes' on Iranian military sites", href: "/world/us-says-it-carried-out-self-defence-strikes-on-iranian-military-sites" },
  { label: "'If I had the confidence to...': Kiran Rao opens up on filmmaking fares, wishes her debut film did better", href: "/entertainment/kiran-rao-opens-up-on-filmmaking" },
  { label: "Trump wants to join Mount Rushmore? AI post fuels old controversy again", href: "/world/trump-wants-to-join-mount-rushmore" },
  { label: "LPG prices jump again across major cities; Delhi, Kolkata among worst hit", href: "/business/lpg-prices-jump-again-across-major-cities" },
  { label: "Horoscope today, June 1: New beginnings, career opportunities and financial growth", href: "/lifestyle/horoscope-today-june-1" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0b0c10] text-[#a0a5b5] font-sans border-t border-zinc-800">
      {/* Top Footer Section */}
      <div className="w-full px-4 lg:px-[10%] py-12 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mx-auto">
        {/* Brand column: Left (3 cols on desktop) */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <Link href="/" className="block">
            {/* Display the light logo on dark footer background */}
            <Image
              src="/images/en-logo-dark.png"
              alt="News Eisamay Logo"
              width={180}
              height={50}
              className="h-12 w-auto object-contain"
            />
          </Link>
          
          <div className="flex flex-col gap-2 text-xs font-semibold text-zinc-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>

          <div className="flex flex-col gap-2 text-xs font-black uppercase tracking-wider text-white mt-4">
            <Link href="/about" className="hover:text-[#f99d1b] transition-colors">ABOUT US</Link>
            <Link href="/contact" className="hover:text-[#f99d1b] transition-colors">CONTACT US</Link>
          </div>
        </div>

        {/* Latest News column: Middle (3 cols on desktop) */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-white font-black text-sm uppercase tracking-wider border-b-2 border-zinc-800 pb-2">
            Latest News
          </h4>
          <ul className="flex flex-col gap-3 text-xs leading-normal">
            {LATEST_NEWS_LINKS.map((link, idx) => (
              <li key={idx} className="hover:text-white transition-colors line-clamp-2">
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Audio Stories column: Middle-Right (3 cols on desktop) */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-white font-black text-sm uppercase tracking-wider border-b-2 border-zinc-800 pb-2">
            Listen to Audio Stories
          </h4>
          <ul className="flex flex-col gap-3 text-xs leading-normal">
            {AUDIO_STORIES_LINKS.map((link, idx) => (
              <li key={idx} className="hover:text-white transition-colors line-clamp-2">
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter column: Right (3 cols on desktop) */}
        <div className="md:col-span-3 flex flex-col gap-4 bg-zinc-900/30 p-5 border border-zinc-800/50">
          <h4 className="text-white font-black text-sm uppercase tracking-wider">
            Subscribe to our Newsletter
          </h4>
          <p className="text-xs leading-normal text-zinc-500 font-semibold">
            Join 10k+ people to get notified about new posts, news and tips.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2.5 mt-2">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-white text-black text-xs font-bold px-3 py-2.5 border border-zinc-350 focus:border-[#f99d1b] focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#dc2626] text-white text-xs font-black uppercase tracking-widest py-2.5 hover:bg-red-700 transition-colors cursor-pointer"
            >
              Sign Up
            </button>
          </form>
          <span className="text-[10px] text-zinc-600 block mt-1 text-center font-medium">
            Do not worry we don't spam!
          </span>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-zinc-900 bg-[#07080a] py-6">
        <div className="w-full px-4 lg:px-[10%] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-zinc-650 mx-auto">
          <span className="text-center sm:text-left">
            Tidings Media and Communications Private Limited &copy; {new Date().getFullYear()}. All rights reserved.
          </span>
          {/* Social media links inside the bottom row */}
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
              <img src="/images/facebook.png" alt="Facebook" className="w-5 h-5 object-contain invert opacity-80" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
              <img src="/images/twitter.png" alt="Twitter" className="w-5 h-5 object-contain invert opacity-80" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
              <img src="/images/instagram.png" alt="Instagram" className="w-5 h-5 object-contain invert opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
