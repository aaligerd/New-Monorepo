export default function WpHeading({ level, className, children }) {
  const Tag = `h${level}`;

  const sizeClasses = {
    1: "text-2xl sm:text-3xl md:text-4xl font-black text-brutal-black mb-6 font-brutal uppercase leading-tight",
    2: "text-xl sm:text-2xl md:text-[26px] font-black text-brutal-black mt-8 mb-4 font-brutal uppercase leading-snug border-b-[3px] border-brutal-black pb-1.5",
    3: "text-lg sm:text-xl md:text-[22px] font-black text-brutal-black mt-6 mb-3 font-brutal uppercase leading-snug",
    4: "text-base sm:text-lg md:text-xl font-bold text-brutal-black mt-5 mb-2 font-sans",
    5: "text-sm sm:text-base font-bold text-brutal-black mt-4 mb-2 font-sans",
    6: "text-xs sm:text-sm font-black text-brutal-black/50 uppercase tracking-widest mt-4 mb-2 font-sans",
  };

  const headingClass = sizeClasses[level] || sizeClasses[2];

  return (
    <Tag className={`${headingClass} ${className || ""}`}>
      {children}
    </Tag>
  );
}
