import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

async function getTopicData(slug) {
  try {
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
      index: false,
      follow: true,
    }
  };
}

export default async function TopicPage({ params }) {
  const { topicname } = await params;
  const data = await getTopicData(topicname);

  if (!data || !data.posts) return notFound();

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

      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 py-10 font-sans">
        {/* Header Section */}
        <header className="mb-12 border-b-[3px] border-brutal-black pb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-accent-coral text-white text-[10px] font-black border-[2px] border-brutal-black px-2.5 py-0.5 uppercase tracking-widest shadow-[2px_2px_0px_#111] select-none">
              Topic
            </span>
            <span className="text-brutal-black font-black uppercase text-xs">
              {data.count} {data.count === 1 ? 'Story' : 'Stories'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-brutal-black font-brutal">
            {data.name}
          </h1>
          {data.description && (
            <p className="mt-4 text-lg font-bold text-brutal-black/70 max-w-2xl">
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
              className="group flex flex-col bg-white border-[3px] border-brutal-black rounded-[16px] p-4 shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-300 gap-3"
            >
              <div className="aspect-video bg-accent-orange/5 rounded-[12px] overflow-hidden relative border-[2px] border-brutal-black shrink-0">
                {post.featuredImage?.node?.sourceUrl ? (
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, 30vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brutal-black/35 font-brutal uppercase text-xs select-none">
                    TEG NEWS
                  </div>
                )}
              </div>

              <h3 className="text-sm font-black text-brutal-black group-hover:text-accent-coral transition-colors leading-snug line-clamp-3 font-brutal uppercase tracking-tight">
                {post.title}
              </h3>

              <div className="mt-auto pt-4 flex items-center justify-between border-t-[2px] border-brutal-black/10">
                <time className="text-[10px] font-black text-brutal-black/55">
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </time>
                <span className="text-[9px] font-black text-brutal-black/40 uppercase tracking-wider">
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
