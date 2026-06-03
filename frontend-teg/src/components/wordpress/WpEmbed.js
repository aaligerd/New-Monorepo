export default function WpEmbed({ src, title, className }) {
  if (!src) return null;

  const secureSrc = src.startsWith("//") ? `https:${src}` : src;

  return (
    <div className={`my-6 overflow-hidden rounded-[12px] border-[3px] border-brutal-black bg-black shadow-brutal ${className || ""}`}>
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
