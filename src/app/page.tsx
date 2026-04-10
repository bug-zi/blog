import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { getPosts, getWorks, getFeaturedPosts, getFeaturedWorks, getDaysSinceStart } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { WorkCard } from "@/components/WorkCard";
import { HeroFade } from "@/components/HeroFade";
import { ContentFadeIn } from "@/components/ContentFadeIn";
import { SocialLinks } from "@/components/SocialLinks";

export default function HomePage() {
  const posts = getPosts();
  const works = getWorks();
  const featuredPosts = getFeaturedPosts(3);
  const featuredWorks = getFeaturedWorks(1);
  const daysSinceStart = getDaysSinceStart(siteConfig.owner.startDate);

  const stats = [
    { label: "建站", value: `${daysSinceStart} 天` },
    { label: "作品", value: `${works.length} 个` },
    { label: "文章", value: `${posts.length} 篇` },
    { label: "浏览", value: "0 次" },
  ];

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
        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        {/* Color tint for warmth */}
        <div className="absolute inset-0 bg-orange-900/10 dark:bg-blue-900/10 mix-blend-overlay" />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* ===== Hero Section ===== */}
      <HeroFade>
        <section className="flex flex-col items-center justify-center text-center min-h-screen py-16 relative">
        {/* Animated glow behind avatar */}
        <div className="absolute top-[20vh] w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />

        {/* Avatar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
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

        {/* Stats with glass effect - reduced spacing */}
        <div className="flex gap-10 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-xl font-semibold text-white">{stat.value}</div>
              <div className="text-xs text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social links with enhanced hover */}
        <SocialLinks />
      </section>
      </HeroFade>

      {/* ===== Content Section - pulled up to overlap hero ===== */}
      <ContentFadeIn>
        <div className="mx-auto max-w-4xl px-4 pb-16 relative -mt-16">
        {/* ===== Featured Work ===== */}
        {featuredWorks.length > 0 && (
          <section className="mb-8">
            <div className="rounded-2xl bg-black/20 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">精选作品</h2>
                <Link
                  href="/work"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  查看全部 →
                </Link>
              </div>
              <div className="grid gap-4">
                {featuredWorks.map((work) => (
                  <WorkCard key={work.slug} work={work} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== Featured Posts ===== */}
        <section className="mb-8">
          <div className="rounded-2xl bg-black/20 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">精选文章</h2>
              <Link
                href="/passage"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                查看全部 →
              </Link>
            </div>
            <div className="grid gap-3">
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
        </section>

        {/* ===== Recent Posts ===== */}
        {posts.length > 0 && (
          <section className="group">
            <div className="relative rounded-2xl bg-black/20 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-black/20 transition-all duration-300">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">最近更新</h2>
                </div>
                <div className="space-y-3">
                  {posts.slice(0, 5).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/passage/${post.slug}`}
                      className="flex items-center justify-between py-3 border-b border-white/10 hover:bg-white/10 rounded-lg px-3 -mx-3 transition-all duration-200 group/link"
                    >
                      <span className="text-sm font-medium text-white transition-colors">
                        {post.title}
                      </span>
                      <span className="text-xs text-white/70 shrink-0 ml-4 transition-colors">
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
          </section>
        )}
      </div>
      </ContentFadeIn>
    </div>
  );
}
