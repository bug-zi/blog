import { getSentences } from "@/lib/posts";
import { SentenceTags } from "@/components/SentenceTags";

export default function SentencePage() {
  const sentences = getSentences();

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

      <div className="mx-auto max-w-3xl px-4 py-16 text-center relative">
      <h1 className="text-2xl font-bold mb-2 text-white">一言</h1>
      <p className="text-sm text-white/70 mb-8">记录触动心灵的句子</p>

      {sentences.length === 0 ? (
        <div className="py-20">
          <blockquote className="text-xl italic text-white/90">
            &ldquo;去爱，去失去，要不负相遇。&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-white/60">— 即将上线</p>
        </div>
      ) : (
        <div className="space-y-10">
          {sentences.map((s) => (
            <div key={s.slug} className="rounded-xl bg-white/5 backdrop-blur-sm p-4 border border-white/10">
              <blockquote className="text-lg italic text-white/90">
                &ldquo;{s.title}&rdquo;
              </blockquote>
              {s.author && (
                <p className="mt-2 text-sm text-white/70">— {s.author}</p>
              )}
              <div className="mt-3 flex items-center justify-between gap-4">
                <SentenceTags tags={s.tags} />
                <p className="text-xs text-white/50 shrink-0">
                  {new Date(s.date).toLocaleDateString("zh-CN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
