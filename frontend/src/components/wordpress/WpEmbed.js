export default function WpEmbed({ src, title, className }) {
  if (!src) return null;

  // Ensure iframe source URLs are secure
  const secureSrc = src.startsWith("//") ? `https:${src}` : src;

  return (
    <div className={`my-6 overflow-hidden rounded-xl border border-gray-150/50 bg-black shadow-sm ${className || ""}`}>
      <div className="relative w-full aspect-video">
        <iframe
          src={secureSrc}
          title={title || "Video Embed"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
