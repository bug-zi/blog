import { getFootprints } from "@/lib/posts";

export default function FootprintPage() {
  const footprints = getFootprints();

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
      <div className="relative rounded-2xl bg-black/20 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10">
      <h1 className="text-2xl font-bold mb-2">足迹</h1>
      <p className="text-sm text-muted mb-8">我去过的地方</p>

      {footprints.length === 0 ? (
        <p className="text-center text-sm text-muted py-8">暂无足迹</p>
      ) : (
        <div className="space-y-6">
          {footprints.map((item) => (
            <div
              key={item.slug}
              className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card"
            >
              <div className="w-3 h-3 mt-1.5 rounded-full bg-accent shrink-0" />
              <div>
                <h3 className="font-semibold">{item.place}</h3>
                <p className="text-sm text-muted">
                  {[item.date, item.note].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      </div>
    </div>
  );
}
