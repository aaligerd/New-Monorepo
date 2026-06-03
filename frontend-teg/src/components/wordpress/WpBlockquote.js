export default function WpBlockquote({ className, children }) {
  return (
    <blockquote className={`border-[3px] border-brutal-black pl-5 pr-4 py-4 my-6 bg-accent-orange/15 text-brutal-black italic font-display text-lg sm:text-xl leading-relaxed shadow-brutal rounded-[8px] ${className || ""}`}>
      {children}
    </blockquote>
  );
}
