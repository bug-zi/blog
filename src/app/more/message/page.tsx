export default function MessagePage() {
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

      <div className="mx-auto max-w-3xl px-4 py-16 relative">
      <div className="relative rounded-2xl bg-white/85 dark:bg-black/70 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10">
      <h1 className="text-2xl font-bold mb-2">留言</h1>
      <p className="text-sm text-muted mb-8">想对我说的话，写在这里吧</p>

      <div className="rounded-xl border border-border bg-card p-6">
        <textarea
          className="w-full h-32 bg-transparent outline-none resize-none text-sm placeholder:text-muted/50"
          placeholder="写下你的留言..."
        />
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 rounded-lg bg-accent text-white text-sm hover:opacity-90 transition-opacity">
            发送
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-muted mt-8">留言功能即将上线</p>
      </div>
      </div>
    </div>
  );
}
