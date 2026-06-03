export default function WpCodeBlock({ code, className }) {
  return (
    <pre className={`bg-zinc-900 text-zinc-100 p-4 rounded overflow-x-auto text-xs my-4 font-mono ${className || ""}`}>
      <code>{code}</code>
    </pre>
  );
}
