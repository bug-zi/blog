export default function HistoryPage() {
  const events = [
    {
      date: "2025-01-01",
      title: "博客上线",
      description: "个人博客正式上线运行",
    },
    {
      date: "2025-04-08",
      title: "MVP 完成",
      description: "博客 MVP 版本开发完成",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold mb-2">历史</h1>
      <p className="text-sm text-muted mb-8">重要事件的时间节点</p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

        <div className="space-y-8">
          {events.map((event) => (
            <div key={event.date} className="flex items-start gap-4 relative">
              <div className="w-[15px] h-[15px] mt-1 rounded-full bg-accent border-2 border-background shrink-0 z-10" />
              <div className="flex-1 pb-2">
                <div className="text-xs text-muted mb-1">{event.date}</div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-muted mt-0.5">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
