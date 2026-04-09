import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { getPosts, getWorks, getFeaturedPosts, getFeaturedWorks, getDaysSinceStart } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { HeroFade } from "@/components/HeroFade";
import { ContentFadeIn } from "@/components/ContentFadeIn";

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
        <div className="flex gap-4" style={{ marginBottom: '103px' }}>
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
      </section>
      </HeroFade>

      {/* ===== Content Section - pulled up to overlap hero ===== */}
      <ContentFadeIn>
        <div className="mx-auto max-w-4xl px-4 pb-16 relative -mt-16">
        {/* ===== Featured Work ===== */}
        {featuredWorks.length > 0 && (
          <section className="mb-8 group">
            <div className="relative rounded-2xl bg-white/85 dark:bg-black/70 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10 overflow-hidden">
              {/* Gradient overlay on card */}
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
          </section>
        )}

        {/* ===== Featured Posts ===== */}
        <section className="mb-8 group">
          <div className="relative rounded-2xl bg-white/85 dark:bg-black/70 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-black/20 transition-all duration-300">
            {/* Subtle inner glow */}
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
        </section>

        {/* ===== Recent Posts ===== */}
        {posts.length > 0 && (
          <section className="group">
            <div className="relative rounded-2xl bg-white/85 dark:bg-black/70 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-black/20 transition-all duration-300">
              {/* Subtle inner glow */}
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
          </section>
        )}
      </div>
      </ContentFadeIn>
    </div>
  );
}

function SocialIcon({ name }: { name: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    github: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    wechat: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.636 4.175c-2.808 0-5.468.89-7.136 2.804-1.068 1.225-1.545 2.754-1.228 4.39.36 1.858 1.479 3.252 3.02 4.242.322.209.473.509.397.865l-.217.826c-.04.15-.087.301-.087.454 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.313-.77a.864.864 0 0 1 .717-.098 8.58 8.58 0 0 0 2.764.455c4.8 0 8.691-3.144 8.691-7.003s-3.891-7.006-8.691-7.006zm-2.572 3.374c.535 0 .969.44.969.983a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.544.434-.983.97-.983zm5.144 0c.535 0 .969.44.969.983a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.544.434-.983.969-.983z" />
      </svg>
    ),
    qq: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.396 1.025.116 0 .263-.072.42-.216-.156.582-.222 1.082-.222 1.505 0 .893.406 1.212.938 1.212.34 0 .744-.14 1.16-.42-.014.14-.021.28-.021.42 0 1 .394 1.5 1.147 1.5.58 0 1.29-.312 2.02-.863.028-.02.056-.03.082-.03.058 0 .1.048.1.13 0 .026-.003.054-.009.084 0 .54.45.962 1.04.962.63 0 1.36-.455 1.92-1.105.57.65 1.29 1.105 1.92 1.105.59 0 1.04-.422 1.04-.962a.267.267 0 0 1-.009-.084c0-.082.042-.13.1-.13.026 0 .054.01.082.03.73.551 1.44.863 2.02.863.753 0 1.147-.5 1.147-1.5 0-.14-.007-.28-.021-.42.416.28.82.42 1.16.42.532 0 .938-.32.938-1.212 0-.423-.066-.923-.222-1.505.157.144.304.216.42.216.226 0 .396-.36.396-1.025 0-2.514-2.163-6.954-2.163-6.954V9.325C18.293 3.364 14.268 2 12.003 2z" />
      </svg>
    ),
    netease: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.744 14.27c-.097.463-.316.916-.613 1.28-.342.42-.795.748-1.29.96-.562.238-1.19.352-1.803.352-.545 0-1.076-.088-1.552-.275a3.785 3.785 0 0 1-1.236-.782 3.63 3.63 0 0 1-.831-1.238 4.164 4.164 0 0 1-.3-1.588c0-.562.108-1.095.313-1.567.2-.464.488-.873.846-1.208a3.942 3.942 0 0 1 1.282-.803c.49-.19 1.022-.29 1.578-.29.508 0 .994.08 1.44.238.42.148.795.363 1.107.637.283.249.506.554.658.9.139.314.213.658.213 1.017 0 .37-.09.712-.259 1.007a2.445 2.445 0 0 1-.678.773 3.276 3.276 0 0 1-.962.504 3.736 3.736 0 0 1-1.122.173c-.327 0-.622-.048-.876-.142a1.89 1.89 0 0 1-.632-.377 1.58 1.58 0 0 1-.388-.544 1.588 1.588 0 0 1-.13-.635c0-.337.092-.638.267-.886.166-.236.402-.418.688-.53.266-.104.568-.16.89-.16.292 0 .56.045.79.13.21.078.383.19.51.328a.924.924 0 0 1 .244.63.62.62 0 0 1-.098.348.495.495 0 0 1-.253.193.375.375 0 0 1-.28-.013.32.32 0 0 1-.155-.182l-.002-.005a.64.64 0 0 0-.187-.258.793.793 0 0 0-.296-.158 1.212 1.212 0 0 0-.363-.05c-.19 0-.365.032-.512.09a.84.84 0 0 0-.35.236.587.587 0 0 0-.13.387c0 .15.048.283.14.39a.953.953 0 0 0 .39.263c.167.066.368.1.594.1.328 0 .626-.058.88-.17.238-.105.438-.25.587-.424a.982.982 0 0 0 .205-.602c0-.204-.05-.396-.148-.57a1.472 1.472 0 0 0-.422-.465 2.082 2.082 0 0 0-.667-.332 2.636 2.636 0 0 0-.855-.127c-.395 0-.77.068-1.11.2-.33.13-.622.317-.863.554a2.493 2.493 0 0 0-.569.847 2.818 2.818 0 0 0-.2 1.064c0 .4.072.775.21 1.11.14.34.35.647.62.903.274.26.607.469.99.613.39.148.828.222 1.303.222.436 0 .856-.07 1.244-.205a2.94 2.94 0 0 0 .98-.567c.272-.24.485-.53.63-.86.14-.316.214-.664.214-1.03 0-.128-.01-.26-.032-.394l.002.001z" />
      </svg>
    ),
    dingtalk: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2H8v-2H7v-2H6V9h10v1h-1v2h-1v2h-1v2h-2z" />
      </svg>
    ),
    xiaohongshu: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-3 5-3v6zm2 0V9l5 3-5 3z" />
      </svg>
    ),
  };

  return (
    iconMap[name] ?? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
  );
}
