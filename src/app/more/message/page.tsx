export default function MessagePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold mb-2">留言</h1>
      <p className="text-sm text-muted mb-8">想对我说的话，写在这里吧</p>

      <div className="rounded-xl border border-border bg-card p-6">
        <textarea
          className="w-full h-32 bg-transparent outline-none resize-none text-sm placeholder:text-muted/50"
          placeholder="写下你的留言..."
        />
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 rounded-lg bg-accent text-white text-sm hover:opacity-90 transition-opacity">
            发送
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-muted mt-8">留言功能即将上线</p>
    </div>
  );
}
