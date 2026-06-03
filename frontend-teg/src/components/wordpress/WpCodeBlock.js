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
    <div className={`my-6 overflow-hidden rounded-[12px] border-[3px] border-brutal-black bg-brutal-black text-white shadow-brutal relative group ${className || ""}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b-[2px] border-brutal-black bg-[#222] select-none">
        <span className="text-[10px] font-mono uppercase tracking-wider font-black text-accent-orange">Code</span>
        <button
          onClick={handleCopy}
          className="text-[10px] uppercase font-black tracking-wider transition-all flex items-center gap-1.5 py-1 px-2.5 rounded-[4px] border-[2px] border-brutal-black bg-white hover:bg-accent-orange text-brutal-black cursor-pointer shadow-[2px_2px_0px_#000] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]"
        >
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={copied ? "text-accent-green" : ""} />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] text-[#f8f9fa] font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
