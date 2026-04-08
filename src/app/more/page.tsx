import Link from "next/link";

const moreItems = [
  {
    title: "照片墙",
    description: "记录生活中的美好瞬间",
    href: "/more/photos",
    icon: "📷",
  },
  {
    title: "留言",
    description: "给我留下你的想法",
    href: "/more/message",
    icon: "💬",
  },
  {
    title: "足迹",
    description: "我去过的地方",
    href: "/more/footprint",
    icon: "🌍",
  },
  {
    title: "友链",
    description: "我的朋友们",
    href: "/more/friends",
    icon: "🔗",
  },
  {
    title: "自述",
    description: "关于我的故事",
    href: "/more/about",
    icon: "👤",
  },
  {
    title: "历史",
    description: "重要事件的时间节点",
    href: "/more/history",
    icon: "📅",
  },
];

export default function MorePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-2xl font-bold mb-2">更多</h1>
      <p className="text-sm text-muted mb-8">探索更多内容</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {moreItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="group rounded-xl border border-border bg-card p-6 hover:bg-card-hover hover:border-accent/30 transition-all duration-300">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
