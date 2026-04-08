// Site configuration — edit this to personalize your blog

export const siteConfig = {
  name: "DebugZi",
  url: "https://wiki.debugzi.com",
  description: "去爱，去失去，要不负相遇。",
  owner: {
    name: "DebugZi",
    avatar: "/images/头像2.jpg",
    bio: "喜欢在旅行时创作的 planner",
    motto: "去爱，去失去，要不负相遇。",
    startDate: "2025-01-01", // 建站日期，用于计算建站天数
  },
  nav: [
    { label: "首页", href: "/" },
    { label: "作品", href: "/work" },
    { label: "文章", href: "/passage" },
    { label: "收藏", href: "/star" },
    { label: "一言", href: "/sentence" },
    { label: "更多", href: "/more" },
  ],
  social: [
    { name: "GitHub", url: "https://github.com/debugzi", icon: "github" },
    { name: "微信", url: "#", icon: "wechat" },
    { name: "QQ", url: "#", icon: "qq" },
    { name: "钉钉", url: "#", icon: "dingtalk" },
    { name: "网易云音乐", url: "#", icon: "netease" },
    { name: "小红书", url: "#", icon: "xiaohongshu" },
  ],
  friends: [] as {
    name: string;
    url: string;
    avatar: string;
    description: string;
  }[],
  categories: {
    passage: [
      { name: "精选", slug: "featured" },
      { name: "月刊", slug: "monthly" },
      {
        name: "生活",
        slug: "life",
        children: [
          { name: "健康", slug: "health" },
          { name: "旅行", slug: "travel" },
          { name: "好物", slug: "goods" },
        ],
      },
      {
        name: "技术",
        slug: "tech",
        children: [
          { name: "好用的网站工具分享", slug: "tools" },
          { name: "coding", slug: "coding" },
          { name: "AI", slug: "ai" },
          { name: "算法优化", slug: "algorithm" },
        ],
      },
      {
        name: "思考",
        slug: "thoughts",
        children: [
          { name: "时间", slug: "time" },
          { name: "成长", slug: "growth" },
        ],
      },
      { name: "杂项", slug: "misc" },
      { name: "归档", slug: "archive" },
    ],
    star: [
      { name: "收藏网站", slug: "website" },
      { name: "收藏文章", slug: "article" },
      { name: "收藏音乐", slug: "music" },
      { name: "收藏影视", slug: "movie" },
    ],
    work: [
      { name: "软件项目作品", slug: "software" },
      { name: "音乐创作", slug: "music" },
    ],
  },
};
