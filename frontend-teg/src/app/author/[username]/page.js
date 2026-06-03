import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

async function getAuthorData(username) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/author/${username}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    if (!res.ok) return null;

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("BFF Author Fetch Error:", error);
    return null;
  }
}

const getPostUrl = (post) => {
  const categories = post.categories?.nodes || [];
  if (categories.length === 0) return `/news/${post.slug}`;
  const path = categories.map((cat) => cat.slug).join("/");
  return `/${path}/${post.slug}`;
};

export async function generateMetadata({ params }) {
  const { username } = await params;
  const author = await getAuthorData(username);

  if (!author) return { title: "Author Not Found" };

  const authorName = author.name || `${author.firstName || ""} ${author.lastName || ""}`.trim() || "Staff Writer";

  return {
    title: `${authorName} | The Eastern Gazette`,
    description: author.description || `Read the latest articles by ${authorName}`,
  };
}

export default async function AuthorPage({ params }) {
  const { username } = await params;
  const author = await getAuthorData(username);

  if (!author) return notFound();

  const authorName = author.name || `${author.firstName || ""} ${author.lastName || ""}`.trim() || "Staff Writer";

  return (
    <main className="max-w-[1360px] mx-auto px-4 sm:px-6 py-10 font-sans">
      {/* Profile Header Card */}
      <section className="bg-canvas border-[3px] border-brutal-black rounded-[20px] p-6 md:p-10 mb-12 flex flex-col md:flex-row items-center gap-8 shadow-brutal">
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
          <img
            src={author.avatar?.url || `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`}
            alt={authorName}
            className="rounded-full object-cover w-full h-full border-[4px] border-brutal-black shadow-brutal bg-white"
          />
        </div>
        <div className="text-center md:text-left">
          <span className="inline-block text-[10px] font-black uppercase tracking-widest text-white bg-accent-coral border-[2px] border-brutal-black px-2.5 py-0.5 rounded-[4px] shadow-[2px_2px_0px_#111] mb-2 select-none">
            AUTHOR PROFILE
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-brutal-black mb-4 font-brutal uppercase tracking-tight">
            {authorName}
          </h1>
          {author.description && (
            <p className="text-base sm:text-lg font-bold text-brutal-black/75 leading-relaxed font-sans">
              {author.description}
            </p>
          )}
        </div>
      </section>

      {/* Articles Header */}
      <div className="border-b-[3px] border-brutal-black pb-3 mb-8">
        <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white bg-brutal-black border-[3px] border-brutal-black px-4 py-1.5 rounded-[8px] font-brutal shadow-[3px_3px_0px_#f4a261] w-fit">
          Recent Reporting
        </h2>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {author.posts?.nodes?.map((post) => (
          <Link
            href={getPostUrl(post)}
            key={post.slug}
            className="group flex flex-col gap-3 bg-white border-[3px] border-brutal-black rounded-[16px] p-4 shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-300"
          >
            <div className="aspect-video bg-accent-orange/5 rounded-[12px] overflow-hidden border-[2px] border-brutal-black relative shrink-0">
              {post.featuredImage?.node?.sourceUrl ? (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-w-768px) 100vw, 30vw"
                />
              ) : (
                <div className="w-full h-full bg-accent-orange/15 text-brutal-black/40 flex items-center justify-center font-black text-xs uppercase select-none font-brutal">
                  TEG NEWS
                </div>
              )}
            </div>
            <h3 className="text-sm font-black text-brutal-black group-hover:text-accent-coral transition-colors leading-snug line-clamp-3 font-brutal uppercase tracking-tight">
              {post.title}
            </h3>
            <p className="text-[10px] font-bold text-brutal-black/55 mt-auto">
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
