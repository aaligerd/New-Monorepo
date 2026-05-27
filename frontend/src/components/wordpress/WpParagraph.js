export default function WpParagraph({ className, children }) {
  return (
    <p className={`text-base sm:text-[17px] text-gray-700 leading-relaxed sm:leading-loose mb-5 font-sans ${className || ""}`}>
      {children}
    </p>
  );
}
