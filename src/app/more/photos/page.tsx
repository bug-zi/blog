export default function PhotosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-2xl font-bold mb-2">照片墙</h1>
      <p className="text-sm text-muted mb-8">记录生活中的美好瞬间</p>
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
    </div>
  );
}
