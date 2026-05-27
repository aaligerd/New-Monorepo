export default function WpHeading({ level, className, children }) {
  const Tag = `h${level}`;

  // Custom styled responsive sizes for premium editorial look
  const sizeClasses = {
    1: "text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 font-display leading-tight",
    2: "text-xl sm:text-2xl md:text-[26px] font-bold text-gray-900 mt-8 mb-4 font-display leading-snug border-l-4 border-red-600 pl-3.5",
    3: "text-lg sm:text-xl md:text-[22px] font-bold text-gray-850 mt-6 mb-3 font-display leading-snug",
    4: "text-base sm:text-lg md:text-xl font-bold text-gray-800 mt-5 mb-2 font-display",
    5: "text-sm sm:text-base font-semibold text-gray-800 mt-4 mb-2 font-display",
    6: "text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mt-4 mb-2 font-display",
  };

  const headingClass = sizeClasses[level] || sizeClasses[2];

  return (
    <Tag className={`${headingClass} ${className || ""}`}>
      {children}
    </Tag>
  );
}
