"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PhotoMeta } from "@/lib/posts";

export function PhotoWallClient({ photos }: { photos: PhotoMeta[] }) {
  const [activePhoto, setActivePhoto] = useState<PhotoMeta | null>(null);

  useEffect(() => {
    if (!activePhoto) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePhoto(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePhoto]);

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
        {photos.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setActivePhoto(p)}
            className="block w-full break-inside-avoid rounded-xl overflow-hidden border border-border group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div className="relative">
              <Image
                src={p.image}
                alt={p.title}
                width={400}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {p.description && (
              <p className="px-3 py-2 text-xs text-muted">{p.description}</p>
            )}
          </button>
        ))}
      </div>

      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-h-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 z-10 rounded-full bg-black/70 border border-white/20 px-3 py-1.5 text-sm text-white hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="关闭大图"
            >
              关闭
            </button>
            <Image
              src={activePhoto.image}
              alt={activePhoto.title}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              priority
            />
            {(activePhoto.title || activePhoto.description || activePhoto.url) && (
              <div className="mt-3 rounded-lg bg-black/60 px-4 py-3 text-white">
                <h2 className="text-sm font-medium">{activePhoto.title}</h2>
                {activePhoto.description && (
                  <p className="mt-1 text-xs text-white/70">
                    {activePhoto.description}
                  </p>
                )}
                {activePhoto.url && (
                  <a
                    href={activePhoto.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex rounded-md border border-white/20 px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    打开链接
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
