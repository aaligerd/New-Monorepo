import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsTicker from "@/components/layout/NewsTicker";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const metadata = {
  title: {
    default: "The Eastern Gazette | News Plus",
    template: "%s | The Eastern Gazette",
  },
  description: "The Eastern Gazette - High-impact, raw, GenZ news & opinions from India and beyond.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="bg-viewport min-h-full font-sans antialiased text-brutal-black p-3 sm:p-5 md:p-8 flex flex-col items-center justify-start">
        {/* Main framed inner website canvas */}
        <div className="w-full max-w-[1360px] bg-canvas border-[4px] border-brutal-black shadow-brutal-lg rounded-[20px] md:rounded-[32px] overflow-hidden flex flex-col min-h-screen">
          <Header />
          <NewsTicker />
          <div className="flex-1 bg-white">
            {children}
          </div>
          <Footer />
        </div>
        
      </body>
    </html>
  );
}
