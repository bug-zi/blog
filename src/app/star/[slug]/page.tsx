import { getPostBySlug, getStars } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

// Enable dynamic params for all slugs in dev mode
export const dynamicParams = true;
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getStars().map((star) => ({ slug: star.slug }));
}

export default async function StarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getPostBySlug(slug, "stars");
  if (!data) notFound();

  const { meta, content } = data;

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

      <article className="mx-auto max-w-3xl px-4 py-16 relative">
        {/* Semi-transparent background card for readability over dark bg */}
        <div className="absolute inset-0 rounded-2xl bg-background/80 dark:bg-background/70 backdrop-blur-sm" style={{ zIndex: -1 }} />
      {/* Header */}
      <header className="mb-12">
        <Link
          href="/star"
          className="text-sm text-muted hover:text-accent transition-colors mb-6 inline-block"
        >
          ← 返回收藏列表
        </Link>
        <h1 className="text-3xl font-bold mt-4 mb-3">{meta.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted">
          <time>
            {new Date(meta.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {meta.category && (
            <>
              <span>·</span>
              <span className="text-accent">{meta.category}</span>
            </>
          )}
          {meta.tags && meta.tags.length > 0 && (
            <>
              <span>·</span>
              <div className="flex gap-1.5">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="prose">
        <MDXRemote source={content} />
      </div>

      {/* Footer nav */}
      <div className="mt-16 pt-8 border-t border-border">
        <Link
          href="/star"
          className="text-sm text-muted hover:text-accent transition-colors"
        >
          ← 返回收藏列表
        </Link>
      </div>
    </article>
    </div>
  );
}
