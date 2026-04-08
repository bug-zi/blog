"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo / Avatar */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={siteConfig.owner.avatar}
            alt={siteConfig.owner.name}
            width={32}
            height={32}
            className="rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="font-bold text-sm hidden sm:inline">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-3 py-1.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-card-hover transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-full hover:bg-card-hover transition-colors"
            aria-label="搜索"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* BGM placeholder */}
          <button
            className="p-2 rounded-full hover:bg-card-hover transition-colors"
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
            className="p-2 rounded-full hover:bg-card-hover transition-colors md:hidden"
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
        <div className="md:hidden border-t border-border bg-background">
          <ul className="flex flex-col py-2 px-4">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm text-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute top-14 left-0 right-0 border-b border-border bg-background/95 backdrop-blur-md p-4">
          <div className="mx-auto max-w-2xl">
            <input
              type="text"
              placeholder="搜索文章、作品..."
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
