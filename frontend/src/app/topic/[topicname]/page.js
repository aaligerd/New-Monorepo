import { notFound } from "next/navigation";
import Link from "next/link";

async function getTopicData(slug) {
  try {
    // Note: Pointing to your specific tag/topic endpoint
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/topic/${slug}`, {
      next: { revalidate: 300 }, 
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("BFF Topic Fetch Error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { topicname } = await params;
  const data = await getTopicData(topicname);

  if (!data) return { title: "Topic Not Found" };

  return {
    title: data.seo?.title || data.name,
    description: data.seo?.description || `Latest news regarding ${data.name}`,
    robots: {
      index: false, // Matches your SEO object "noindex"
      follow: true,
    }
  };
}

export default async function TopicPage({ params }) {
  const { topicname } = await params;
  const data = await getTopicData(topicname);

  if (!data || !data.posts) return notFound();

  // Extract JSON-LD from fullHead safely
  const extractSchema = (html) => {
    if (!html) return null;
    const match = html.match(/<script type="application\/ld\+json" class="rank-math-schema">(.*?)<\/script>/s);
    return match ? match[1] : null;
  };

  const schemaJson = extractSchema(data.seo?.fullHead);

  return (
    <>
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        {/* Header Section */}
        <header className="mb-12 border-b-8 border-black pb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">
              Topic
            </span>
            <span className="text-slate-400 text-xs font-bold uppercase">
              {data.count} {data.count === 1 ? 'Story' : 'Stories'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            {data.name}
          </h1>
          {data.description && (
            <p className="mt-4 text-xl text-slate-600 font-serif italic max-w-2xl">
              {data.description}
            </p>
          )}
        </header>

        {/* Posts Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.posts.nodes.map((post) => (
            <Link 
              href={`/news/${post.slug}`} 
              key={post.slug} 
              className="group flex flex-col"
            >
              <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-4 relative">
                {post.featuredImage?.node?.sourceUrl ? (
                  <img
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    No Image
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold leading-tight group-hover:text-red-700 transition-colors line-clamp-3">
                {post.title}
              </h3>

              <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                <time className="text-xs text-slate-400 font-medium">
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </time>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                  The Eastern Gazette
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}