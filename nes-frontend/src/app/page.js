import Link from "next/link";
import Image from "next/image";
import CategorySection from "@/components/category/CategorySection";
import CategoryLayout3 from "@/components/category/CategoryLayout3";
import CategoryLayout4 from "@/components/category/CategoryLayout4";
import CategoryLayout5 from "@/components/category/CategoryLayout5";
import AdSlot from "@/components/ads/AdSlot";
import { getPostUrl } from "../lib/util";
import SpotlightCarousel from "@/components/home/SpotlightCarousel";
import NewsletterForm from "@/components/home/NewsletterForm";
import HeroCarousel from "@/components/home/HeroCarousel";
import TopStoriesBar from "@/components/home/TopStoriesBar";
import Section2 from "@/components/home/Section2";
import YoutubeCarousel from "@/components/home/YoutubeCarousel";
import Section3 from "@/components/home/Section3";
import Section4 from "@/components/home/Section4";

export const revalidate = 120;

async function getHomeData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/home`,
      { next: { revalidate: 120 } }
    );
    if (!res.ok) throw new Error("Failed to fetch home data");
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Homepage data fetch failed:", error);
    return null;
  }
}

export const metadata = {
  title: "News Eisamay | Latest regional updates, political affairs, business & sports news",
  description: "Read bold, breaking regional news, politics, cricket updates, business reports, entertainment and lifestyle stories on News Eisamay.",
  keywords: [
    "News Eisamay",
    "breaking news",
    "regional updates",
    "politics",
    "cricket news",
    "business updates",
    "entertainment",
    "lifestyle"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "News Eisamay | Latest regional updates, political affairs, business & sports news",
    description: "Read bold, breaking regional news, politics, cricket updates, business reports, entertainment and lifestyle stories on News Eisamay.",
    url: "/",
    siteName: "News Eisamay",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/en-logo-light.webp",
        width: 1200,
        height: 630,
        alt: "News Eisamay Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News Eisamay | Latest regional updates, political affairs, business & sports news",
    description: "Read bold, breaking regional news, politics, cricket updates, business reports, entertainment and lifestyle stories on News Eisamay.",
    images: ["/images/en-logo-light.webp"],
  },
};

export default async function HomePage() {
  const data = await getHomeData();

  if (!data) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-500 font-sans border-2 border-zinc-200 bg-white my-8 dark:bg-black dark:border-zinc-800">
        <h2 className="text-xl font-black uppercase text-black mb-2 dark:text-white" style={{ fontFamily: "var(--font-oswald)" }}>Connection Offline</h2>
        <p className="text-sm font-semibold">Unable to fetch homepage content. Please verify that your Backend-for-Frontend (BFF) server is active on port 9595.</p>
      </main>
    );
  }

  const latestPosts = data.latestPosts || [];
  const dynamicSections = data.dynamicSections || [];
  const { firstImage, firstLink, firstText,
    secondLink, secondText, secondImage,
    thirdLink, thirdText, thirdImage } = data;

  // Group spotlight columns for rendering
  const spotlightItems = [
    { image: firstImage, text: firstText, link: firstLink },
    { image: secondImage, text: secondText, link: secondLink },
    { image: thirdImage, text: thirdText, link: thirdLink },
  ].filter((item) => item.image || item.text || item.link);

  // Static Hero Story and Inset Story (Matching example_layout_1.png layout)
  const heroPost = latestPosts[0];
  const heroImage = heroPost?.featuredImage?.node?.sourceUrl;
  const heroCategoryName = heroPost?.categories?.nodes?.[0]?.name || "NEWS";
  const heroTitle = heroPost?.title || "";
  const heroLink = heroPost ? getPostUrl(heroPost) : "#";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "News Eisamay",
    "alternateName": "NewsEisamay",
    "url": "http://localhost:3000",
    "logo": "http://localhost:3000/images/en-logo-light.webp",
    "description": "Read bold, breaking regional news, politics, cricket updates, business reports, entertainment and lifestyle stories on News Eisamay.",
    "sameAs": [
      "https://www.facebook.com",
      "https://twitter.com"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white dark:bg-black px-4 lg:px-[10%] mx-auto py-6 flex flex-col gap-6">
        <h1 className="sr-only">News Eisamay | Latest regional updates, political affairs, business & sports news</h1>
        {/* Top Stories Bar Component - rest of the latest posts (Desktop only, mobile uses header PostTicker) */}
      <div className="hidden lg:block ">
        <TopStoriesBar posts={latestPosts.slice(7)} />
      </div>

      {/* Hero Carousel Component - 7 posts */}
      <HeroCarousel posts={latestPosts.slice(0, 7)} />

      {/* Section 1 (First three dynamic sections: India, West Bengal, National Trend using Section4 layout) */}
      <Section4
        col1Title={dynamicSections[0]?.name || "India"}
        col1Posts={dynamicSections[0]?.posts || []}
        col2Title={dynamicSections[1]?.name || "West Bengal"}
        col2Posts={dynamicSections[1]?.posts || []}
        col3Title={dynamicSections[2]?.name || "National Trend"}
        col3Posts={dynamicSections[2]?.posts || []}
      />

          {/* YouTube Channel Video Carousel */}
      <YoutubeCarousel />


      {/* Section 2 (Fourth dynamic section, e.g., World Carousel) */}
      <Section2
        title={dynamicSections[3]?.name || "World"}
        posts={dynamicSections[3]?.posts?.slice(0, 8) || []}
      />



      {/* Section 3 (Fifth & Sixth dynamic sections, e.g., Sports & Entertainment Layout) */}
      <Section3
        leftTitle={dynamicSections[4]?.name || "Sports"}
        leftPosts={dynamicSections[4]?.posts || []}
        middleTitle={dynamicSections[5]?.name || "Entertainment"}
        middlePosts={dynamicSections[5]?.posts?.slice(1, 6) || []}
        rightPost={dynamicSections[5]?.posts?.[0] || null}
      />

      {/* Section 4 (Seventh, Eighth, & Ninth dynamic sections, e.g., Business, Lifestyle, Others Layout) */}
      <Section4
        col1Title={dynamicSections[6]?.name || "Business"}
        col1Posts={dynamicSections[6]?.posts || []}
        col2Title={dynamicSections[7]?.name || "Lifestyle"}
        col2Posts={dynamicSections[7]?.posts || []}
        col3Title={dynamicSections[8]?.name || "Others"}
        col3Posts={dynamicSections[8]?.posts || []}
      />
    </main>
    </>
  );
}
