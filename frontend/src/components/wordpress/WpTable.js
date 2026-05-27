export default function WpTable({ className, children }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-full font-sans">
      <table
        className={`min-w-full border-collapse text-sm text-left text-gray-700 
          [&_th]:bg-gray-50/80 [&_th]:px-4 [&_th]:py-3 [&_th]:font-bold [&_th]:text-gray-900 [&_th]:border-b [&_th]:border-gray-200 
          [&_td]:px-4 [&_td]:py-3 [&_td]:border-b [&_td]:border-gray-100 [&_tr:last-child_td]:border-none [&_tr:nth-child(even)]:bg-gray-50/30 
          ${className || ""}`}
      >
        {children}
      </table>
    </div>
  );
}
