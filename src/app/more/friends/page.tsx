import { siteConfig } from "@/lib/config";

export default function FriendsPage() {
  const friends = siteConfig.friends;

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
      <div className="relative rounded-2xl bg-white/85 dark:bg-black/70 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10">
      <h1 className="text-2xl font-bold mb-2">友链</h1>
      <p className="text-sm text-muted mb-8">我的朋友们</p>

      {friends.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {friends.map((friend) => (
            <a
              key={friend.name}
              href={friend.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border bg-card p-5 hover:bg-card-hover hover:border-accent/30 transition-all duration-300"
            >
              <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                {friend.name}
              </h3>
              <p className="text-sm text-muted">{friend.description}</p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted py-20">
          还没有友链，欢迎交换~
        </p>
      )}
      </div>
      </div>
    </div>
  );
}
