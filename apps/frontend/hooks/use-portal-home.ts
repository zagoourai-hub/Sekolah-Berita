"use client";

import { useState } from "react";

import type { HomeData } from "@/types/school";

export function usePortalHome(data: HomeData) {
  const [menuOpen, setMenuOpen] = useState(false);
  const featuredIds = new Set(data.featuredNews.map((item) => item.id));
  const mobileNews =
    data.latestNews.filter((item) => !featuredIds.has(item.id)).length > 0
      ? data.latestNews.filter((item) => !featuredIds.has(item.id))
      : data.latestNews;

  return {
    menuOpen,
    setMenuOpen,
    mobileNews,
  };
}
