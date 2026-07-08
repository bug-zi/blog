"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PhotoMeta } from "@/lib/posts";

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 1.6;
const ZOOM_STEP = 0.1;

export function PhotoWallClient({ photos }: { photos: PhotoMeta[] }) {
  const [activePhoto, setActivePhoto] = useState<PhotoMeta | null>(null);
  const [imageZoom, setImageZoom] = useState(1);
  const activePhotoUrl = activePhoto?.url || activePhoto?.image;

  const openPhoto = (photo: PhotoMeta) => {
    setActivePhoto(photo);
    setImageZoom(1);
  };

  const closePhoto = () => {
    setActivePhoto(null);
    setImageZoom(1);
  };

  const zoomOut = () => {
    setImageZoom((zoom) => Math.max(MIN_ZOOM, Number((zoom - ZOOM_STEP).toFixed(1))));
  };

  const zoomIn = () => {
    setImageZoom((zoom) => Math.min(MAX_ZOOM, Number((zoom + ZOOM_STEP).toFixed(1))));
  };

  useEffect(() => {
    if (!activePhoto) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePhoto(null);
        setImageZoom(1);
      }
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
            onClick={() => openPhoto(p)}
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
          onClick={closePhoto}
        >
          <div
            className="relative max-h-full w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePhoto}
              className="absolute -top-3 -right-3 z-10 rounded-full bg-black/70 border border-white/20 px-3 py-1.5 text-sm text-white hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="关闭大图"
            >
              关闭
            </button>
            <div className="absolute -top-3 left-0 z-10 flex items-center gap-1 rounded-full bg-black/70 border border-white/20 p-1 text-white">
              <button
                type="button"
                onClick={zoomOut}
                disabled={imageZoom <= MIN_ZOOM}
                className="grid h-8 w-8 place-items-center rounded-full text-sm hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="缩小照片"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setImageZoom(1)}
                className="h-8 min-w-12 rounded-full px-2 text-xs hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="恢复默认大小"
              >
                {Math.round(imageZoom * 100)}%
              </button>
              <button
                type="button"
                onClick={zoomIn}
                disabled={imageZoom >= MAX_ZOOM}
                className="grid h-8 w-8 place-items-center rounded-full text-sm hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="放大照片"
              >
                +
              </button>
            </div>
            <div className="flex max-h-[85vh] w-full items-center justify-center overflow-auto">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                width={1200}
                height={900}
                className="h-auto w-auto rounded-xl object-contain shadow-2xl"
                style={{
                  maxHeight: `${85 * imageZoom}vh`,
                  maxWidth: `${100 * imageZoom}%`,
                }}
                priority
              />
            </div>
            {(activePhoto.title || activePhoto.description || activePhotoUrl) && (
              <div className="mt-3 rounded-lg bg-black/60 px-4 py-3 text-white">
                <h2 className="text-sm font-medium">{activePhoto.title}</h2>
                {activePhoto.description && (
                  <p className="mt-1 text-xs text-white/70">
                    {activePhoto.description}
                  </p>
                )}
                {activePhotoUrl && (
                  <a
                    href={activePhotoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block max-w-full truncate rounded-md border border-white/20 px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {activePhotoUrl}
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
