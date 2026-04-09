import { Suspense } from "react";
import { getPosts, getFeaturedPosts } from "@/lib/posts";
import { CategoryFilter } from "@/components/CategoryFilter";

export default function PassagePage() {
  const allPosts = getPosts();
  const featuredPosts = getFeaturedPosts(5);

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
        <Suspense
          fallback={
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white">文章</h1>
                <p className="text-sm text-white/70 mt-1">思考、记录、分享</p>
              </div>
            </>
          }
        >
          <CategoryFilter posts={allPosts} featuredPosts={featuredPosts} />
        </Suspense>
      </div>
    </div>
  );
}
