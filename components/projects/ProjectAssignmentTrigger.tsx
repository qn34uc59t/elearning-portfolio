"use client";

import { useState } from "react";
import LivePreviewModal from "@/components/LivePreviewModal";
import styles from "./ProjectLivePreviewTrigger.module.css";

type ProjectAssignmentTriggerProps = {
  url: string;
  title?: string;
  className?: string;
};

export default function ProjectAssignmentTrigger({
  url,
  title = "Original assignment",
  className,
}: ProjectAssignmentTriggerProps) {
  const [openUrl, setOpenUrl] = useState<string | null>(null);

  return (
    <>
      <button
        type="button"
        className={className ?? styles.trigger}
        onClick={() => setOpenUrl(url)}
      >
        Original assignment <span aria-hidden="true">↗</span>
      </button>

      <LivePreviewModal
        url={openUrl}
        title={title}
        variant="document"
        onClose={() => setOpenUrl(null)}
      />
    </>
  );
}
