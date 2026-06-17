"use client";

import { useState } from "react";
import LinkArrow from "@/components/ui/LinkArrow";
import LivePreviewModal from "@/components/LivePreviewModal";
import styles from "./ProjectLivePreviewTrigger.module.css";

type ProjectLivePreviewTriggerProps = {
  url: string;
  title: string;
  className?: string;
};

export default function ProjectLivePreviewTrigger({
  url,
  title,
  className,
}: ProjectLivePreviewTriggerProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <>
      <button
        type="button"
        className={className ?? styles.trigger}
        onClick={() => setPreviewUrl(url)}
      >
        Live Preview <LinkArrow />
      </button>

      <LivePreviewModal
        url={previewUrl}
        title={title}
        onClose={() => setPreviewUrl(null)}
      />
    </>
  );
}
