import { notFound } from "next/navigation";
import L1CategoryPage from "@/components/category/L1CategoryPage";
import L2CategoryPage from "@/components/category/L2CategoryPage";
import ArticlePage from "@/components/article/ArticlePage";

export const revalidate = 120;

async function getPostDetail(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/detail/${slug}`, {
      next: { revalidate: 120 }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching post detail:", error);
    return null;
  }
}

async function getCategoryDetail(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/category/${slug}`, {
      next: { revalidate: 120 }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching category detail:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { path } = await params;
  if (!path || path.length === 0 || path.length > 3) {
    return { title: "Not Found" };
  }

  // 1. L1 Category (e.g. /india)
  if (path.length === 1) {
    const catData = await getCategoryDetail(path[0]);
    if (!catData) return { title: "Category Not Found" };
    return {
      title: `${catData.name || path[0]} | News Eisamay`,
      description: `Read the latest stories and updates from ${catData.name || path[0]} section.`,
    };
  }

  // 2. L2 Category OR L1 Post (e.g. /india/politics or /india/post-slug)
  if (path.length === 2) {
    const postData = await getPostDetail(path[1]);
    if (postData) {
      return {
        title: `${postData.title} | News Eisamay`,
        description: postData.excerpt?.replace(/<[^>]*>/g, "") || `Read the full story: ${postData.title}`,
      };
    }
    const catData = await getCategoryDetail(path[1]);
    if (catData) {
      return {
        title: `${catData.name || path[1]} | News Eisamay`,
        description: `Read the latest stories and sub-section updates from ${catData.name || path[1]}.`,
      };
    }
    return { title: "Not Found" };
  }

  // 3. L2 Post (e.g. /india/politics/post-slug)
  if (path.length === 3) {
    const postData = await getPostDetail(path[2]);
    if (!postData) return { title: "Article Not Found" };
    return {
      title: `${postData.title} | News Eisamay`,
      description: postData.excerpt?.replace(/<[^>]*>/g, "") || `Read the full story: ${postData.title}`,
    };
  }

  return { title: "Not Found" };
}

export default async function CatchAllPage({ params }) {
  const { path } = await params;

  if (!path || path.length === 0 || path.length > 3) {
    return notFound();
  }

  const l1slug = path[0];

  // Helper to extract JSON-LD schema
  const extractSchema = (html) => {
    if (!html) return null;
    const match = html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/s);
    return match ? match[1] : null;
  };

  // 1. Length 1: L1 Category Page (e.g. /india)
  if (path.length === 1) {
    const categoryData = await getCategoryDetail(l1slug);
    if (!categoryData) {
      return notFound();
    }
    return <L1CategoryPage l1slug={l1slug} data={categoryData} />;
  }

  // 2. Length 2: L2 Category (e.g. /india/politics) OR L1 Post (e.g. /india/post-slug)
  if (path.length === 2) {
    const secondSlug = path[1];
    
    // Check if it's an article detail first
    const postData = await getPostDetail(secondSlug);
    if (postData) {
      const schemaJson = extractSchema(postData.seo?.fullHead);
      return (
        <>
          {schemaJson && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: schemaJson }}
            />
          )}
          <ArticlePage post={postData} l1slug={l1slug} l2slug={null} />
        </>
      );
    }

    // Otherwise, check if it's an L2 Category
    const categoryData = await getCategoryDetail(secondSlug);
    if (categoryData) {
      return <L2CategoryPage l1slug={l1slug} l2slug={secondSlug} data={categoryData} />;
    }

    return notFound();
  }

  // 3. Length 3: L2 Post (e.g. /india/politics/post-slug)
  if (path.length === 3) {
    const postSlug = path[2];
    const l2slug = path[1];
    const postData = await getPostDetail(postSlug);
    if (!postData) {
      return notFound();
    }
    const schemaJson = extractSchema(postData.seo?.fullHead);
    return (
      <>
        {schemaJson && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schemaJson }}
          />
        )}
        <ArticlePage post={postData} l1slug={l1slug} l2slug={l2slug} />
      </>
    );
  }

  return notFound();
}
