"use client";

import { usePathname } from "next/navigation";
import BackgroundSnippetsNoiseEffect11 from "@/components/ui/background-snippets-noise-effect11";

export default function SiteBackgroundLayer() {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects/");

  if (isProjectPage) return null;

  return (
    <BackgroundSnippetsNoiseEffect11 className="pointer-events-none fixed inset-0 z-0" />
  );
}
