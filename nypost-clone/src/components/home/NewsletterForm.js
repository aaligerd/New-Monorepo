"use client";

export default function NewsletterForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to Daily Bulletins!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        placeholder="Enter email address"
        className="w-full bg-zinc-900 text-white border border-zinc-700 text-xs px-3 py-2 outline-none focus:border-[#f99d1b] uppercase font-bold"
        required
      />
      <button
        type="submit"
        className="w-full bg-[#f99d1b] text-black text-xs font-black uppercase tracking-wider py-2 transition-colors hover:bg-white cursor-pointer"
      >
        SUBSCRIBE NOW
      </button>
    </form>
  );
}
