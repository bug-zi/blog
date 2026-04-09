import { getStars } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { siteConfig } from "@/lib/config";

export default function StarPage() {
  const stars = getStars();
  const categories = siteConfig.categories.star;

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
        <h1 className="text-2xl font-bold text-white mb-2">收藏</h1>
        <p className="text-sm text-white">我喜欢的网站、文章、音乐和影视</p>
      </div>
      <div className="relative rounded-2xl bg-black/20 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10">

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent text-white">
          全部
        </span>
        {categories.map((cat) => (
          <span
            key={cat.slug}
            className="px-3 py-1 rounded-full text-xs font-medium border border-border text-muted hover:border-accent hover:text-accent transition-colors cursor-pointer"
          >
            {cat.name}
          </span>
        ))}
      </div>

      {stars.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stars.map((star) => (
            <PostCard key={star.slug} post={star} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted py-20">
          还没有收藏，敬请期待。
        </p>
      )}
      </div>
      </div>
    </div>
  );
}
