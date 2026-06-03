export default function WpTable({ className, children }) {
  return (
    <div className="my-6 overflow-x-auto rounded-[12px] border-[3px] border-brutal-black bg-white shadow-brutal max-w-full font-sans">
      <table
        className={`min-w-full border-collapse text-sm text-left text-brutal-black 
          [&_th]:bg-accent-orange/20 [&_th]:px-4 [&_th]:py-3 [&_th]:font-black [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-brutal-black [&_th]:border-b-[3px] [&_th]:border-brutal-black 
          [&_td]:px-4 [&_td]:py-3 [&_td]:border-b-[2px] [&_td]:border-brutal-black/10 [&_tr:last-child_td]:border-none [&_tr:nth-child(even)]:bg-accent-orange/5 
          ${className || ""}`}
      >
        {children}
      </table>
    </div>
  );
}
