import { getPhotos } from "@/lib/posts";
import { PhotoWallClient } from "@/components/PhotoWallClient";

export default function PhotosPage() {
  const photos = getPhotos();

  return (
    <div className="relative min-h-screen">
      {/* ===== Global Background ===== */}
      <img
        src="/images/blog-index.png"
        alt=""
        aria-hidden="true"
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />
      {/* Multi-layer overlay for depth */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-orange-900/10 dark:bg-blue-900/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 relative">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">照片墙</h1>
        <p className="text-sm text-white/70">记录生活中的美好瞬间</p>
      </div>
      <div className="relative rounded-2xl bg-black/20 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10">

      {photos.length === 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-card border border-border flex items-center justify-center text-muted text-sm"
              >
                照片 {i + 1}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted mt-8">照片功能即将上线，敬请期待</p>
        </>
      ) : (
        <PhotoWallClient photos={photos} />
      )}
      </div>
      </div>
    </div>
  );
}
