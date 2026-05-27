"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function WpCodeBlock({ code, className }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`my-6 overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-sm relative group ${className || ""}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-950/80 text-gray-400 select-none">
        <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Code</span>
        <button
          onClick={handleCopy}
          className="text-xs hover:text-white transition-colors flex items-center gap-1.5 py-1 px-2 rounded hover:bg-gray-850 cursor-pointer"
        >
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={copied ? "text-emerald-400" : ""} />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] text-gray-300 font-mono leading-relaxed bg-gray-900/50">
        <code>{code}</code>
      </pre>
    </div>
  );
}
