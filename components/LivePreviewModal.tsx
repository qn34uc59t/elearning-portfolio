"use client";

import { useCallback, useEffect } from "react";
import styles from "./LivePreviewModal.module.css";

type LivePreviewModalProps = {
  url: string | null;
  title?: string;
  variant?: "media" | "document";
  onClose: () => void;
};

function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

function isPdfUrl(url: string) {
  return /\.pdf(\?.*)?$/i.test(url);
}

export default function LivePreviewModal({
  url,
  title = "Live Preview",
  variant = "media",
  onClose,
}: LivePreviewModalProps) {
  const isOpen = Boolean(url);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleClose, isOpen]);

  if (!isOpen || !url) return null;

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div
        className={`${styles.dialog} ${variant === "document" || (url && isPdfUrl(url)) ? styles.dialogDocument : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close preview"
        >
          ×
        </button>

        {isVideoUrl(url) ? (
          <video
            className={styles.frame}
            src={url}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <iframe
            key={url}
            className={styles.frame}
            title={title}
            src={url}
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
