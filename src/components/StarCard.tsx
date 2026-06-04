import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface StarCardProps {
  star: PostMeta;
}

// 从 collection name 中提取类型（stars-website -> website）
const getTypeFromCollection = (collection?: string) => {
  if (!collection) return "star";
  if (collection.startsWith("stars-")) {
    return collection.replace("stars-", "");
  }
  return "star";
};

const STAR_TYPE_LABELS: Record<string, string> = {
  website: "网站",
  tool: "工具",
  article: "文章",
  music: "音乐",
  book: "书籍",
  movie: "影视",
  star: "收藏",
};

const STAR_TYPE_ICONS: Record<string, string> = {
  website: "🌐",
  tool: "🔧",
  article: "📄",
  music: "🎵",
  movie: "🎬",
  book: "📚",
  star: "⭐",
};

export function StarCard({ star }: StarCardProps) {
  // 尝试从多个来源确定类型
  let type = star.category || getTypeFromCollection(star.type);

  // 如果还没有，尝试从其他字段推断
  if (!type || type === "star") {
    if (star.artist || star.year) type = "music";
    else if (star.douban_link) type = star.year ? "movie" : "book";
    else if (star.link) type = "article";
  }

  const typeLabel = STAR_TYPE_LABELS[type] || "收藏";
  const typeIcon = STAR_TYPE_ICONS[type] || "⭐";

  // 根据类型获取显示信息
  const getSubtitle = () => {
    switch (type) {
      case "music":
        return star.artist ? `${star.artist} · ${star.year}` : star.year || "";
      case "book":
        return star.author ? `${star.author} · ${star.year}` : star.year || "";
      case "movie":
        return star.year || "";
      default:
        return star.description || "";
    }
  };

  const getLinkInfo = () => {
    const url = star.link || star.douban_link || star.url;
    if (!url) return null;

    switch (type) {
      case "music":
      case "article":
      case "website":
      case "tool":
        return { label: "链接", url };
      case "book":
      case "movie":
        return { label: "豆瓣", url };
      default:
        return { label: "链接", url };
    }
  };

  const subtitle = getSubtitle();
  const linkInfo = getLinkInfo();

  return (
    <Link
      href={linkInfo?.url || "#"}
      target={linkInfo?.url ? "_blank" : undefined}
      rel={linkInfo?.url ? "noopener noreferrer" : undefined}
      className="group block"
    >
      <article className="hover:bg-white/10 transition-colors py-3 border-b border-white/5 last:border-b-0">
        {/* Header: Type icon + Title */}
        <div className="flex items-start gap-2 mb-2">
          <span className="text-xl">{typeIcon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors truncate">
              {star.title}
            </h3>
          </div>
        </div>

        {/* Subtitle (artist+year for music/book/movie) */}
        {subtitle && (
          <p className="text-sm text-white/70 mb-2 pl-7">
            {subtitle}
          </p>
        )}

        {/* Description (for website/tool/article) */}
        {star.description && !star.artist && (
          <p className="text-sm text-white/60 line-clamp-2 mb-2 pl-7">
            {star.description}
          </p>
        )}

        {/* Link display */}
        {linkInfo && (
          <div className="flex items-center gap-1.5 text-xs text-white/70 pl-7">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M12.586 5.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 005.656 0l3-3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
            <span className="truncate">{linkInfo.label}: {linkInfo.url}</span>
          </div>
        )}

        {/* Date tag */}
        <div className="mt-2 pl-7">
          <span className="text-xs text-white/40">
            {new Date(star.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </article>
    </Link>
  );
}
