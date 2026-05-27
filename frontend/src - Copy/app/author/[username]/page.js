import { notFound } from "next/navigation";
import Link from "next/link";

/**
 * Fetch Author data from your WordPress BFF
 */
async function getAuthorData(username) {
    const url=`${process.env.NEXT_PUBLIC_API_URL}/posts/author/${username}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    console.log(res);
    if (!res.ok) return null;

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("BFF Author Fetch Error:", error);
    return null;
  }
}

/**
 * Helper to generate the correct URL based on post categories
 */
const getPostUrl = (post) => {
  const categories = post.categories?.nodes || [];
  if (categories.length === 0) return `/news/${post.slug}`;
  
  // Joins slugs for hierarchy: /india/west-bengal/slug
  const path = categories.map((cat) => cat.slug).join("/");
  return `/${path}/${post.slug}`;
};

/**
 * Dynamic Metadata for SEO
 */
export async function generateMetadata({ params }) {
  const { username } = await params;
  const author = await getAuthorData(username);

  if (!author) return { title: "Author Not Found" };

  return {
    title: `${author.name} | The Eastern Gazette`,
    description: author.description || `Read the latest articles by ${author.name}`,
  };
}

export default async function AuthorPage({ params }) {
  // IMPORTANT: Await params in Next.js 15/16
  const { username } = await params;
  const author = await getAuthorData(username);

  if (!author) return notFound();

  return (
    <main className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Profile Header */}
      <section className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-10 mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
          <img
            src={author.avatar?.url}
            alt={author.name}
            className="rounded-full object-cover w-full h-full border-4 border-white shadow-md"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            {author.name}
          </h1>
          {author.description && (
            <p className="text-lg text-slate-600 leading-relaxed font-serif italic">
              {author.description}
            </p>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-black pb-2 mb-8">
        Recent Reporting
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {author.posts?.nodes?.map((post) => (
          <Link href={getPostUrl(post)} key={post.slug} className="group">
            <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden mb-4">
              {post.featuredImage?.node?.sourceUrl && (
                <img
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              )}
            </div>
            <h3 className="text-xl font-bold leading-tight group-hover:underline decoration-red-600">
              {post.title}
            </h3>
            <p className="text-sm text-slate-400 mt-3">
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}