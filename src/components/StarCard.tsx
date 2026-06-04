import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface StarCardProps {
  star: PostMeta;
}

function StarTypeIcon({ type }: { type: string }) {
  const baseProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (type) {
    case "website":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" {...baseProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21" />
          <path d="M12 3c-2.3 2.5-3.5 5.5-3.5 9s1.2 6.5 3.5 9" />
        </svg>
      );
    case "tool":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" {...baseProps}>
          <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.9 2.9-3-3 2.9-2.9Z" />
        </svg>
      );
    case "article":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" {...baseProps}>
          <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v5h5" />
          <path d="M8 13h8" />
          <path d="M8 17h6" />
        </svg>
      );
    case "music":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" {...baseProps}>
          <path d="M9 18V6l10-2v12" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="16" cy="16" r="3" />
        </svg>
      );
    case "movie":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" {...baseProps}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 4v16" />
          <path d="M16 4v16" />
          <path d="M4 9h4" />
          <path d="M4 15h4" />
          <path d="M16 9h4" />
          <path d="M16 15h4" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" {...baseProps}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z" />
          <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" {...baseProps}>
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </svg>
      );
  }
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
        return "";
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
          <span
            className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-white/10 bg-white/5 text-white/70 transition-colors group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white"
            aria-label={typeLabel}
          >
            <StarTypeIcon type={type} />
          </span>
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
