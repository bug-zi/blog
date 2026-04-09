import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/${post.type === "work" ? "work" : "passage"}/${post.slug}`}>
      <article className="group rounded-xl border border-white/20 dark:border-white/10 bg-white/50 dark:bg-black/60 backdrop-blur-sm p-5 hover:bg-white/70 dark:hover:bg-black/70 hover:border-accent/30 transition-all duration-300">
        {post.cover && (
          <div className="mb-3 overflow-hidden rounded-lg">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-muted mb-2">
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
              <span className="text-accent">{post.category}</span>
            </>
          )}
        </div>
        <h3 className="font-semibold text-base group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.description && (
          <p className="mt-1.5 text-sm text-muted line-clamp-2">
            {post.description}
          </p>
        )}
      </article>
    </Link>
  );
}
