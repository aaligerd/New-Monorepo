import { Oswald, Merriweather, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

export const metadata = {
  title: {
    default: "News Eisamay",
    template: "%s | News Eisamay",
  },
  description: "Breaking news, regional reports and analysis from News Eisamay.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${merriweather.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="bg-[#fcfbf9] text-zinc-900 font-sans min-h-full flex flex-col">
        <Header />
        <div className="flex-grow min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
