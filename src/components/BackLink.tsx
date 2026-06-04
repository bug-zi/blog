"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export function BackLink({
  fallbackHref,
  className,
  children,
}: {
  fallbackHref: string;
  className?: string;
  children: ReactNode;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("from") !== "home") return;

    event.preventDefault();
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = fallbackHref;
  };

  return (
    <Link href={fallbackHref} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
