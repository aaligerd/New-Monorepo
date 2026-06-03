"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setHasSearched(true);
    }
  };

  const handleClear = () => {
    setQuery("");
    setHasSearched(false);
  };

  return (
    <main className="max-w-[1360px] mx-auto px-4 sm:px-6 py-12 font-sans flex flex-col items-center min-h-[60vh]">
      {/* Title */}
      <div className="border-b-[3px] border-brutal-black pb-4 mb-8 text-center">
        <span className="inline-block text-[10px] font-black uppercase tracking-widest text-white bg-accent-coral border-[2px] border-brutal-black px-2.5 py-0.5 rounded-[4px] shadow-[2px_2px_0px_#111] mb-2 select-none">
          DISCOVER
        </span>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-brutal-black font-brutal leading-none">
          Search the Gazette
        </h1>
      </div>

      {/* Search Input Container */}
      <form onSubmit={handleSearch} className="w-full max-w-xl flex flex-col sm:flex-row gap-3 mb-12">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="TYPE YOUR KEYWORDS HERE..."
            className="w-full bg-white border-[3px] border-brutal-black px-4 py-3 pl-10 rounded-[12px] font-black text-xs sm:text-sm uppercase tracking-wider placeholder:text-brutal-black/35 focus:outline-none focus:bg-accent-orange/5 shadow-brutal"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brutal-black/40 text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brutal-black/40 hover:text-accent-coral"
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-accent-orange text-brutal-black font-brutal uppercase text-xs sm:text-sm font-black border-[3px] border-brutal-black rounded-[12px] px-6 py-3 shadow-brutal hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#111] active:translate-y-[1px] active:shadow-[1px_1px_0px_#111] transition-all cursor-pointer whitespace-nowrap"
        >
          SEARCH
        </button>
      </form>

      {/* Search results placeholder */}
      {hasSearched ? (
        <div className="w-full max-w-xl bg-canvas border-[3px] border-brutal-black rounded-[20px] p-8 text-center shadow-brutal">
          <span className="text-3xl select-none mb-3 block">📭</span>
          <h3 className="font-brutal uppercase text-lg font-black text-brutal-black">
            No Bulletins Found
          </h3>
          <p className="text-sm font-bold text-brutal-black/60 mt-1 max-w-sm mx-auto">
            We couldn't find any articles matching "{query.toUpperCase()}". Try checking your spelling or search for wider topics like "india" or "sports".
          </p>
        </div>
      ) : (
        <div className="w-full max-w-xl bg-accent-orange/5 border-[3px] border-dashed border-brutal-black rounded-[20px] p-8 text-center select-none">
          <span className="text-3xl mb-3 block">🔍</span>
          <h3 className="font-brutal uppercase text-sm font-black text-brutal-black/60">
            Awaiting Query
          </h3>
          <p className="text-xs font-bold text-brutal-black/50 mt-1">
            Input search terms above to query the news database.
          </p>
        </div>
      )}
    </main>
  );
}
