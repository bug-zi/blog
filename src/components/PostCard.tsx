import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  // Map post type to route path
  const getRoutePath = () => {
    switch (post.type) {
      case "work":
        return `/work/${post.slug}`;
      case "star":
        return `/star/${post.slug}`;
      case "post":
      default:
        return `/passage/${post.slug}`;
    }
  };

  return (
    <Link href={getRoutePath()}>
      <article className="group rounded-xl bg-white/5 backdrop-blur-sm p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-left">
        {post.cover && (
          <div className="mb-3 overflow-hidden rounded-lg">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
          <time>
            {new Date(post.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.category && (
            <>
              <span>·</span>
              <span className="text-white/50">{post.category}</span>
            </>
          )}
          {post.tags && post.tags.length > 0 && (
            <>
              <span>·</span>
              <div className="flex gap-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded text-[10px] border border-white/15 text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        <h3 className="font-semibold text-base text-white/90 group-hover:text-white transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.description && (
          <p className="mt-1.5 text-sm text-white/70 line-clamp-2">
            {post.description}
          </p>
        )}
      </article>
    </Link>
  );
}
