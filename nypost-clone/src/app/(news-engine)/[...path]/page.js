import { getHierarchicalCategories } from "../../../lib/util";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/article/ArticlePage";
import L1CategoryPage from "@/components/category/L1CategoryPage";
import L2CategoryPage from "@/components/category/L2CategoryPage";

export const revalidate = 60;

// -- Fetchers ------------------------------------------

async function fetchPost(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/detail/${slug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

async function fetchL1Category(l1slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/category/${l1slug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

async function fetchL2Category(l1slug, l2slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/category/${l2slug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

// -- Metadata ------------------------------------------

export async function generateMetadata({ params }) {
  const { path } = await params;
  const [l1slug, second, third] = path;

  // /india/bihar/biharnews1 -> L2 article
  if (third) {
    const post = await fetchPost(third);
    if (!post) return {};
    return {
      title: post.seo?.title || `${post.title} | News Eisamay`,
      description: post.seo?.description || "",
    };
  }

  // /india/something -> try as article first
  if (second) {
    const post = await fetchPost(second);
    if (post) {
      return {
        title: post.seo?.title || `${post.title} | News Eisamay`,
        description: post.seo?.description || "",
      };
    }
    // it's an L2 category
    return {
      title: `${second.replace(/-/g, " ")} - ${l1slug.replace(/-/g, " ")} | News Eisamay`,
      description: `Latest news from ${second.replace(/-/g, " ")}`,
    };
  }

  // /india -> L1 category
  return {
    title: `${l1slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | News Eisamay`,
    description: `Latest news from ${l1slug.replace(/-/g, " ")}`,
  };
}

// -- Page ----------------------------------------------

export default async function NewsEnginePage({ params }) {
  const { path } = await params;
  
  // -- 1. STRICT LENGTH CHECK --------------------------
  if (path.length > 3) {
    return notFound();
  }

  const [l1slug, second, third] = path;

  // -- 2. THREE SEGMENTS: /l1/l2/post-slug -------------
  if (path.length === 3) {
    const post = await fetchPost(third);
    if (!post) return notFound();

    // Structural Validation
    const { l1, l2 } = getHierarchicalCategories(post.categories?.nodes);
    if (l1?.slug !== l1slug || l2?.slug !== second) {
      return notFound();
    }

    return <ArticlePage post={post} l1slug={l1slug} l2slug={second} />;
  }

  // -- 3. TWO SEGMENTS: /l1/post-slug OR /l1/l2-category
  if (path.length === 2) {
    const post = await fetchPost(second);
    
    if (post) {
      const { l1, l2 } = getHierarchicalCategories(post.categories?.nodes);
      // Ensure it's an L1 article (no L2 category assigned)
      if (l1?.slug !== l1slug || l2 !== null) {
        return notFound();
      }
      return <ArticlePage post={post} l1slug={l1slug} />;
    }

    // Fallback to L2 Category Page
    const categoryData = await fetchL2Category(l1slug, second);
    if (!categoryData) return notFound();
    return <L2CategoryPage l1slug={l1slug} l2slug={second} data={categoryData} />;
  }

  // -- 4. ONE SEGMENT: /l1-category
  if (path.length === 1) {
    const categoryData = await fetchL1Category(l1slug);
    if (!categoryData) return notFound();
    return <L1CategoryPage l1slug={l1slug} data={categoryData} />;
  }

  return notFound();
}
