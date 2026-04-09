import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-lg mb-2">{siteConfig.name}</h3>
            <p className="text-sm text-white leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-sm mb-3">关于</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  关于本站
                </Link>
              </li>
              <li>
                <Link href="/about#author" className="hover:text-foreground transition-colors">
                  关于站长
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-3">联系</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <Link href="/more/message" className="hover:text-foreground transition-colors">
                  写留言
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@debugzi.com"
                  className="hover:text-foreground transition-colors"
                >
                  发邮件
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-3">支持</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <Link href="/more/coffee" className="hover:text-foreground transition-colors">
                  请喝咖啡 ☕
                </Link>
              </li>
              <li>
                <Link href="/friends" className="hover:text-foreground transition-colors">
                  友情链接
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>
            Love is warmth, while being loved is light.
          </p>
        </div>
      </div>
    </footer>
  );
}
