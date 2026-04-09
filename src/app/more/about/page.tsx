import { siteConfig } from "@/lib/config";

export default function AboutPage() {
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

      <div className="mx-auto max-w-3xl px-4 py-16 relative">
      <div className="relative rounded-2xl bg-black/20 backdrop-blur-md p-6 shadow-xl border border-white/20 dark:border-white/10">
      <h1 className="text-2xl font-bold mb-2">关于</h1>
      <p className="text-sm text-muted mb-8">关于本站和站长</p>

      <div className="prose">
        <h2>关于本站</h2>
        <p>
          这是 <strong>{siteConfig.name}</strong> 的个人博客，建于{" "}
          {siteConfig.owner.startDate}。
        </p>
        <p>
          在这里记录技术实践、生活感悟和创作旅程。网站使用 Next.js +
          TailwindCSS 构建，视觉风格参考了{" "}
          <a href="https://innei.in" target="_blank" rel="noopener noreferrer">
            静かな森
          </a>
          。
        </p>

        <h2 id="author">关于站长</h2>
        <p>{siteConfig.owner.bio}</p>
        <p>
          <em>&ldquo;{siteConfig.owner.motto}&rdquo;</em>
        </p>
      </div>
      </div>
      </div>
    </div>
  );
}
