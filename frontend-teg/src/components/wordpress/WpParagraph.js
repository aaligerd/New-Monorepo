export default function WpParagraph({ className, children }) {
  return (
    <p className={`text-base sm:text-[17px] text-brutal-black/95 leading-relaxed sm:leading-loose mb-5 font-sans ${className || ""}`}>
      {children}
    </p>
  );
}
