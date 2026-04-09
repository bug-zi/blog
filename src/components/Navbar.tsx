"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/lib/config";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import { usePathname } from "next/navigation";

// More menu items
const moreItems = [
  { title: "照片墙", href: "/more/photos" },
  { title: "留言", href: "/more/message" },
  { title: "足迹", href: "/more/footprint" },
  { title: "友链", href: "/more/friends" },
  { title: "自述", href: "/more/about" },
  { title: "历史", href: "/more/history" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();
  const moreRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === "/";

  // Scroll detection for transparent navbar on all pages
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };

    if (moreOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [moreOpen]);

  // Dynamic navbar styles - all pages start transparent, turn dark on scroll
  const navbarClasses = `sticky top-0 z-50 transition-all duration-300 ${
    !scrolled
      ? "border-b-0 bg-transparent"
      : "border-b border-white/10 bg-black/20 backdrop-blur-md"
  }`;

  return (
    <header className={navbarClasses}>
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo / Avatar */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={siteConfig.owner.avatar}
            alt={siteConfig.owner.name}
            width={32}
            height={32}
            className="rounded-full ring-2 ring-white/20"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className={`font-bold text-sm hidden sm:inline ${!scrolled ? "text-white" : "text-white/90"}`}>
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {siteConfig.nav.map((item) => {
            // Check if this is the "More" item
            const isMore = item.href === "/more";

            if (isMore) {
              return (
                <li key={item.href} className="relative">
                  <div ref={moreRef}>
                    <button
                      onClick={() => setMoreOpen(!moreOpen)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 text-white/80 hover:text-white hover:bg-white/10`}
                    >
                      {item.label}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform ${moreOpen ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {/* Dropdown menu */}
                    {moreOpen && (
                      <div
                        className="absolute top-full left-0 mt-1 min-w-[200px] rounded-xl border border-neutral-700/30 bg-neutral-900/20 backdrop-blur-xl shadow-lg overflow-hidden transition-all duration-200"
                      >
                        <ul className="py-1">
                          {moreItems.map((moreItem) => (
                            <li key={moreItem.href}>
                              <Link
                                href={moreItem.href}
                                onClick={() => setMoreOpen(false)}
                                className="block px-4 py-2.5 text-sm transition-colors text-white/80 hover:text-white hover:bg-white/10"
                              >
                                {moreItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-3 py-1.5 rounded-lg text-sm transition-colors text-white/80 hover:text-white hover:bg-white/10"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-full transition-colors text-white/80 hover:text-white hover:bg-white/10"
            aria-label="搜索"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Theme toggle */}
          <ThemeToggle isHomePage={isHomePage} scrolled={scrolled} />

          {/* BGM placeholder */}
          <button
            className="p-2 rounded-full transition-colors text-white/80 hover:text-white hover:bg-white/10"
            aria-label="背景音乐"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-full transition-colors md:hidden text-white/80 hover:text-white hover:bg-white/10"
            aria-label="菜单"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile nav menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-700/50 bg-neutral-900/90 backdrop-blur-md">
          <ul className="flex flex-col py-2 px-4">
            {siteConfig.nav.map((item) => {
              const isMore = item.href === "/more";

              if (isMore) {
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                      className="flex w-full items-center justify-between py-2 text-sm text-white/80 hover:text-white transition-colors"
                    >
                      <span>{item.label}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform ${mobileMoreOpen ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {mobileMoreOpen && (
                      <ul className="mt-1 ml-4 space-y-1 border-l-2 border-white/10 pl-3">
                        {moreItems.map((moreItem) => (
                          <li key={moreItem.href}>
                            <Link
                              href={moreItem.href}
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileMoreOpen(false);
                              }}
                              className="block py-1.5 text-sm text-white/60 hover:text-white transition-colors"
                            >
                              {moreItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute top-14 left-0 right-0 border-b border-neutral-700/50 bg-neutral-900/90 backdrop-blur-md p-4">
          <div className="mx-auto max-w-2xl">
            <input
              type="text"
              placeholder="搜索文章、作品..."
              className="w-full rounded-xl border border-neutral-600 bg-neutral-800/50 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/50 transition-colors focus:border-accent"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
