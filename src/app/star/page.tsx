import { getStars } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { siteConfig } from "@/lib/config";

export default function StarPage() {
  const stars = getStars();
  const categories = siteConfig.categories.star;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-2xl font-bold mb-2">收藏</h1>
      <p className="text-sm text-muted mb-8">我喜欢的网站、文章、音乐和影视</p>

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
  );
}
