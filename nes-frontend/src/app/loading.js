"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fcfbf9] dark:bg-black transition-colors duration-200">
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="w-16 h-16 rounded-full border-4 border-zinc-200 dark:border-zinc-800 border-t-[#f99d1b] dark:border-t-[#f99d1b] animate-spin"></div>
        {/* Inner pulsing branded 'E' */}
        <div className="absolute flex items-center justify-center w-8 h-8 rounded-full bg-[#f99d1b] text-black font-black text-sm select-none animate-pulse">
          E
        </div>
      </div>
      <p className="mt-4 text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase font-sans animate-pulse">
        Loading...
      </p>
    </div>
  );
}
