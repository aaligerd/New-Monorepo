import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 120;

async function getAuthorData(username) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/author/${username}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 120 },
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
    title: `${authorName} | News Eisamay`,
    description: author.description || `Read the latest articles by ${authorName}`,
  };
}

export default async function AuthorPage({ params }) {
  const { username } = await params;
  const author = await getAuthorData(username);

  if (!author) return notFound();

  const authorName = author.name || `${author.firstName || ""} ${author.lastName || ""}`.trim() || "Staff Writer";

  return (
    <main className="container mx-auto px-4 py-10 max-w-6xl font-sans">
      {/* Profile Header */}
      <section className="bg-zinc-50 border-2 border-zinc-200 p-6 md:p-10 mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 border-2 border-black overflow-hidden">
          {author.avatar?.url ? (
            <img
              src={author.avatar.url}
              alt={authorName}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-[#f99d1b] text-black font-black text-2xl flex items-center justify-center">
              {authorName.charAt(0)}
            </div>
          )}
        </div>
        <div className="text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest bg-black text-[#f99d1b] px-2 py-0.5 mb-3 inline-block">
            REPORTER PROFILE
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-black mb-4 tracking-tight uppercase font-display" style={{ fontFamily: "var(--font-oswald)" }}>
            {authorName}
          </h1>
          {author.description && (
            <p className="text-base sm:text-lg text-zinc-650 leading-relaxed font-serif italic">
              {author.description}
            </p>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <h2 className="text-xl font-black uppercase tracking-wider border-b-4 border-black pb-2 mb-8 font-display" style={{ fontFamily: "var(--font-oswald)" }}>
        RECENT REPORTING
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {author.posts?.nodes?.map((post) => (
          <Link href={getPostUrl(post)} key={post.slug} className="group border border-zinc-200 p-4 bg-white hover:border-[#f99d1b] transition-all">
            <div className="aspect-video bg-zinc-100 border border-zinc-200 overflow-hidden mb-4">
              {post.featuredImage?.node?.sourceUrl && (
                <img
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold leading-tight group-hover:text-[#f99d1b] transition-colors uppercase">
              {post.title}
            </h3>
            <p className="text-xs text-zinc-400 font-bold uppercase mt-3">
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
