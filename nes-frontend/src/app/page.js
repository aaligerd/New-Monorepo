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
import Section1 from "@/components/home/Section1";
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
  title: "News Eisamay | Bold Tabloid News",
  description: "Get the latest breaking regional updates, political affairs, business reporting, and stories from News Eisamay.",
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

  const indiaSec = dynamicSections.find(s => s.slug === "india");
  const wbSec = dynamicSections.find(s => s.slug === "west-bengal");
  const sportsSec = dynamicSections.find(s => s.slug === "sports");
  const entertainmentSec = dynamicSections.find(s => s.slug === "entertainment" || s.slug === "entertainment-news");
  const businessSec = dynamicSections.find(s => s.slug === "business" || s.slug === "business-news");
  const lifestyleSec = dynamicSections.find(s => s.slug === "lifestyle" || s.slug === "lifestyle-news");

  return (
    <main className="min-h-screen bg-white dark:bg-black px-4 lg:px-[10%] mx-auto py-6 flex flex-col gap-6">
      {/* Top Stories Bar Component - 10 posts (Desktop only, mobile uses header PostTicker) */}
      <div className="hidden lg:block ">
        <TopStoriesBar posts={latestPosts.slice(0, 10)} />
      </div>

      {/* Hero Carousel Component - 7 posts */}
      <HeroCarousel posts={latestPosts.slice(0, 7)} />

      {/* Section 1 (India & West Bengal Layout) */}
      <Section1
        leftTitle="India"
        leftPosts={indiaSec?.posts?.slice(1, 5) || []}
        middlePost={indiaSec?.posts?.[0] || null}
        rightTitle="West Bengal"
        rightPosts={wbSec?.posts?.slice(0, 4) || []}
      />

      {/* Section 2 (National Trend Carousel) */}
      <Section2
        title="National Trend"
        posts={indiaSec?.posts?.slice(0, 8) || []}
      />

      {/* YouTube Channel Video Carousel */}
      <YoutubeCarousel />

      {/* Section 3 (World & Sports Layout) */}
      <Section3
        leftTitle="World"
        leftPosts={[]} // Since World isn't in API, fallback to mockup data
        middleTitle="Sports"
        middlePosts={sportsSec?.posts?.slice(1, 5) || []}
        rightPost={sportsSec?.posts?.[0] || null}
      />

      {/* Section 4 (Entertainment, Business, Lifestyle Layout) */}
      <Section4
        col1Title="Entertainment"
        col1Posts={entertainmentSec?.posts || []}
        col2Title="Business"
        col2Posts={businessSec?.posts || []}
        col3Title="Lifestyle"
        col3Posts={lifestyleSec?.posts || []}
      />
    </main>
  );
}
