import { getWorks } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { siteConfig } from "@/lib/config";

export default function WorkPage() {
  const works = getWorks();
  const categories = siteConfig.categories.work;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-2xl font-bold mb-2">作品</h1>
      <p className="text-sm text-muted mb-8">我的创作与项目</p>

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

      {works.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {works.map((work) => (
            <PostCard key={work.slug} post={work} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted py-20">
          还没有作品，敬请期待。
        </p>
      )}
    </div>
  );
}
