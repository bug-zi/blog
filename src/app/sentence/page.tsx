export default function SentencePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-2">一言</h1>
      <p className="text-sm text-muted mb-16">记录触动心灵的句子</p>

      <div className="py-20">
        <blockquote className="text-xl italic text-muted">
          &ldquo;去爱，去失去，要不负相遇。&rdquo;
        </blockquote>
        <p className="mt-4 text-sm text-muted/60">— 即将上线</p>
      </div>
    </div>
  );
}
