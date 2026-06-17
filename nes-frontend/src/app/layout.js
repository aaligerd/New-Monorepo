import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const samayFont = localFont({
  src: [
    {
      path: "../../fonts/4CSamayUni Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/4CSamayUni.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/4CSamayUniBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/4CSamayUniExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../fonts/4CSamayUniExtraBold.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-samay",
  display: "swap",
});

const workSans = localFont({
  src: [
    {
      path: "../../fonts/Work_Sans/WorkSans-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../../fonts/Work_Sans/WorkSans-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-worksans",
  display: "swap",
});

const playfairDisplay = localFont({
  src: [
    {
      path: "../../fonts/Playfair_Display/PlayfairDisplay-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../../fonts/Playfair_Display/PlayfairDisplay-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
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
    <html lang="en" className={`${samayFont.variable} ${workSans.variable} ${playfairDisplay.variable} h-full antialiased`}>
      <body className="bg-[#fcfbf9] text-zinc-900 font-sans min-h-full flex flex-col dark:bg-black dark:text-zinc-100 transition-colors duration-200">
        <Header />
        <div className="flex-grow min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
