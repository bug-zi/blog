import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { CoffeeButton } from "@/components/CoffeeButton";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-lg mb-2 text-gray-400">{siteConfig.name}</h3>
            <p className="text-sm text-white leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-gray-400">关于</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <Link href="/about" className="hover:bg-white/10 rounded px-2 py-1 -mx-2 transition-colors inline-block">
                  关于本站
                </Link>
              </li>
              <li>
                <Link href="/about#author" className="hover:bg-white/10 rounded px-2 py-1 -mx-2 transition-colors inline-block">
                  关于站长
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-gray-400">联系</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <Link href="/more/message" className="hover:bg-white/10 rounded px-2 py-1 -mx-2 transition-colors inline-block">
                  写留言
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@debugzi.com"
                  className="hover:bg-white/10 rounded px-2 py-1 -mx-2 transition-colors inline-block"
                >
                  发邮件
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-gray-400">支持</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <CoffeeButton />
              </li>
              <li>
                <Link href="/friends" className="hover:bg-white/10 rounded px-2 py-1 -mx-2 transition-colors inline-block">
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
