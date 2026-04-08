import { getPostBySlug, getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function PassageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getPostBySlug(slug, "posts");
  if (!data) notFound();

  const { meta, content } = data;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      {/* Header */}
      <header className="mb-12">
        <Link
          href="/passage"
          className="text-sm text-muted hover:text-accent transition-colors mb-6 inline-block"
        >
          ← 返回文章列表
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
          href="/passage"
          className="text-sm text-muted hover:text-accent transition-colors"
        >
          ← 返回文章列表
        </Link>
      </div>
    </article>
  );
}
