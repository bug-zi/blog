"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { PostCard } from "@/components/PostCard";
import { FlowingCards } from "@/components/FlowingCards";
import { SocialIcon } from "@/components/SocialIcon";
import type { PostMeta } from "@/lib/posts";

interface HomePageClientProps {
  posts: PostMeta[];
  works: PostMeta[];
  featuredPosts: PostMeta[];
  featuredWorks: PostMeta[];
  daysSinceStart: number;
  flowCards: Array<{ title: string; href: string }>;
}

export function HomePageClient({
  posts,
  works,
  featuredPosts,
  featuredWorks,
  daysSinceStart,
  flowCards,
}: HomePageClientProps) {
  const stats = [
    { label: "建站", value: `${daysSinceStart} 天` },
    { label: "作品", value: `${works.length} 个` },
    { label: "文章", value: `${posts.length} �篇` },
    { label: "浏览", value: "0 次" },
  ];

  return (
    <div className="relative snap-container">
      {/* ===== Section 1: Hero (100vh) ===== */}
      <section className="snap-section h-screen flex flex-col items-center justify-center text-center py-16 relative">
        {/* Animated glow behind avatar */}
        <div className="absolute top-[20vh] w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />

        {/* Avatar */}
        <img
          src={siteConfig.owner.avatar}
          alt={siteConfig.owner.name}
          width={120}
          height={120}
          className="relative w-28 h-28 rounded-full object-cover ring-4 ring-white/30 shadow-2xl mb-10 hover:scale-105 transition-transform duration-300"
        />

        {/* Name with text glow */}
        <h1 className="relative text-4xl font-bold mb-6 text-white drop-shadow-lg">
          <span className="font-normal text-3xl">Hi, I&apos;m </span>{siteConfig.owner.name}
        </h1>

        {/* Bio */}
        <p className="text-4xl mb-8 text-white/90 drop-shadow-md leading-relaxed">
          喜欢在旅行时创作的 <span className="font-semibold text-white/95">{'<Planner>'}</span>
        </p>

        {/* Motto */}
        <p className="text-base text-white/70 italic mb-12 max-w-lg drop-shadow-md leading-relaxed">
          &ldquo;{siteConfig.owner.motto}&rdquo;
        </p>

        {/* Stats with glass effect */}
        <div className="flex gap-10 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-xl font-semibold text-white">{stat.value}</div>
              <div className="text-xs text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="flex gap-4">
          {siteConfig.social.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/20 hover:scale-110 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
              title={s.name}
            >
              <SocialIcon name={s.icon} />
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ===== Section 2: Flowing Cards (100vh) ===== */}
      <section className="snap-section h-screen flex items-center justify-center py-16 relative overflow-hidden">
        <FlowingCards cards={flowCards} />
      </section>

      {/* ===== Section 3: Content ===== */}
      <section className="snap-section min-h-screen py-16 relative">
        <div className="mx-auto max-w-4xl px-4 pb-16">
          {/* ===== Featured Work ===== */}
          {featuredWorks.length > 0 && (
            <div className="mb-8 group">
              <div className="relative rounded-2xl bg-black/20 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">精选作品</h2>
                    <Link
                      href="/work"
                      className="text-sm text-muted hover:text-accent transition-colors"
                    >
                      查看全部 →
                    </Link>
                  </div>
                  <div className="grid gap-4">
                    {featuredWorks.map((work) => (
                      <PostCard key={work.slug} post={work} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== Featured Posts ===== */}
          <div className="mb-8 group">
            <div className="relative rounded-2xl bg-black/20 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-black/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">精选文章</h2>
                  <Link
                    href="/passage"
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    查看全部 →
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredPosts.length > 0 ? (
                    featuredPosts.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))
                  ) : (
                    <p className="text-sm text-muted col-span-full">
                      还没有精选文章，去{" "}
                      <Link href="/passage" className="text-accent hover:underline">
                        文章页
                      </Link>{" "}
                      看看。
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ===== Recent Posts ===== */}
          {posts.length > 0 && (
            <div className="group">
              <div className="relative rounded-2xl bg-black/20 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-black/20 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">最近更新</h2>
                  </div>
                  <div className="space-y-3">
                    {posts.slice(0, 5).map((post) => (
                      <Link
                        key={post.slug}
                        href={`/passage/${post.slug}`}
                        className="flex items-center justify-between py-3 border-b border-border/50 hover:text-accent hover:bg-accent/5 rounded-lg px-3 -mx-3 transition-all duration-200 group/link"
                      >
                        <span className="text-sm font-medium group-hover/link:text-accent transition-colors">
                          {post.title}
                        </span>
                        <span className="text-xs text-muted shrink-0 ml-4 group-hover/link:text-accent/80 transition-colors">
                          {new Date(post.date).toLocaleDateString("zh-CN", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
