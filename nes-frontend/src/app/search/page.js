export const metadata = {
  title: "Search | News Eisamay",
  description: "Search news updates and reports on News Eisamay.",
};

export default function SearchPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20 text-center font-sans border border-zinc-200 bg-white my-8">
      <h1 className="text-3xl font-black uppercase text-black mb-3 font-display" style={{ fontFamily: "var(--font-oswald)" }}>
        SEARCH NEWS EISAMAY
      </h1>
      <p className="text-sm font-semibold text-zinc-550 max-w-md mx-auto leading-relaxed">
        The Search functionality is currently under development. Please check back later for full textual search support across the Eisamay network database.
      </p>
    </main>
  );
}
