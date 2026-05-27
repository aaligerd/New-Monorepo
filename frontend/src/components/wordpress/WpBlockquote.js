export default function WpBlockquote({ className, children }) {
  return (
    <blockquote className={`border-l-4 border-red-600 pl-4 py-1.5 my-6 bg-red-50/20 text-gray-600 italic font-serif text-lg leading-relaxed rounded-r-lg ${className || ""}`}>
      {children}
    </blockquote>
  );
}
