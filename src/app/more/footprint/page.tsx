export default function FootprintPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold mb-2">足迹</h1>
      <p className="text-sm text-muted mb-8">我去过的地方</p>

      <div className="space-y-6">
        {[
          { place: "南京", date: "2024 夏", note: "夏日南京游" },
          { place: "待探索...", date: "未来", note: "更多旅途等你开启" },
        ].map((item) => (
          <div
            key={item.place}
            className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card"
          >
            <div className="w-3 h-3 mt-1.5 rounded-full bg-accent shrink-0" />
            <div>
              <h3 className="font-semibold">{item.place}</h3>
              <p className="text-sm text-muted">
                {item.date} · {item.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
