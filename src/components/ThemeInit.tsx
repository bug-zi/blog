"use client";

import { useEffect } from "react";

export function ThemeInit() {
  useEffect(() => {
    // 客户端挂载时立即执行主题初始化
    const theme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === "dark" || (!theme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return null;
}
