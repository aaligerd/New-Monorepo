export default function WpEmbed({ src, title, className }) {
  if (!src) return null;
  return (
    <div className={`aspect-video w-full overflow-hidden rounded my-6 border border-zinc-200 ${className || ""}`}>
      <iframe
        src={src}
        title={title || "Embedded Video"}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
