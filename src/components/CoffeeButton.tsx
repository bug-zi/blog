"use client";

import { useState } from "react";

export function CoffeeButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hover:bg-white/10 rounded px-2 py-1 -mx-2 transition-colors inline-block"
      >
        请喝咖啡
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-xs mx-4 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/images/咖啡.jpg"
              alt="请喝咖啡"
              className="w-full"
            />
            <div className="px-4 py-4 text-center">
              <p className="text-base text-gray-600 dark:text-gray-300">
                制作不易，还望多多鼓励
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
