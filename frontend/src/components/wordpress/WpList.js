export default function WpList({ ordered, className, children }) {
  const Tag = ordered ? "ol" : "ul";
  const listStyles = ordered
    ? "list-decimal pl-6 space-y-2.5 mb-6 text-gray-700 text-base leading-relaxed font-sans"
    : "list-disc pl-6 space-y-2.5 mb-6 text-gray-700 text-base leading-relaxed marker:text-red-600 font-sans";

  return (
    <Tag className={`${listStyles} ${className || ""}`}>
      {children}
    </Tag>
  );
}
